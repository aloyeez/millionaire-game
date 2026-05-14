import { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../sounds/correct.wav";
import wrong from "../sounds/wrong.wav";

export default function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerState, setAnswerState] = useState(null); // null | 'active' | 'correct' | 'wrong'
  const [locked, setLocked] = useState(false);

  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    setSelectedAnswer(null);
    setAnswerState(null);
    setLocked(false);
  }, [data, questionNumber]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleClick = async (a) => {
    if (locked) return;
    setLocked(true);
    setSelectedAnswer(a);
    setAnswerState("active");

    await delay(3000);
    setAnswerState(a.correct ? "correct" : "wrong");

    await delay(2000);
    if (a.correct) {
      playCorrect();
      await delay(800);
      setQuestionNumber((prev) => prev + 1);
    } else {
      playWrong();
      await delay(800);
      setStop(true);
    }
  };

  const getClassName = (a) => {
    if (selectedAnswer !== a) return "answer";
    if (answerState === "active") return "answer active";
    if (answerState === "correct") return "answer correct";
    if (answerState === "wrong") return "answer wrong";
    return "answer";
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div className="trivia">
      <p className="question-number-badge">Question {questionNumber} of 15</p>
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a, i) => (
          <div
            key={a.text}
            className={getClassName(a)}
            onClick={() => handleClick(a)}
          >
            <span style={{ opacity: 0.5, marginRight: 8, fontWeight: 700, fontSize: "0.8em" }}>
              {labels[i]}
            </span>
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

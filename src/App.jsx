import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

const MONEY_PYRAMID = [
  { id: 1,  amount: "$100",       milestone: false },
  { id: 2,  amount: "$200",       milestone: false },
  { id: 3,  amount: "$300",       milestone: false },
  { id: 4,  amount: "$500",       milestone: false },
  { id: 5,  amount: "$1,000",     milestone: true  },
  { id: 6,  amount: "$2,000",     milestone: false },
  { id: 7,  amount: "$4,000",     milestone: false },
  { id: 8,  amount: "$8,000",     milestone: false },
  { id: 9,  amount: "$16,000",    milestone: false },
  { id: 10, amount: "$32,000",    milestone: true  },
  { id: 11, amount: "$64,000",    milestone: false },
  { id: 12, amount: "$125,000",   milestone: false },
  { id: 13, amount: "$250,000",   milestone: false },
  { id: 14, amount: "$500,000",   milestone: false },
  { id: 15, amount: "$1,000,000", milestone: true  },
];

const DATA = [
  {
    id: 1,
    question: "What is the average annual beer consumption per person in the Czech Republic?",
    answers: [
      { text: "75 liters",  correct: false },
      { text: "100 liters", correct: false },
      { text: "140 liters", correct: true  },
      { text: "200 liters", correct: false },
    ],
  },
  {
    id: 2,
    question: "What year was Pilsner Urquell first brewed?",
    answers: [
      { text: "1842", correct: true  },
      { text: "1855", correct: false },
      { text: "1802", correct: false },
      { text: "1902", correct: false },
    ],
  },
  {
    id: 3,
    question: "How many breweries does the Czech Republic have?",
    answers: [
      { text: "Around 50",  correct: false },
      { text: "Around 150", correct: false },
      { text: "Around 300", correct: false },
      { text: "Over 500",   correct: true  },
    ],
  },
  {
    id: 4,
    question: "In 2021, which country was the largest importer of Czech beer?",
    answers: [
      { text: "USA",      correct: false },
      { text: "Poland",   correct: false },
      { text: "Germany",  correct: true  },
      { text: "Slovakia", correct: false },
    ],
  },
  {
    id: 5,
    question: "What does IPA stand for?",
    answers: [
      { text: "International Pale Ale", correct: false },
      { text: "India Pale Ale",         correct: true  },
      { text: "Imperial Pale Ale",      correct: false },
      { text: "Integrated Pale Ale",    correct: false },
    ],
  },
  {
    id: 6,
    question: "In which city is the Guinness brewery located?",
    answers: [
      { text: "London",    correct: false },
      { text: "Dublin",    correct: true  },
      { text: "Edinburgh", correct: false },
      { text: "Brussels",  correct: false },
    ],
  },
  {
    id: 7,
    question: 'What does the term "ABV" stand for in the context of beer?',
    answers: [
      { text: "Advanced Brewing Volume", correct: false },
      { text: "Alcohol By Volume",       correct: true  },
      { text: "Annual Barley Value",     correct: false },
      { text: "Automated Beer Vat",      correct: false },
    ],
  },
  {
    id: 8,
    question: "What process is primarily used to clarify beer?",
    answers: [
      { text: "Fermentation", correct: false },
      { text: "Distillation", correct: false },
      { text: "Filtration",   correct: true  },
      { text: "Carbonation",  correct: false },
    ],
  },
  {
    id: 9,
    question: "Oktoberfest is a world-famous beer festival held in which city?",
    answers: [
      { text: "Berlin",   correct: false },
      { text: "Vienna",   correct: false },
      { text: "Munich",   correct: true  },
      { text: "Brussels", correct: false },
    ],
  },
  {
    id: 10,
    question: 'What is the purpose of the "boil" stage in beer brewing?',
    answers: [
      { text: "To sterilize the wort",    correct: true  },
      { text: "To carbonate the beer",    correct: false },
      { text: "To add color to the beer", correct: false },
      { text: "To cool down the wort",    correct: false },
    ],
  },
  {
    id: 11,
    question: '"Session" beers are characterized by what?',
    answers: [
      { text: "High alcohol content",  correct: false },
      { text: "Strong hop flavor",     correct: false },
      { text: "Low alcohol content",   correct: true  },
      { text: "Use of exotic fruits",  correct: false },
    ],
  },
  {
    id: 12,
    question: 'What does the term "Imperial" in beer names typically indicate?',
    answers: [
      { text: "Use of imperial yeast strains", correct: false },
      { text: "Brewed for royalty",            correct: false },
      { text: "Lower alcohol content",         correct: false },
      { text: "Higher alcohol content",        correct: true  },
    ],
  },
  {
    id: 13,
    question: 'What does "IBU" stand for in the context of beer?',
    answers: [
      { text: "Internal Brewing Unit",        correct: false },
      { text: "International Bitterness Units", correct: true },
      { text: "Instant Beer Understanding",   correct: false },
      { text: "Integrated Brew Utilization",  correct: false },
    ],
  },
  {
    id: 14,
    question: "Which factor primarily affects the color of beer?",
    answers: [
      { text: "The type of hops used",        correct: false },
      { text: "The fermentation temperature", correct: false },
      { text: "The malt roasting level",      correct: true  },
      { text: "The amount of water used",     correct: false },
    ],
  },
  {
    id: 15,
    question: "Which ingredient gives beer its bitter flavor?",
    answers: [
      { text: "Barley", correct: false },
      { text: "Yeast",  correct: false },
      { text: "Hops",   correct: true  },
      { text: "Water",  correct: false },
    ],
  },
];

const pyramid = [...MONEY_PYRAMID].reverse();

function getEndMessage(questionNumber, won) {
  if (won) return "You've conquered the beer trivia world. Drinks on you! 🥂";
  if (questionNumber <= 2) return "Don't worry — every beer master starts somewhere.";
  if (questionNumber <= 5) return "A decent round. Brush up on your brewing knowledge!";
  if (questionNumber <= 10) return "Solid effort! You clearly know your way around a pub.";
  return "So close to the top shelf! One more round?";
}

export default function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$0");

  const won = questionNumber > 15;

  useEffect(() => {
    if (questionNumber > 1) {
      const prize = MONEY_PYRAMID.find((m) => m.id === questionNumber - 1);
      if (prize) setEarned(prize.amount);
    }
  }, [questionNumber]);

  const handleRetry = useCallback(() => {
    setQuestionNumber(1);
    setStop(false);
    setEarned("$0");
  }, []);

  const handleNewPlayer = useCallback(() => {
    setUserName(null);
    setQuestionNumber(1);
    setStop(false);
    setEarned("$0");
  }, []);

  const currentPrize = MONEY_PYRAMID.find((m) => m.id === questionNumber)?.amount ?? earned;
  const progressPct = ((questionNumber - 1) / 15) * 100;

  if (!userName) {
    return <Start setUserName={setUserName} />;
  }

  if (stop || won) {
    const isWinner = won;
    return (
      <div className="app">
        <header className="app-header">
          <span className="app-header-title">🍺 Beer <span>Millionaire</span></span>
        </header>
        <div className="end-screen">
          <div className="end-icon">{isWinner ? "🏆" : "💸"}</div>
          <p className="end-result-label">{isWinner ? "You won!" : `${userName}, you walked away with`}</p>
          <div className={`end-amount${isWinner ? " winner" : ""}`}>{earned}</div>
          <p className="end-message">{getEndMessage(questionNumber, isWinner)}</p>
          <div className="end-buttons">
            <button className="btn-retry" onClick={handleRetry}>
              Try Again
            </button>
            <button className="btn-new-player" onClick={handleNewPlayer}>
              New Player
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ flexDirection: "column" }}>
      <header className="app-header">
        <span className="app-header-title">🍺 Beer <span>Millionaire</span></span>
      </header>

      <div className="game-layout" style={{ flex: 1, minHeight: 0 }}>
        <div className="main">
          <Timer setStop={setStop} questionNumber={questionNumber} />
          <div className="progress-bar-track" style={{ width: "100%", maxWidth: 680 }}>
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <Trivia
            data={DATA}
            setStop={setStop}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
          />
        </div>

        <aside className="pyramid">
          <p className="pyramid-title">Prize Ladder</p>
          <ul className="moneyList">
            {pyramid.map((m) => (
              <li
                key={m.id}
                className={[
                  "moneyListItem",
                  m.milestone ? "milestone" : "",
                  questionNumber === m.id ? "active" : "",
                  m.id < questionNumber ? "passed" : "",
                ].filter(Boolean).join(" ")}
              >
                <span className="moneyListItemNumber">{m.id}</span>
                <span className="moneyListItemAmount">{m.amount}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mobile-prize-bar">
        <div>
          <p className="mobile-prize-label">Current prize</p>
          <p className="mobile-current-prize">{currentPrize}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="mobile-prize-label">Player</p>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,248,238,0.7)", fontWeight: 500 }}>{userName}</p>
        </div>
      </div>
    </div>
  );
}

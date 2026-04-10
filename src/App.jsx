import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "What is the average annual beer consumption per person in the Czech Republic?",
      answers: [
        {
          text: "75 liters",
          correct: false,
        },
        {
          text: "100 liters",
          correct: false,
        },
        {
          text: "140 liters",
          correct: true,
        },
        {
          text: "200 liters",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "What year was Pilsner Urquell first brewed?",
      answers: [
        {
          text: "1842",
          correct: true,
        },
        {
          text: "1855",
          correct: false,
        },
        {
          text: "1802",
          correct: false,
        },
        {
          text: "1902",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "How many breweries does the Czech Republic have?",
      answers: [
        {
          text: "Around 50",
          correct: false,
        },
        {
          text: "Around 150",
          correct: false,
        },
        {
          text: "Around 300",
          correct: false,
        },
        {
          text: "Over 500",
          correct: true,
        },
      ],
    },
    {
      id: 4,
      question: "In 2021, which country was the largest importer of Czech beer?",
      answers: [
        {
          text: "USA",
          correct: false,
        },
        {
          text: "Poland",
          correct: false,
        },
        {
          text: "Germany",
          correct: true,
        },
        {
          text: "Slovakia",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "What does IPA stand for?",
      answers: [
        {
          text: "International Pale Ale",
          correct: false,
        },
        {
          text: "India Pale Ale",
          correct: true,
        },
        {
          text: "Imperial Pale Ale",
          correct: false,
        },
        {
          text: "Integrated Pale Ale",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "In which city is the Guinness brewery located?",
      answers: [
        {
          text: "London",
          correct: false,
        },
        {
          text: "Dublin",
          correct: true,
        },
        {
          text: "Edinburgh",
          correct: false,
        },
        {
          text: "Brussels",
          correct: false,
        },
      ],
    },
    {
      id: 7,
      question: "What does the term “ABV” stand for in the context of beer?",
      answers: [
        {
          text: "Advanced Brewing Volume",
          correct: false,
        },
        {
          text: "Alcohol By Volume",
          correct: true,
        },
        {
          text: "Annual Barley Value",
          correct: false,
        },
        {
          text: "Automated Beer Vat",
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: "What process is primarily used to clarify beer?",
      answers: [
        {
          text: "Fermentation",
          correct: false,
        },
        {
          text: "Distillation",
          correct: false,
        },
        {
          text: "Filtration",
          correct: true,
        },
        {
          text: "Carbonation",
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: "Oktoberfest is a world-famous beer festival held in which city?",
      answers: [
        {
          text: "Berlin",
          correct: false,
        },
        {
          text: "Vienna",
          correct: false,
        },
        {
          text: "Munich",
          correct: true,
        },
        {
          text: "Brussels",
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question: "What is the purpose of the “boil” stage in beer brewing?",
      answers: [
        {
          text: "To sterilize the wort",
          correct: true,
        },
        {
          text: "To carbonate the beer",
          correct: false,
        },
        {
          text: "To add color to the beer",
          correct: false,
        },
        {
          text: "To cool down the wort",
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: "“Session” beers are characterized by what?",
      answers: [
        {
          text: "High alcohol content",
          correct: false,
        },
        {
          text: "Strong hop flavor",
          correct: false,
        },
        {
          text: "Low alcohol content",
          correct: true,
        },
        {
          text: "Use of exotic fruits",
          correct: false,
        },
      ],
    },
    {
      id: 12,
      question: "What does the term “Imperial” in beer names typically indicate?",
      answers: [
        {
          text: "Use of imperial yeast strains",
          correct: false,
        },
        {
          text: "Brewed for royalty",
          correct: false,
        },
        {
          text: "Lower alcohol content",
          correct: false,
        },
        {
          text: "Higher alcohol content",
          correct: true,
        },
      ],
    },
    {
      id: 13,
      question: "What does “IBU” stand for in the context of beer?",
      answers: [
        {
          text: "Internal Brewing Unit",
          correct: false,
        },
        {
          text: "International Bitterness Units",
          correct: true,
        },
        {
          text: "Instant Beer Understanding",
          correct: false,
        },
        {
          text: "Integrated Brew Utilization",
          correct: false,
        },
      ],
    },
    {
      id: 14,
      question: "Which factor primarily affects the color of beer?",
      answers: [
        {
          text: "The type of hops used",
          correct: false,
        },
        {
          text: "The fermentation temperature",
          correct: false,
        },
        {
          text: "The malt roasting level",
          correct: true,
        },
        {
          text: "The amount of water used",
          correct: false,
        },
      ],
    },
    {
      id: 15,
      question: "Which ingredient gives beer its bitter flavor?",
      answers: [
        {
          text: "Barley",
          correct: false,
        },
        {
          text: "Yeast",
          correct: false,
        },
        {
          text: "Hops",
          correct: true,
        },
        {
          text: "Water",
          correct: false,
        },
      ],
    }
  ];
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" }
      ].reverse(),
    []
  );
  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
            {!userName ? (
        <Start setUserName={setUserName} />
      ) : (
        <>
      <div className="main">
        {stop ? ( <h1 className="endText">You earned: {earned}</h1> ) : (
        <>
        <div className="top">
          <div className="timer">
            <Timer setStop={setStop} questionNumber={questionNumber}/>
          </div>
        </div>
        <div className="bottom">
          <Trivia data={data} 
          setStop={setStop} 
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}/>
        </div>
        </>
        )}
      </div> 
    
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m)=>(
          <li key={m.id} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
      </>
      )}
    </div>
  );
}

export default App;
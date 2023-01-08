import { useState } from "react";
import Button from "./components/button.component";
import Statistic from "./components/statistic.component";

const GOOD = 'good';
const NEUTRAL = 'neutral';
const BAD = 'bad';
const ALL = 'all';
const AVERAGE = 'average';
const POSITIVE = 'positive';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  }
  const increaseBad = () => setBad(bad + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const doAverage = () =>  {
    let tempGood = good;
    let tempBad = bad;
    let tempAll = all;
    setAverage((tempGood - tempBad)/tempAll);
  }

  const doPositive = () => {
    let tempGood = good;
    let tempAll = all;
    setPositive((tempGood*100)/tempAll);
  }

  const buttonClick = (event) => {
    if(event.target.localName === 'button') {
      setAll(all+1);
    }
    doAverage();
    doPositive();
  };

  const statistics = [
    { name: GOOD, value: good },
    { name: NEUTRAL, value: neutral },
    { name: BAD, value: bad },
    { name: ALL, value: all },
    { name: AVERAGE, value: average },
    { name: POSITIVE, value: positive },
  ]

  return (
    <div>
      <h1>give feedback</h1>
      <div onClick={buttonClick}>
        <Button text={GOOD} onClick={increaseGood} />
        <Button text={NEUTRAL} onClick={increaseNeutral} />
        <Button text={BAD} onClick={increaseBad} />
      </div>
      <h1>statistics</h1>
      {all !== 0 ? <Statistic statistics={statistics} /> : <h2>No feedback given</h2>}
    </div>
  );
}

export default App;

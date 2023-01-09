import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
];
const POINTS = [0,0,0,0,0,0,0];

function getRandomIntInclusive(min = 0, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const App = () => {
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(POINTS);

  const generateRandom = () => {
    let random = getRandomIntInclusive(0, anecdotes.length - 1);
    setSelected(random);
  }

  const doVote = () => {
    let pointsCopy = [ ...points ];
    pointsCopy[selected]++;
    setPoints(pointsCopy);
  }

  const mostVotes = () => {
    let sortedPoints = points.slice().sort();
    let max = sortedPoints[sortedPoints.length - 1];
    let maxIndex = points.findIndex((element) => element === max);
    return (
      <p>
        {anecdotes[maxIndex]}
      </p>
    );
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <p>has {points[selected]} votes.</p>
      <button onClick={doVote}>vote</button>
      <button onClick={generateRandom}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>
        {mostVotes()}
      </div>
    </div>
  )
}

export default App;
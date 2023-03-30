import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    add(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
    vote(state, action) {
      console.log('state', JSON.parse(JSON.stringify(state)))
      const id = action.payload
      let anecdoteToChange = state.find(anecdote => anecdote.id === id)
      anecdoteToChange = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteToChange)
    }
  }
})

export const { add, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
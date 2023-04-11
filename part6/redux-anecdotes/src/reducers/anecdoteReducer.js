import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      // update the state so that it displays the anecdote received in action.payload
      let filteredAnecdotes = state.filter(anecdote => anecdote.id !== action.payload.id)
      return [
        ...filteredAnecdotes,
        action.payload
      ]
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { add, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdoteThunk = id => {
  return async (dispatch, getState) => {
    let anecdote = getState().anecdotes.find(anecdote => anecdote.id === id)
    anecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    const newAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(vote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
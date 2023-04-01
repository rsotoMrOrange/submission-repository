import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteThunk } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const compare = (a, b) => {
  if (a.votes > b.votes) return -1
  if (a.votes < b.votes) return 1
  return 0
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  let anecdotes = useSelector(state => {
    if(state.filter === '') return state.anecdotes
    else {
      return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter))
    }
  })
  
  const voteAnecdote = (anecdote) => {
    dispatch(voteAnecdoteThunk(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3000))
  }
  
  anecdotes = [...anecdotes].sort(compare)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
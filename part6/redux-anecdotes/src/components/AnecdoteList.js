import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { messageChange, showMessage } from '../reducers/notificationReducer'

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
    dispatch(vote(anecdote.id))
    dispatch(messageChange(`you voted '${anecdote.content}'`))
    dispatch(showMessage(true))
    setTimeout(() => {
      dispatch(showMessage(false))
    }, 5000)
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
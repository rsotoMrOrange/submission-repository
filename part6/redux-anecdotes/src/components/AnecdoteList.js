import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const compare = (a, b) => {
  console.log('compare')
  if (a.votes > b.votes) return -1
  if (a.votes < b.votes) return 1
  return 0
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if(state.filter === '') return state.anecdotes
    else {
      return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter))
    }
  })
  
  const voteAnecdote = (id) => {
    dispatch(vote(id))
  }
  
  anecdotes.sort(compare)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
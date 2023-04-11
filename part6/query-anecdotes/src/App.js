import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { useMutation, useQueryClient } from "react-query"
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'voted', content: anecdote.content})
    setTimeout(() => {
      notificationDispatch({ type: 'hide' })
    }, 5000);
  }

  const result = useQuery('anecdotes', getAnecdotes)
  console.log('result', result)

  if(result.status === 'error') {
    return (
      <div>
        <h1>anecdote service not available due to problems in server</h1>
      </div>
    )
  }

  if(result.status === 'loading') {
    return (
      <div>
        ...loading
      </div>
    )
  }

  
  const anecdotes = result.data
  

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../services/anecdotes"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'voted', content: newAnecdote.content})
      setTimeout(() => {
        notificationDispatch({ type: 'hide' })
      }, 5000);
    },
    onError: () => {
      notificationDispatch({ type: 'failed' })
      setTimeout(() => {
        notificationDispatch({ type: 'hide' })
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

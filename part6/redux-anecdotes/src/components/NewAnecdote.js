import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"
import { messageChange, showMessage } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(add(content))
    dispatch(messageChange(`you created '${content}'`))
    dispatch(showMessage(true))
    setTimeout(() => {
      dispatch(showMessage(false))
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            type='text'
            name='anecdote'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default NewAnecdote
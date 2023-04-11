import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data 
  } catch (error) {
    console.log('error', error)
  }
}

const createNew = async content => {
  const object = {
    content,
    votes: 0,
  }

  try {
    const response = await axios.post(baseUrl, object)
    return response.data
  } catch (error) {
    console.log('error', error)
  }
}

const updateAnecdote = async anecdote => {
  try {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
  } catch (error) {
    console.log('error', error)
  }
}

export default { getAll, createNew, updateAnecdote }
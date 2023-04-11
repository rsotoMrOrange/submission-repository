import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      filter 
      <input
        type='text'
        placeholder='filter anecdotes...'
        onChange={(event) => dispatch(filterChange(event.target.value))}
      />
    </div>
  )
}

export default Filter
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'


const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <button
        onClick={() => {store.dispatch({type: 'GOOD'})}}
      >
        good
      </button>
      <button
        onClick={() => {store.dispatch({type: 'OK'})}}
      >
        ok
      </button>
      <button
        onClick={() => {store.dispatch({type: 'BAD'})}}
      >
        bad
      </button>
      <button
        onClick={() => {store.dispatch({type: 'ZERO'})}}
      >
        zero
      </button>
      <div>
        {JSON.stringify(store.getState())}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
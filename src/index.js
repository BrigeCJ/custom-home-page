import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './assets/styles/base.css'

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

render()

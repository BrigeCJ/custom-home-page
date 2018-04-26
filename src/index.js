import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
  render () {
    return (
      <h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>你想偷看？没门！</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

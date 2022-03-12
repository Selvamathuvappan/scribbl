import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from "./Components/Canvas"

const App = () => {
    return (
        <Canvas />
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
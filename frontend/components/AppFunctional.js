import React, { useState } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {
  const [state, setState] = useState({
    yAxis: 1,
    xAxis: 1,
    total: 0,
    email: "",
    errorMessage: "",
    grid: [
      [null, null, null],
      [null, "B", null],
      [null, null, null]
    ]
  })
  
  const isActive = (value) => {
    if (value === "B") {
      return "square active"
    } else {
      return "square"
    }
  }

  const goUp = () => {
    if (state.yAxis - 1 < 0) {
      return setState({
      ...state,
      errorMessage: "You can't go up"
    })
  }
    const initArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    const updatedArray = initArray
    updatedArray[state.yAxis - 1][state.xAxis] = "B"
    setState({
      ...state,
      yAxis: state.yAxis - 1,
      total: state.total + 1,
      errorMessage: "",
      grid: updatedArray
    })
  }


  const goDown = () => {
    if (state.yAxis + 1 > 2) return setState({
        ...state,
        errorMessage: "You can't go down"
      })
      const initArray = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
      const updatedArray = initArray
      updatedArray[state.yAxis + 1][state.xAxis] = "B"
      setState({
        ...state,
        yAxis: state.yAxis + 1,
        total: state.total + 1,
        errorMessage: "",
        grid: updatedArray
      })
    }

  const goLeft = () => {
    if (state.xAxis - 1 < 0) return setState({
        ...state,
        errorMessage: "You can't go left"
      })
      const initArray = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
      const updatedArray = initArray
      updatedArray[state.yAxis][state.xAxis - 1] = "B"
      setState({
        ...state,
        xAxis: state.xAxis - 1,
        total: state.total + 1,
        errorMessage: "",
        grid: updatedArray
      })
    }

  const goRight = () => {
    if (state.xAxis + 1 > 2) return setState({
        ...state,
        errorMessage: "You can't go right"
      })
      const initArray = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
      const updatedArray = initArray
      updatedArray[state.yAxis][state.xAxis + 1] = "B"
      setState({
        ...state,
        xAxis: state.xAxis + 1,
        total: state.total + 1,
        errorMessage: "",
        grid: updatedArray
      })
    }

  const reset = () => {
    setState({
      ...state,
      yAxis: 1,
      xAxis: 1,
      total: 0,
      email: "",
      errorMessage: "",
      grid: [
        [null, null, null],
        [null, "B", null],
        [null, null, null]
      ]
    })
  }

  const handleSubmit = event => {
    const data = { 
      "x": state.xAxis + 1,
      "y": state.yAxis + 1,
      "steps": state.total, 
      "email": state.email 
    }
    axios.post("http://localhost:9000/api/result/", data)
      .then(res => {
        console.log(res.data)
        setState({
          ...state,
          errorMessage: res.data.message,
          email: ""
        })
      })
      .catch(err => {
        return setState({
          ...state,
          errorMessage: err.response.data.message,
          email: ""
        })
      })
      event.preventDefault();
  }

  const onChange = event => {
    setState({
      ...state,
      email: event.target.value
    })
  }


  return (
    <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({state.xAxis + 1}, {state.yAxis + 1})</h3>
          <h3 id="steps">You moved { state.total } time</h3>
      </div>
      <div id="grid">
          {
            state.grid.map( (square, index) => {
              //console.log(square, index)
              return(
                square.map( (subSquare, subIndex) => {
                return (
                  <div key={subIndex} className={isActive(subSquare)}>{subSquare}</div>
                )
              })
              )
            })
          }
        </div>
      <div className="info">
          <h3 id="message">{state.errorMessage}</h3>
      </div>
      <div id="keypad">
          <button id="left" onClick={() => goLeft()}>LEFT</button>
          <button id="up" onClick={goUp}>UP</button>
          <button id="right" onClick={() => goRight()}>RIGHT</button>
          <button id="down" onClick={() => goDown()}>DOWN</button>
          <button id="reset" onClick={() => reset()}>reset</button>
        </div>
      <form onSubmit={handleSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={onChange} value={state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
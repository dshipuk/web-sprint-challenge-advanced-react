import React from 'react'

export default class AppClass extends React.Component {
  state = {
    yAxis: 1,
    xAxis: 1,
    total: 0,
    grid: [
      ["", "", ""],
      ["", "B", ""],
      ["", "", ""]
    ],
  }

  isActive = (value) => {
    if (value === "B") {
      return "square active"
    } else {
      return "square"
    }
  }

  goUp = () => {
    const initArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    const updatedArray = initArray
    updatedArray[this.state.yAxis - 1][this.state.xAxis] = "B"
    this.setState({
      ...this.state,
      yAxis: this.state.yAxis - 1,
      grid: updatedArray
    })
  }

  goDown = () => {
    const initArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    const updatedArray = initArray
    updatedArray[this.state.yAxis + 1][this.state.xAxis] = "B"
    this.setState({
      ...this.state,
      yAxis: this.state.yAxis + 1,
      grid: updatedArray
    })
  }

  goLeft = () => {
    const initArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    const updatedArray = initArray
    updatedArray[this.state.yAxis][this.state.xAxis - 1] = "B"
    this.setState({
      ...this.state,
      xAxis: this.state.xAxis - 1,
      grid: updatedArray
    })
  }

  goRight = () => {
    const initArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    const updatedArray = initArray
    updatedArray[this.state.yAxis][this.state.xAxis + 1] = "B"
    this.setState({
      ...this.state,
      xAxis: this.state.xAxis + 1,
      grid: updatedArray
    })
  }

  reset = () => {
    const initArray = [
      ["", "", ""],
      ["", "B", ""],
      ["", "", ""]
    ]
    const updatedArray = initArray
    this.setState({
      ...this.state,
      xAxis: 1,
      yAxis: 1,
      grid: updatedArray
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.xAxis}, {this.state.yAxis})</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            this.state.grid.map( (square, index) => {
              //console.log(square, index)
              return(
                square.map( (subSquare, subIndex) => {
                return (
                  <div key={index} className={this.isActive(subSquare)}>{subSquare}</div>
                )
              })
              )
            })
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.goLeft()}>LEFT</button>
          <button id="up" onClick={() => this.goUp()}>UP</button>
          <button id="right" onClick={() => this.goRight()}>RIGHT</button>
          <button id="down" onClick={() => this.goDown()}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

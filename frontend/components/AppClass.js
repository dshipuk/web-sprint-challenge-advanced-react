import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    yAxis: 1,
    xAxis: 1,
    total: 0,
    email: "",
    errorMessage: "",
    grid: [
      [null, null, null],
      [null, "B", null],
      [null, null, null],
    ],
  };

  isActive = (value) => {
    if (value === "B") {
      return "square active";
    } else {
      return "square";
    }
  };

  goUp = () => {
    if (this.state.yAxis - 1 < 0) {
      return this.setState({
        ...this.state,
        errorMessage: "You can't go up",
      });
    }
    const initArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const updatedArray = initArray;
    updatedArray[this.state.yAxis - 1][this.state.xAxis] = "B";
    this.setState({
      ...this.state,
      yAxis: this.state.yAxis - 1,
      total: this.state.total + 1,
      errorMessage: "",
      grid: updatedArray,
    });
  };

  goDown = () => {
    if (this.state.yAxis + 1 > 2)
      return this.setState({
        ...this.state,
        errorMessage: "You can't go down",
      });
    const initArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const updatedArray = initArray;
    updatedArray[this.state.yAxis + 1][this.state.xAxis] = "B";
    this.setState({
      ...this.state,
      yAxis: this.state.yAxis + 1,
      total: this.state.total + 1,
      errorMessage: "",
      grid: updatedArray,
    });
  };

  goLeft = () => {
    if (this.state.xAxis - 1 < 0)
      return this.setState({
        errorMessage: "You can't go left",
      });
    const initArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const updatedArray = initArray;
    updatedArray[this.state.yAxis][this.state.xAxis - 1] = "B";
    this.setState({
      ...this.state,
      xAxis: this.state.xAxis - 1,
      total: this.state.total + 1,
      errorMessage: "",
      grid: updatedArray,
    });
  };

  goRight = () => {
    if (this.state.xAxis + 1 > 2)
      return this.setState({
        errorMessage: "You can't go right",
      });
    const initArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const updatedArray = initArray;
    updatedArray[this.state.yAxis][this.state.xAxis + 1] = "B";
    this.setState({
      ...this.state,
      xAxis: this.state.xAxis + 1,
      total: this.state.total + 1,
      errorMessage: "",
      grid: updatedArray,
    });
  };

  reset = () => {
    this.setState({
      ...this.state,
      yAxis: 1,
      xAxis: 1,
      total: 0,
      email: "",
      errorMessage: "",
      grid: [
        [null, null, null],
        [null, "B", null],
        [null, null, null],
      ],
    });
  };

  handleSubmit = (event) => {
    const data = {
      x: this.state.xAxis + 1,
      y: this.state.yAxis + 1,
      steps: this.state.total,
      email: this.state.email,
    };
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/result/", data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          errorMessage: res.data.message,
        });
      })
      .catch((err) => {
        return this.setState({
          ...this.state,
          errorMessage: err.response.data.message,
        });
      })
      .finally(
        this.setState({
          email: "",
        })
      );
  };

  onChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.xAxis + 1}, {this.state.yAxis + 1})
          </h3>
          <h3 id="steps">You moved {this.state.total} times</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((square, index) => {
            //console.log(square, index)
            return square.map((subSquare, subIndex) => {
              return (
                <div key={subIndex} className={this.isActive(subSquare)}>
                  {subSquare}
                </div>
              );
            });
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.errorMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.goLeft()}>
            LEFT
          </button>
          <button id="up" onClick={() => this.goUp()}>
            UP
          </button>
          <button id="right" onClick={() => this.goRight()}>
            RIGHT
          </button>
          <button id="down" onClick={() => this.goDown()}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.reset()}>
            reset
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

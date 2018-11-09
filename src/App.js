import Button from "./components/button";
import React, { Component } from "react";
import SliderImage from "./components/SliderImage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { left: -40, moving: true, animation: false };
  }

  componentDidMount() {
    this.sliderList = document.getElementsByClassName("slider-list")[0];
    setInterval(() => {
      if (this.state.animation === false) {
        this.setState({ animation: true }, () => {
          this.updateDirection(() => {
            let move;
            move = this.getNextPosition();
            this.setNewPosition(move);
          });
        });
      }
    }, 3000);
  }

  setNewPosition(move) {
    this.setState({ left: move }, () => {
      this.sliderList.style.left = this.state.left + "px";
      setTimeout(() => {
        this.setState({ animation: false });
      }, 2000);
    });
  }

  updateDirection(callback) {
    if (this.state.left <= -2100) {
      this.setState({ moving: false }, callback);
    } else if (this.state.left >= -40) {
      this.setState({ moving: true }, callback);
    } else {
      callback();
    }
  }

  getNextPosition() {
    let move;
    if (this.state.moving) {
      move = this.state.left - 700;
    } else {
      move = this.state.left + 700;
    }
    return move;
  }

  updateSlider(value) {
    if (value === "-") {
      if (this.state.animation === false) {
        if (this.state.left <= -740) {
          this.setState({ animation: true }, () => {
            let move = this.state.left + 700;
            this.setNewPosition(move);
          });
        }
      }
    } else if (value === "+") {
      if (this.state.animation === false) {
        if (this.state.left >= -1440) {
          this.setState({ animation: true }, () => {
            let move = this.state.left - 700;
            this.setNewPosition(move);
          });
        }
      }
    }
  }
  render() {
    return (
      <div className="App">
        <div className="main-container">
          <div className="slider-container">
            <ul className="slider-list">
              <SliderImage image="./images/colorado.jpg" />
              <SliderImage image="./images/sunrise.jpg" />
              <SliderImage image="./images/monte-vista.jpg" />
              <SliderImage image="./images/medium.jpg" />
            </ul>
          </div>

          <div className="button-group">
            <Button
              value=" &#171;"
              update={this.updateSlider.bind(this)}
              returnValue="-"
              buttonClass="button-left"
            />
            <Button
              value="&#187;"
              update={this.updateSlider.bind(this)}
              returnValue="+"
              buttonClass="button-right"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

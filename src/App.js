import Button from "./components/button";
import React, { Component } from "react";
import SliderImage from "./components/SliderImage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { left: -40, moving: true, animation: false };
    this.imageList = [
      "colorado.jpg",
      "sunrise.jpg",
      "monte-vista.jpg",
      "medium.jpg"
    ];
  }

  componentDidMount() {
    this.sliderList = this.refs.slider;
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
    let dots = [];
    for (let i in this.imageList) {
      dots.push(
        <li key={i} className="dots">
          <span className="dot-image" />
        </li>
      );
    }
    return (
      <div className="App">
        <div className="main-container">
          <div className="slider-container">
            <ul className="slider-list" ref="slider">
              {this.imageList.map((image, index) => {
                let location = `./images/${image}`;
                return <SliderImage image={location} key={index} />;
              })}
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
          <div>
            <ul className="dot-group">{dots}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

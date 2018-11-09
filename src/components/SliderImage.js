import React, { Component } from "react";

class SliderImage extends Component {
  render() {
    return (
      <li className="slider-item">
        <img src={this.props.image} className="slider-image" />
      </li>
    );
  }
}

export default SliderImage;

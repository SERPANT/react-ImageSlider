import React, { Component } from "react";

class Button extends Component {
  spin() {
    this.props.update(this.props.returnValue);
  }
  render() {
    return (
      <span className={this.props.buttonClass} onClick={this.spin.bind(this)}>
        {this.props.value}
      </span>
    );
  }
}

export default Button;

import React from "react";
import "./Input.sass";

export interface InputProps {
  value: string;
  placeholder: string;
  handleChange: (value: string) => void;
  maxLength?: number;
}

class Input extends React.Component<InputProps> {
  render() {
    return (
      <div className="input">
        <input
          className="input-field"
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={(e) => this.props.handleChange(e.target.value)}
          maxLength={this.props.maxLength}
        />
        <span
          className="input-reset"
          onClick={() => this.props.handleChange("")}
        >
          &nbsp;
        </span>
      </div>
    );
  }
}

export default Input;

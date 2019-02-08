import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  amount: state.amount,
  username: state.username
});

class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  };

  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  };

  render() {
    return (
      <div className="counter">
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Counter);

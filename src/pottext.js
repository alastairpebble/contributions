import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    calculate: state.calculate
  };
};

class PotText extends React.Component {
  state = { calculate: 0 };

  futureAmount = () => {
    console.log("before dispatch");
    this.props.dispatch({ type: "CALCULATEFUTURE" });
    //this.setState({ amount: this.props.store.getState().amount })

    console.log("after dispatch" + this.state.amount);
  };

  currentAmount = () => {
    this.props.dispatch({ type: "CALCULATECURRENT" });
  };

  render() {
    return (
      <div className="counter">
        <h2>Pot Text</h2>
        <span>AMOUNT {this.props.calculate}</span>
        <div>
          <button onClick={this.currentAmount}>-</button>

          <button onClick={this.futureAmount}>+</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PotText);

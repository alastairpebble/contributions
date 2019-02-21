import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    calculate: state.calculate
  };
};

class PotText extends React.Component {
  //state = { calculate: 0 };

  futureAmount = () => {
    //console.log("before dispatch");
    this.props.dispatch({ type: "CALCULATEFUTURE" });
    //this.setState({ amount: this.props.store.getState().amount })

    //console.log("after dispatch" + this.state.amount);
  };

  currentAmount = () => {
    this.props.dispatch({ type: "CALCULATECURRENT", data: { test: 123456 } });
  };

  render() {
    return (
      <div className="counter">
        <h2 className="headline--two">
          <b>Projected Total</b>
        </h2>

        <h1 className="headline--one">
          £{Math.round(this.props.calculate.number).toLocaleString("en")}
        </h1>
        <span>({Math.round(this.props.calculate.percentage)}%)</span>
        <div style={{ opacity: 0 }}>
          <button onClick={this.currentAmount}>-</button>

          <button onClick={this.futureAmount}>+</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PotText);

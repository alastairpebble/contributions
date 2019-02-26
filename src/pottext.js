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
        <h1 className="headline--one">
          <b>Projected Total*</b>
        </h1>
        <h1 className="headline--money">
          £{Math.round(this.props.calculate.number).toLocaleString("en")}
        </h1>
        <h3 className="headline--three">
          Giving a monthly income of{" "}
          <b>
            £
            {Math.round(this.props.calculate.income.monthly).toLocaleString(
              "en"
            )}
          </b>{" "}
          for <b>{this.props.calculate.income.for.years}</b> years and{" "}
          <b>{this.props.calculate.income.for.months}</b> months
        </h3>
        <span style={{ opacity: 0 }}>
          ({Math.round(this.props.calculate.percentage)}%)
        </span>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PotText);

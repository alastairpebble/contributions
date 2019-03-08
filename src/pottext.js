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
    let monthString = `and ${this.props.calculate.income.for.months} months`;
    if (this.props.calculate.income.for.months == 0) {
      monthString = "";
    }
    return (
      <div className="counter">
        <h1 className="headline--two mb-0">Projected Total*</h1>
        <h1 className="headline--money mb-0">
          £{Math.round(this.props.calculate.number).toLocaleString("en")}
        </h1>
        <h3 className="headline--three mb-0 p-4">
          Giving you a monthly income of{" "}
          <b>
            £
            {Math.round(this.props.calculate.income.monthly).toLocaleString(
              "en"
            )}
          </b>{" "}
          for life
          <br />
          <div className="hide">
            for {this.props.calculate.income.for.years} years {monthString}
          </div>
        </h3>
        <div className="button--link p-2">*How is this calculated?</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PotText);

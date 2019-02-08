import React from "react";
import Swiper from "react-id-swiper";
import PotText from "./pottext";
import Counter from "./Counter";

import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    calculate: state.calculate,
    counter: state.counter,
    personas: state.personas
  };
}

var localData = {
  people: [
    {
      firstname: "Will"
    },
    {
      firstname: "Dan"
    }
  ]
};

class Pages extends React.Component {
  state = { calculate: 0 };

  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    //this.swiper = null;
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }

  currentAmount = () => {
    this.props.dispatch({ type: "CALCULATECURRENT" });
  };

  futureAmount = () => {
    this.props.dispatch({ type: "CALCULATEFUTURE" });
  };

  setCurrentPersona = () => {
    this.props.dispatch({ type: "CURRENTPERSONA" });
  };

  setOtherPersona = () => {
    this.props.dispatch({ type: "NEWPERSONA" });
  };

  doCalculation() {
    //data.number += 100;
    alert("do calculation" + this.props.amount);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) {
      console.log(prevProps.amount);
      console.log("did update");
    }
  }
  render() {
    const params = {
      preventClicks: false,
      hashNavigation: {
        replaceState: true,
        watchState: true
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      /*
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      */
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      runCallbacksOnInit: true,
      onInit: swiper => {
        this.swiper = swiper;
      }
    };

    var firstName = localData.people[this.props.personas].firstname;
    var testDisplay = this.props.personas;
    console.log("firstName" + firstName);
    return (
      <div>
        <Swiper {...params} shouldSwiperUpdate>
          <div className="page">
            <div className="page__section page__text">
              <h3 className="headline--two">Ok.</h3>
              <h3 className="headline--two">
                {testDisplay}
                {firstName}
                Let's investigate this money making contribution a little
                further.
              </h3>

              <a className="button--primary" href="#slide2">
                Next
              </a>
            </div>
            <div className="page__section page__visual" />
          </div>

          <div className="page" data-hash="slide2">
            <div className="page__section page__text">
              <h3 className="headline--two">
                As you know, <span className="personal">£97</span>, or just over
                half, came from you. <br />
                <br /> That’s <span className="personal">5%</span> of your
                salary.
              </h3>

              <a className="button--primary" href="#slide3">
                Next
              </a>
            </div>
            <div className="page__section page__visual" />
          </div>

          <div className="page" data-hash="slide3">
            <div className="page__section page__text">
              <h3 className="headline--two">
                The better news is that <span className="employer">£86</span>{" "}
                was put in by Tesco (that’s in addition to your regular pay).
              </h3>

              <a className="button--primary" href="#slide4">
                Next
              </a>
            </div>
            <div className="page__section page__visual" />
          </div>

          <div className="page" data-hash="slide4">
            <div className="page__section page__text">
              <h3 className="headline--two">
                The <i>even</i> better news is that the remaining{" "}
                <span className="government">£16</span> was topped up by the
                government.
              </h3>

              <a className="button--primary" href="#slide5">
                Next
              </a>
            </div>
            <div className="page__section page__visual" />
          </div>

          <div className="page" data-hash="slide5">
            <div className="page__section page__text">
              <h3 className="headline--two">
                The more you contribute each month, the more income you will
                earn and invest towards retirement.
              </h3>

              <a className="button--primary" href="#slide6">
                Next
              </a>
            </div>
            <div className="page__section page__visual" />
          </div>

          <div className="page" data-hash="slide6">
            <div className="page__section page__text">
              <h3 className="headline--two">
                Increase your salary contributions by just 1% to make a big
                difference to your future income {firstName}
              </h3>

              <a className="button--primary" onClick={this.currentAmount}>
                Current
              </a>
              <br />
              <a className="button--primary" onClick={this.futureAmount}>
                Future
              </a>
              <a className="button--primary" onClick={this.setCurrentPersona}>
                Set current persona
              </a>
              <a className="button--primary" onClick={this.setOtherPersona}>
                Set other persona
              </a>
            </div>
            <div className="page__section page__visual">
              <div>
                <PotText />
              </div>
            </div>
          </div>
        </Swiper>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Pages);

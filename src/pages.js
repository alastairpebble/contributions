import React from "react";
import Swiper from "react-id-swiper";
import PotText from "./pottext";
import Counter from "./Counter";
import { data } from "./data";
import { connect } from "react-redux";
import { PieSegments } from "./piesegments";

function mapStateToProps(state) {
  return {
    calculate: state.calculate,
    counter: state.counter,
    personas: state.personas
  };
}

class Pages extends React.Component {
  state = { calculate: 0 };

  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    //this.swiper = null;

    this.state = {
      calculate: 0,
      data: null
    };
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

  superFutureAmount = () => {
    this.props.dispatch({ type: "CALCULATESUPERFUTURE" });
  };

  setCurrentPersona = () => {
    this.props.dispatch({ type: "CURRENTPERSONA" });
  };

  setOtherPersona = () => {
    this.props.dispatch({ type: "NEWPERSONA" });
  };

  dataFetched(data) {
    console.log("Some external data");
    console.log(JSON.stringify(data));
    console.log(data.content.personas);
    this.setState({ data: data });
    //alert(JSON.stringify(data));
  }

  componentDidMount() {
    fetch("./staticdata.js")
      .then(response => response.json())
      .then(data => this.dataFetched(data));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.calculate !== this.props.calculate) {
      console.log(prevProps.calculate);
      console.log("did update");
    }
  }
  render() {
    const swiperparams = {
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
      runCallbacksOnInit: true,
      shouldSwiperUpdate: true,
      onSlideChangeStart: swiper => {
        console.log("onSlideChangeStart");
      },
      onInit: swiper => {
        console.log("swiper init");
        this.swiper = swiper;
      }
    };

    console.log("swiper init not called");
    return (
      <div>
        <Swiper {...swiperparams} shouldSwiperUpdate>
          <div className="page">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two">
                  <b>£200</b> has been added to your pension. Though, it
                  actually cost you much less.
                </h3>
                <h3 className="headline--two">Let’s find out how.</h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" href="#slide2">
                  Continue
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content page__visual--binoculars" />
            </div>
          </div>

          <div className="page" data-hash="slide2">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two">
                  <span className="personal">£100</span> came out of your pay.
                </h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" href="#slide3">
                  Continue
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content">
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie">
                    <PieSegments
                      percentage="0.5"
                      color="#50E2C0"
                      strokeColor="#50E2C0"
                    />
                  </div>
                </div>
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie page__visual__pie--rotate-personal">
                    <PieSegments
                      percentage="0.5"
                      color="#FF9C36"
                      strokeColor="#FF9C36"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page" data-hash="slide3">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two">
                  Of which <span className="government">£25</span> is actually
                  contributed by the government in the form of a tax rebate.
                </h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" href="#slide4">
                  Continue
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content">
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie page__visual__pie--translate-employer">
                    <PieSegments
                      percentage="0.5"
                      color="#50E2C0"
                      strokeColor="#50E2C0"
                    />
                  </div>
                </div>
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie page__visual__pie--rotate-personal">
                    <PieSegments
                      percentage="0.395"
                      color="#FF9C36"
                      strokeColor="#FF9C36"
                    />
                  </div>
                </div>
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie page__visual__pie--rotate-tax">
                    <PieSegments
                      percentage="0.1"
                      color="#FF9CAD"
                      strokeColor="#FF9CAD"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page" data-hash="slide4">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two">
                  Your employer put in the remaining
                  <span className="employer">£100</span>
                </h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" href="#slide5">
                  Continue
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content">
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie">
                    <PieSegments
                      percentage="0.5"
                      color="#50E2C0"
                      strokeColor="#50E2C0"
                    />
                  </div>
                </div>
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie page__visual__pie--rotate-personal">
                    <PieSegments
                      percentage="0.395"
                      color="#FF9C36"
                      strokeColor="#FF9C36"
                    />
                  </div>
                </div>
                <div className="page__visual__pie__wrapper">
                  <div className="page__visual__pie page__visual__pie--rotate-tax">
                    <PieSegments
                      percentage="0.1"
                      color="#FF9CAD"
                      strokeColor="#FF9CAD"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page" data-hash="slide5">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two headline--two--bold">
                  <b>Did you know?</b>
                </h3>
                <h3 className="headline--two">
                  Small increases to these contributions will make a big
                  difference to your retirement income.
                </h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" href="#slide6">
                  Continue
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content page__visual--statement" />
            </div>
          </div>

          <div className="page" data-hash="slide6">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two">
                  <b>Contribution level</b>
                </h3>
                <h3 className="headline--three">
                  *Your employer will match your contributions up to 5%
                </h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" onClick={this.currentAmount}>
                  Current (
                  {Math.round(
                    data.personas[0].pensions.pot.now.contributions.personal *
                      100
                  )}
                  %)
                </a>
                <a className="button--primary" onClick={this.futureAmount}>
                  Future (
                  {Math.round(
                    data.personas[0].pensions.pot.future.contributions
                      .personal * 100
                  )}
                  %)
                </a>
                <a className="button--primary" onClick={this.superFutureAmount}>
                  Super Future (
                  {Math.round(
                    data.personas[0].pensions.pot.superfuture.contributions
                      .personal * 100
                  )}
                  %)
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content">
                <PotText />
              </div>
            </div>
          </div>

          <div className="page" data-hash="slide7">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two">
                  Please confirm the change to your regular pension contribution
                  amount
                </h3>
              </div>
              <div className="page__text__actions">
                <a className="button--primary" onClick={this.currentAmount}>
                  Current
                </a>
                <br />
                <a className="button--primary" onClick={this.futureAmount}>
                  Future
                </a>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content">
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

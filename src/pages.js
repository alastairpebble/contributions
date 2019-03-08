import React from "react";
import Flickity from "react-flickity-component";
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
      data: null,
      currentPage: {
        index: 0
      },
      contributions_radio: {
        contrib1: true,
        contrib2: false,
        contrib3: false
      },
      contributions_confirm_radio: {
        yes: true,
        no: false
      }
    };
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }

  confirmYesContributionChange = () => {
    this.setState({
      contributions_confirm_radio: {
        yes: true,
        no: false
      }
    });
  };

  confirmNoContributionChange = () => {
    this.setState({
      contributions_confirm_radio: {
        yes: false,
        no: true
      }
    });
  };

  currentAmount = () => {
    this.props.dispatch({ type: "CALCULATECURRENT" });
    this.setState({
      contributions_radio: {
        contrib1: true,
        contrib2: false,
        contrib3: false
      }
    });
  };

  futureAmount = () => {
    this.props.dispatch({ type: "CALCULATEFUTURE" });
    this.setState({
      contributions_radio: {
        contrib1: false,
        contrib2: true,
        contrib3: false
      }
    });
  };

  superFutureAmount = () => {
    this.props.dispatch({ type: "CALCULATESUPERFUTURE" });
    this.setState({
      contributions_radio: {
        contrib1: false,
        contrib2: false,
        contrib3: true
      }
    });
  };

  setCurrentPersona = () => {
    this.props.dispatch({ type: "CURRENTPERSONA" });
  };

  setOtherPersona = () => {
    this.props.dispatch({ type: "NEWPERSONA" });
  };

  dataFetched(data) {
    //console.log("Some external data");
    //console.log(JSON.stringify(data));
    //console.log(data.content.personas);
    this.setState({ data: data });
    //alert(JSON.stringify(data));
  }

  componentDidMount = () => {
    // You can register events in componentDidMount hook
    this.flkty.on("settle", () => {
      this.setState({
        currentPage: {
          index: this.flkty.selectedIndex
        }
      });
      console.log(`current index is ${this.flkty.selectedIndex}`);
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.calculate !== this.props.calculate) {
      //console.log(prevProps.calculate);
      //console.log("did update");
    }
  }

  myCustomNext = () => {
    // You can use Flickity API
    console.log("myCustomNext");
    this.flkty.next();
  };
  render() {
    const FlickityOptions = {
      dragThreshold: 25
    };

    return (
      <Flickity flickityRef={c => (this.flkty = c)} options={FlickityOptions}>
        <div className="page">
          <div className="page__header" />
          <div className="page__content">
            <div className="page__section page__text">
              <div className="page__text__content p-0">
                <h3 className="headline--two">
                  <b>
                    £
                    {Math.round(
                      data.personas[0].pensions.pot.now.contributions.amount
                        .personal * 2
                    )}
                  </b>{" "}
                  has been added to your pension. Though, it actually cost you
                  much less.
                </h3>
                <h3 className="headline--two mb-0">Let’s find out how.</h3>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content page__visual--binoculars" />
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="page" data-hash="slide2">
          <div className="page__header" />
          <div className="page__content">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two mb-0">
                  <span className="personal">
                    £
                    {Math.round(
                      data.personas[0].pensions.pot.now.contributions.amount
                        .personal
                    )}
                  </span>{" "}
                  came out of your pay.
                </h3>
              </div>
            </div>
            <div className="page__section page__visual page__visual--including-pie">
              <div className="page__visual__content">
                <div className="page__visual__pie__all__wrapper">
                  <div className="page__visual__pie__label__wrapper page__visual__pie__label__wrapper--personal">
                    <div className="page__visual__pie__label">
                      £
                      {Math.round(
                        data.personas[0].pensions.pot.now.contributions.amount
                          .personal
                      )}
                    </div>
                  </div>
                  <div className="page__visual__pie__wrapper">
                    <div className="page__visual__pie page__visual__pie--translate-employer">
                      <PieSegments
                        percentage="0.5"
                        color="#DCF3F7"
                        strokeColor="#ffffff"
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
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="page" data-hash="slide3">
          <div className="page__header" />
          <div className="page__content">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two mb-0">
                  Of which{" "}
                  <span className="government">
                    £
                    {Math.round(
                      data.personas[0].pensions.pot.now.contributions.amount
                        .personal / 4
                    )}
                  </span>{" "}
                  is actually contributed by the government in the form of a tax
                  relief.
                </h3>
              </div>
            </div>
            <div className="page__section page__visual page__visual--including-pie ">
              <div className="page__visual__content">
                <div className="page__visual__pie__all__wrapper">
                  <div className="page__visual__pie__label__wrapper page__visual__pie__label__wrapper--tax">
                    <div className="page__visual__pie__label">
                      £
                      {Math.round(
                        data.personas[0].pensions.pot.now.contributions.amount
                          .personal / 4
                      )}
                    </div>
                  </div>
                  <div className="page__visual__pie__wrapper">
                    <div className="page__visual__pie page__visual__pie--translate-employer">
                      <PieSegments
                        percentage="0.5"
                        color="#DCF3F7"
                        strokeColor="#ffffff"
                      />
                    </div>
                  </div>
                  <div className="page__visual__pie__wrapper">
                    <div className="page__visual__pie page__visual__pie--rotate-personal">
                      <PieSegments
                        percentage="0.370"
                        color="#FF9C36"
                        strokeColor="#FF9C36"
                      />
                    </div>
                  </div>
                  <div className="page__visual__pie__wrapper">
                    <div className="page__visual__pie page__visual__pie--rotate-tax">
                      <PieSegments
                        percentage="0.125"
                        color="#FF9CAD"
                        strokeColor="#FF9CAD"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="page" data-hash="slide4">
          <div className="page__header" />
          <div className="page__content">
            <div className="page__section page__text">
              <div className="page__text__content">
                <h3 className="headline--two mb-0">
                  Your employer put in the remaining{" "}
                  <span className="employer">
                    £
                    {Math.round(
                      data.personas[0].pensions.pot.now.contributions.amount
                        .personal
                    )}
                  </span>
                </h3>
              </div>
            </div>
            <div className="page__section page__visual page__visual--including-pie">
              <div className="page__visual__content">
                <div className="page__visual__pie__all__wrapper">
                  <div className="page__visual__pie__label__wrapper page__visual__pie__label__wrapper--employer">
                    <div className="page__visual__pie__label">
                      £
                      {Math.round(
                        data.personas[0].pensions.pot.now.contributions.amount
                          .personal
                      )}
                    </div>
                  </div>
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
                        percentage="0.370"
                        color="#FF9C36"
                        strokeColor="#FF9C36"
                      />
                    </div>
                  </div>
                  <div className="page__visual__pie__wrapper">
                    <div className="page__visual__pie page__visual__pie--rotate-tax">
                      <PieSegments
                        percentage="0.125"
                        color="#FF9CAD"
                        strokeColor="#FF9CAD"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="page" data-hash="slide5">
          <div className="page__header" />
          <div className="page__content">
            <div className="page__section page__text">
              <div className="page__text__content p-0">
                <h3 className="headline--two headline--two--bold">
                  <b>Did you know?</b>
                </h3>
                <h3 className="headline--two mb-0">
                  A small increase to your contribution could make a big
                  difference to your retirement income.
                </h3>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content page__visual--statement" />
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div id="celebration-slide--slide6" className="page" data-hash="slide6">
          <div className="slide__takeover slide__takeover--hidden" />
          <div className="page__header">
            <p className="headline--two headline--two--small headline--two--bold hidden-md-down">
              Change your contribution to see the effect on your Projected Total
            </p>
          </div>
          <div className="page__content">
            <div className="page__section page__text p-4">
              <div className="page__text__takeover" />
              <div className="page__text__content p-0">
                <p className="headline--three headline--three--bold hidden-md-up">
                  Change your contribution to see the effect on your Projected
                  Total
                </p>
                <div className="input__radio__group">
                  <div className="input__radio__wrapper input__radio__wrapper--small mr-1">
                    <input
                      className="input__radio"
                      type="radio"
                      name="contrib"
                      id="contrib1"
                      value="0.05"
                      checked={this.state.contributions_radio.contrib1}
                    />

                    <label
                      htmlFor="contrib1"
                      className="input__radio__label"
                      onClick={this.currentAmount}
                    >
                      <span className="input__radio__circle" />
                      <div>
                        <span className="input__radio__label__header">
                          {Math.round(
                            data.personas[0].pensions.pot.now.contributions
                              .personal * 100
                          )}
                          %
                        </span>
                        <br />
                        <span className="input__radio__label__body">
                          &pound;
                          {Math.round(
                            data.personas[0].pensions.pot.now.contributions
                              .amount.personal
                          )}{" "}
                          (Now)
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="input__radio__wrapper input__radio__wrapper--small mr-1">
                    <input
                      className="input__radio"
                      type="radio"
                      name="contrib"
                      id="contrib2"
                      value="0.06"
                      checked={this.state.contributions_radio.contrib2}
                    />

                    <label
                      htmlFor="contrib2"
                      className="input__radio__label"
                      onClick={this.futureAmount}
                    >
                      <span className="input__radio__circle" />
                      <div>
                        <span className="input__radio__label__header">
                          {Math.round(
                            data.personas[0].pensions.pot.future.contributions
                              .personal * 100
                          )}
                          %
                        </span>
                        <br />
                        <span className="input__radio__label__body">
                          &pound;
                          {Math.round(
                            data.personas[0].pensions.pot.future.contributions
                              .amount.personal
                          )}{" "}
                          (+&pound;
                          {Math.round(
                            data.personas[0].pensions.pot.future.contributions
                              .amount.personal -
                              data.personas[0].pensions.pot.now.contributions
                                .amount.personal
                          )}
                          )
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="input__radio__wrapper input__radio__wrapper--small">
                    <input
                      className="input__radio"
                      type="radio"
                      name="contrib"
                      id="contrib3"
                      value="0.07"
                      checked={this.state.contributions_radio.contrib3}
                    />

                    <label
                      htmlFor="contrib3"
                      className="input__radio__label"
                      onClick={this.superFutureAmount}
                    >
                      <span className="input__radio__circle" />
                      <div>
                        <span className="input__radio__label__header">
                          {Math.round(
                            data.personas[0].pensions.pot.superfuture
                              .contributions.personal * 100
                          )}
                          %
                        </span>
                        <br />
                        <span className="input__radio__label__body">
                          &pound;
                          {Math.round(
                            data.personas[0].pensions.pot.superfuture
                              .contributions.amount.personal
                          )}{" "}
                          (+&pound;
                          {Math.round(
                            data.personas[0].pensions.pot.superfuture
                              .contributions.amount.personal -
                              data.personas[0].pensions.pot.now.contributions
                                .amount.personal
                          )}
                          )
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <h3 className="headline--three mb-0">
                  Your employer will match your contributions up to 5%
                </h3>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content">
                <br />
                <PotText />
              </div>
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div id="celebration-slide--slide7" className="page" data-hash="slide7">
          <div className="page__header">
            {this.props.calculate.percentage > 4 && (
              <p className="headline--two headline--two--small headline--two--bold hidden-md-down" />
            )}
            {this.props.calculate.percentage > 4 && (
              <p className="headline--two headline--two--small headline--two--bold hidden-md-down">
                Check you’re happy with the change to your contributions.
              </p>
            )}
          </div>
          <div className="page__content">
            <div className="page__section page__text p-4">
              {this.props.calculate.percentage > 4 && (
                <div className="page__text__content p-0">
                  <h2 className="headline--three headline--three--bold  hidden-md-up">
                    Check you’re happy with the change to your contributions.
                  </h2>
                  <div className="input__radio__group input__radio__group--vertical">
                    <div className="input__radio__wrapper">
                      <input
                        className="input__radio"
                        type="radio"
                        name="contrib_confirm"
                        id="contrib_confirm_yes"
                        value="yes"
                        checked={this.state.contributions_confirm_radio.yes}
                      />

                      <label
                        htmlFor="contrib_confirm_yes"
                        className="input__radio__label"
                        onClick={this.confirmYesContributionChange}
                      >
                        <span className="input__radio__circle" />
                        <div>
                          <div className="input__radio__label__header">Yes</div>
                          <div className="input__radio__label__body m-0 pl-1">
                            I would like to increase my contributions to{" "}
                            {Math.round(this.props.calculate.percentage)}%.
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="input__radio__wrapper">
                      <input
                        className="input__radio"
                        type="radio"
                        name="contrib_confirm"
                        id="contrib_confirm_no"
                        value="no"
                        checked={this.state.contributions_confirm_radio.no}
                      />

                      <label
                        htmlFor="contrib_confirm_no"
                        className="input__radio__label"
                        onClick={this.confirmNoContributionChange}
                      >
                        <span className="input__radio__circle" />
                        <div>
                          <div className="input__radio__label__header">No</div>
                          <div className="input__radio__label__body m-0 pl-1">
                            I would like to keep my contributions the same for
                            now.
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {this.props.calculate.percentage <= 4 && (
                <div className="page__text__content">
                  <h2 className="headline--three mb-0">
                    You can go to the previous screen and change your
                    contribution, or leave it as it is for now.
                  </h2>
                </div>
              )}
            </div>
            <div className="page__section page__visual">
              <div className="page__text__content">
                {this.props.calculate.percentage > 4 && (
                  <div>
                    <h2 className="headline--three headline--three--bold mb-0">
                      You've changed your contributions.
                    </h2>
                    <br />
                    <h3 className="headline--three">
                      Your new contribution:{" "}
                      <span>
                        {Math.round(this.props.calculate.percentage)}%
                      </span>
                    </h3>
                    <h3 className="headline--three">
                      Your employer's new contribution:{" "}
                      {Math.round(this.props.calculate.percentage_employer)}%
                    </h3>
                  </div>
                )}
                {this.props.calculate.percentage <= 4 && (
                  <h2 className="headline--three headline--three--bold mb-0">
                    Your contribution value hasn't changed.
                  </h2>
                )}
              </div>
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content">
              <button className="button--primary" onClick={this.myCustomNext}>
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="page" data-hash="slide8">
          <div className="page__header" />
          <div className="page__content">
            <div className="page__section page__text">
              <div className="page__text__content">
                <div>
                  <h2>Thanks, that's the end of the test.</h2>
                  <h2 className="headline--two headline--two--bold mb-0">
                    You can end your session on usertesting.com
                  </h2>
                </div>
              </div>
            </div>
            <div className="page__section page__visual">
              <div className="page__visual__content page__visual--statement page__visual--coffee" />
            </div>
          </div>
          <div className="page__actions">
            <div className="page__actions__content" />
          </div>
        </div>
      </Flickity>
    );
  }
}

export default connect(mapStateToProps)(Pages);

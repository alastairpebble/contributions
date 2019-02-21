import React from "react";

class SmartModal extends React.Component {
  render() {
    return (
      <section className="smartmodal__wrapper">
        <section className="smartmodal">{this.props.children}</section>
      </section>
    );
  }
}

export default SmartModal;

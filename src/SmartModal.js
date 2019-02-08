import React from "react";

class SmartModal extends React.Component {
  render() {
    return <section class="SmartModal">{this.props.children}</section>;
  }
}

export default SmartModal;

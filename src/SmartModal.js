import React from "react";

class SmartModal extends React.Component {
  closeModal = () => {
    alert(
      "This will close the pop-up, but for the demo this has been disabled."
    );
  };

  render() {
    return (
      <section className="smartmodal__wrapper">
        <section className="smartmodal">
          <div className="smartmodal__close" onClick={this.closeModal}>
            close
          </div>
          {this.props.children}
        </section>
      </section>
    );
  }
}

export default SmartModal;

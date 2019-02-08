import * as React from "react";
import styled from "styled-components";
import { data } from "./pages";

const MessageContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  overflow: show;
  background: rgba(255, 0, 0, 0);
  justify-content: flex-start;
`;

// The main MessageContainer styles
const MessageContainer = styled.div`
  max-width: 100%;
  padding: 0px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 16px;
  text-align: center;
  justify-content: flex-start;
  background: rgba(221, 221, 221, 1);
  color: #002c53;
  background: transparent;
  font-family: "Lato";
  font-size: 48px;
`;

// Define type of property
interface Props {
  content: string;
  amount: string;
}

export class PotText extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    content: "£",
    amount: data.amount
  };

  componentDidMount() {
    console.log("mounted");
  }
  componentWillReceiveProps(prevProps) {
    //console.log("receive props");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) {
      //console.log(prevProps.amount);
      //console.log("did update");
    }
  }

  render() {
    var displayAmount = data.amount;

    return (
      <div>
        <div>
          {this.props.content}
          {this.props.amount}
          <b>*</b>
        </div>
      </div>
    );
  }
}

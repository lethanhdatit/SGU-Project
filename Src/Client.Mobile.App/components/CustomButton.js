import React from 'react';
import Button from "react-native-button";

export default class CustomButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onClicked: false
    }
    this.handlerButtonOnClick = this.handlerButtonOnClick.bind(this);
  }
  handlerButtonOnClick(){
    this.setState({
       onClicked: true
    });
  }
  render() {
    var _style;
    if (this.state.onClicked){ // clicked button style
      _style = {
          color: "red",
          ...this.props
        }
    }
    else{ // default button style
      _style = {
          color: "blue",
          ...this.props
        }
    }
    return (
       
            <Button
                onPress={this.handlerButtonOnClick}
                style={_style}>{this.props.Text}</Button>
        
    );
  }
}
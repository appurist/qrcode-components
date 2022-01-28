import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

const READY_MESSAGE = '(ready to scan QR code)';
const RESET_TIMEOUT = 5000; // 5 seconds

class QRCodeReader extends Component {
  constructor(props){
    super(props)
    this.enabled = true;
    this.state = {
      delay: 500,
      result: READY_MESSAGE,
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if (this.enabled && data) {
      // Reset the scan result every RESET_TIMEOUT interval.
      this.enabled = false;
      this.setState({ result: READY_MESSAGE });
      if (data.text) {
        this.setState({
          result: data.text,
        });
        if (typeof this.props.onData === 'function') {
          this.props.onData(data);
        }
      } else {
        console.log("Got something but I can't decode it.");
      }
      setTimeout(()=>{
        this.setState({ result: READY_MESSAGE });
        this.enabled = true;
      }, RESET_TIMEOUT);
    }
  }
  handleError(err){
    console.error("error:", err)
  }
  render(){
    const previewStyle = {
      height: this.props.height || 240,
      width: this.props.width || 320,
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QRCodeReader;

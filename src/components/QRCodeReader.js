import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

const READY_MESSAGE = 'Scanning for QR code...';
const SUCCESS_MESSAGE = 'Got it';
const RESET_TIMEOUT = 3000; // 3 seconds

class QRCodeReader extends Component {
  constructor(props){
    super(props)
    this.enabled = true;
    this.readyMessage = props.ready || READY_MESSAGE;
    this.successMessage = props.success || SUCCESS_MESSAGE;
    this.state = {
      delay: 500,
      overlay: this.readyMessage,
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if (this.enabled && data) {
      // Reset the scan overlay every RESET_TIMEOUT interval.
      this.enabled = false;
      this.setState({ overlay: this.readyMessage });
      if (data.text) {
        this.setState({
          overlay: this.successMessage,
        });
        if (typeof this.props.onData === 'function') {
          this.props.onData(data);
        }
      } else {
        console.log("Got something but I can't decode it.");
      }
      setTimeout(()=>{
        this.setState({ overlay: this.readyMessage });
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
      width: this.props.width || 320
    }
    const containerStyle = {
      display: 'inline-block',
      position: 'relative',
      margin: 0,
      padding: 0,
      textAlign: 'center',
      verticalAlign: 'middle',
      zIndex: 5
    }

    const overlayStyle = {
      position: "absolute",
      display: "inline-block",
      zIndex: 9,
      left: "0px",
      top: "0px",
      width: "100%",
      textAlign: "center",
      margin: 0,
      padding: 0,
      fontSize: '14px',
      fontFamily: 'Helvetica',
      color: '#AFA',
      backgroundColor: 'rgba(30, 30, 30, 0.3)'
    }

    return(
      <div style={containerStyle}>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p style={overlayStyle}>{this.state.overlay}</p>
      </div>
    )
  }
}

export default QRCodeReader;

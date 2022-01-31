import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

const READY_MESSAGE = 'Ready to scan...';
const RESET_TIMEOUT = 3000; // 3 seconds

class QRCodeReader extends Component {
  constructor(props){
    super(props)
    this.enabled = true;
    this.readyMessage = props.ready || READY_MESSAGE;
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
          overlay: '',
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
      width: this.props.width || 320,
      zIndex: 5
    }
    return(
      <div className='video-container'>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          >
        </QrReader>
        <p className='video-overlay'>{this.state.overlay}</p>
      </div>
    )
  }
}

export default QRCodeReader;

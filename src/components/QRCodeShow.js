import QRCode from 'react-qr-code';

// This version just provides a simple indirect reference to react-qr-code.
function QRCodeShow(props) {
  return (
    <QRCode value={props.value} title={props.value} size={props.size}
            fgColor="black" bgColor="#EEE"  />
  );
}

export default QRCodeShow;
import React, { useRef } from "react";
import QRCodeStyling from 'qr-code-styling';

// This version just provides a simple indirect reference to react-qr-code.
function QRCodeShow(props) {
  const ref = useRef(null);
  const size = props.size || 160;

  let options = {
    width: size,
    height: size,
    image: '' || props.img,
    dotsOptions: {
      color: props.color || "#4267b2",
      type: props.type || "square"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 4
    }
  };
  const qrCode = new QRCodeStyling(options);
  
  qrCode.append(ref.current);
  qrCode.update({ data: props.value });

  return (
    <div ref={ref} />
  );
}

export default QRCodeShow;
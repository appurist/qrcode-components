import React, { useRef, useEffect } from "react";
import QRCodeStyling from 'qr-code-styling';

// This version maps a QRCodeShow component to a qr-code-styling component.
function QRCodeShow(props) {
  const ref = useRef(null);

  useEffect(() => {
    const url = props.value || '';
    const size = props.size || 160;
    const type = props.type || "square";
    const img = props.img || '';
    const color = props.color || "#4267b2";
    let options = {
      width: size,
      height: size,
      image: img,
      dotsOptions: {color, type},
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 4
      }
    };

    const qrCode = new QRCodeStyling(options);
    qrCode.append(ref.current);
    qrCode.update({ data: url });
  }, [props.value, props.size, props.type, props.img, props.color]);

  return (
    <div ref={ref} />
  );
}

export default QRCodeShow;
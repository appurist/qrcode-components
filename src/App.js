import React, { useState } from 'react';

import QRCodeReader from './components/QRCodeReader';
import QRCodeShow from './components/QRCodeShow.js';

import './App.css';

function App() {
  const [url, setUrl] = useState("https://coindesk.com/test");

  function onData(data) {
    console.log("QR code read:", data);
    setUrl(data.text);
    console.log("QR code URL was:", data.text);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Code Test</h1>
      </header>
      <section>
        <QRCodeReader width={160} height={120} onData={onData}></QRCodeReader>
      </section>
      <section>
        <QRCodeShow value={url} size={128} />
      </section>
      <section>
        <p>{url}</p>
      </section>
    </div>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import SegmentButton from "./components/SegmentButton";
import { useState } from "react";
import Popup from "./components/Popup";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveButtonClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="text-center">
      <header className="bg-primary py-3 text-white">
        <h3>React Segment App</h3>
      </header>

      <div className="container mt-5">
        <h2>Press the button to open popup</h2>
        <SegmentButton onClick={handleSaveButtonClick} />
      </div>

      <Popup show={showPopup} onClose={handlePopupClose} />
    </div>
  );
}

export default App;

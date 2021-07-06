import { useRef, useEffect, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import "./styles.css";

export default function App() {
  const tiltBoxRef = useRef();
  const [details, setDetails] = useState(undefined);

  useEffect(() => {
    const tiltBox = tiltBoxRef.current;
    if (tiltBox) {
      VanillaTilt.init(tiltBox, {
        max: 75,
        speed: 400,
        perspective: 500,
        reset: true
      });
      tiltBox.addEventListener("tiltChange", function (event) {
        const { tiltX, tiltY, percentageX, percentageY, angle } = event.detail;
        setDetails({
          tiltX,
          tiltY,
          percentageX,
          percentageY,
          angle
        });
      });
    }
    return () => {
      if (tiltBox) {
        tiltBox.removeEventListner("tiltChange", function (event) {
          console.log(event.detail);
        });
        tiltBox.vanillaTilt.destroy();
      }
    };
  }, []);

  console.log(details);
  return (
    <div className="App">
      <div className="tiltBox" ref={tiltBoxRef}>
        {details ? (
          <div className="details">
            <span>{`tiltX: ${Number(details.tiltX).toFixed(2)}`}</span>
            <span>{`tiltY: ${Number(details.tiltY).toFixed(2)}`}</span>
            <span>{`percentageX: ${details.percentageX.toFixed(2)}`}</span>
            <span>{`percentageY: ${details.percentageY.toFixed(2)}`}</span>
            <span>{`angle: ${details.angle.toFixed(2)}`}</span>
          </div>
        ) : (
          <div className="pointer">
            <span className="pointHere">Point Here!</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

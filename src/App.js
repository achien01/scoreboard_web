import './App.css';
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

let padding = 5

function App() {
  const { height, width } = useWindowDimensions();
  let box = { width: (width - padding * 3) / 2, height: (height - padding * 3) / 2 }
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);
  return (
    <div style={{ width: width - padding * 2, height: height - padding * 2, padding: padding, background: 'gray', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: box.width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: width * 0.4, color: 'white' }}>{teamA}</p>
      </div>
      <div style={{ width: box.width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: width * 0.4, color: 'white' }}>{teamB}</p>
      </div>

      <div onClick={() => { setTeamA(teamA + 1) }} style={{ position: 'absolute', top: padding, left: padding, width: box.width, height: box.height, background: 'black', opacity: 0.1 }}>
      </div>
      <div onClick={() => { teamA > 0 && setTeamA(teamA - 1) }} style={{ position: 'absolute', bottom: padding, left: padding, width: box.width, height: box.height, background: 'black', opacity: 0.1 }}>
      </div>
      <div onClick={() => { setTeamB(teamB + 1) }} style={{ position: 'absolute', top: padding, right: padding, width: box.width, height: box.height, background: 'black', opacity: 0.1 }}>
      </div>
      <div onClick={() => { teamB > 0 && setTeamB(teamB - 1) }} style={{ position: 'absolute', bottom: padding, right: padding, width: box.width, height: box.height, background: 'black', opacity: 0.1 }}>
      </div>

    </div>
  );
}

export default App;
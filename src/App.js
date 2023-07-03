import React, { useState, useEffect } from 'react';
import './App.css';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
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
const App = () => {
    const { height } = useWindowDimensions();
    useEffect(() => {
        const handleResize = () => {
            // 重新調整畫面尺寸
            forceUpdate();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const forceUpdate = () => {
        // 強制更新組件
        setForceUpdate({});
    };
    const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);
    const addScore = (team, point) => {
        if (team === 'A') {
            setTeamAScore(teamAScore + point);
        } else if (team === 'B') {
            setTeamBScore(teamBScore + point);
        }
    };
    const isPortrait = window.innerHeight > window.innerWidth;
    const containerDisplay = isPortrait ? 'block' : 'flex'
    const boxSize = isPortrait ? { width: '100%', height: '50%' } : { width: '50%', height: '100%' };
    const boxDisplay = isPortrait ? 'flex' : 'block'
    const padSize = isPortrait ? { width: '50%', height: '100%' } : { width: '100%', height: '50%' };
    const containerStyle = {
        width: '100vw',
        height: '100vh',
        display: containerDisplay,
    };
    const boxStyle = {
        width: boxSize.width,
        height: boxSize.height,
        display: boxDisplay,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row-reverse',
    };
    const padStyle = {
        width: padSize.width,
        height: padSize.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    }
    const scoreContainerStyle = {
        position: 'absolute',
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        display: containerDisplay,
    }
    const scoreBoxAStyle = {
        width: boxSize.width,
        height: boxSize.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222831'
    };
    const scoreBoxBStyle = {
        width: boxSize.width,
        height: boxSize.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#30475E'
    };
    const scoreSize = isPortrait ? height * 0.5 / 2 : height * 0.5
    const scoreStyle = {
        fontSize: scoreSize, color: 'white',
    }
    const [_, setForceUpdate] = React.useState({});
    return (
        <div style={containerStyle}>
            <div style={scoreContainerStyle}>
                <div style={scoreBoxAStyle}>
                    <span style={scoreStyle}>{teamAScore}</span>
                </div>
                <div style={scoreBoxBStyle}>
                    <span style={scoreStyle}>{teamBScore}</span>
                </div>
            </div>
            <div style={boxStyle}>
                <div onClick={() => { addScore('A', +1) }} style={padStyle}>
                    {/* <span style={textStyle}>A+</span> */}
                </div>
                <div onClick={() => { addScore('A', -1) }} style={padStyle}>
                    {/* <span style={textStyle}>A-</span> */}
                </div>
            </div>
            <div style={boxStyle}>
                <div onClick={() => { addScore('B', +1) }} style={padStyle}>
                    {/* <span style={textStyle}>B+</span> */}
                </div>
                <div onClick={() => { addScore('B', -1) }} style={padStyle}>
                    {/* <span style={textStyle}>B-</span> */}
                </div>
            </div>
        </div>
    );
};

export default App;

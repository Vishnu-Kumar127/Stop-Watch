import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";


function Stopwatch() {

    const[isrunning,setisrunning] = useState(false);
    const[elapsedTime,setelapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const StartTimeRef = useRef(0);
    useEffect(()=>{
        if (isrunning) {
            intervalIdRef.current = setInterval(()=>{
                setelapsedTime(Date.now()-StartTimeRef.current);
            },10)
        }
        return()=>{
            clearInterval(intervalIdRef.current);
        }
    },[isrunning])

    function Start() {
       setisrunning(true);
       StartTimeRef.current  = Date.now() - elapsedTime;
        console.log(StartTimeRef.current);
    }
    function Stop() {
        setisrunning(false);
    }
    function Reset() {
        setelapsedTime(0);
        setisrunning(false);
    }
    function FormatTime() {
        let hours = Math.floor(elapsedTime /(1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime /(1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) %60);
        let milliseconds = Math.floor(elapsedTime %1000 /10);
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
    }
    function padZero(number) {
        return (number<10?"0":"") + number;
    }
    return(
        <>
            <h1>Stop Watch</h1>
            <div className="stop-watch">
                <div className="display">
                    {FormatTime()}
                </div>
                <div className="controls">
                    <button className="Start-button" onClick={Start}>Start</button>
                    <button className="Stop-button" onClick={Stop}>Stop</button>
                    <button className="Reset-button" onClick={Reset}>Reset</button>
                </div>
            </div>
        </>
    );
}
export default Stopwatch
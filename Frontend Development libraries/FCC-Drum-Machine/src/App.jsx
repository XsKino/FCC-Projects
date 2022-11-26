import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const drumset1 = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
    {
      keyCode: 16,
      keyTrigger: "SHIFT",
      id: "Rest",
    },
  ];

  const drumset2 = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
    {
      keyCode: 16,
      keyTrigger: "SHIFT",
      id: "Rest",
    },
  ];

  const [trackA, setTrackA] = useState({
    id: "A",
    volume: 0.75,
    recording: [],
  });
  const [trackB, setTrackB] = useState({
    id: "B",
    volume: 0.75,
    recording: [],
  });
  const [trackC, setTrackC] = useState({
    id: "C",
    volume: 0.75,
    recording: [],
  });
  const [trackD, setTrackD] = useState({
    id: "D",
    volume: 0.75,
    recording: [],
  });

  const [activeDrumset, setActiveDrumset] = useState([drumset1, "drumset1"]);
  const [transition, setTransition] = useState(false);
  const [activeTrack, setActiveTrack] = useState(trackA);
  const [bpm, setBpm] = useState(120);
  const [display, setDisplay] = useState("");
  const [displayActive, setDisplayActive] = useState(false);
  const [displayRotation, setDisplayRotation] = useState("0deg");

  const [recording, setRecording] = useState(false);
  const [playingRecords, setPlayingRecords] = useState(false);
  const [loop, setLoop] = useState(false);

  const updateDrumset = () => {
    if (activeDrumset[1] === "drumset1")
      setActiveDrumset([drumset2, "drumset2"]);
    if (activeDrumset[1] === "drumset2")
      setActiveDrumset([drumset1, "drumset1"]);
  };

  const updateTrack = () => {
    if (activeTrack.id === "A") setTrackA(activeTrack);
    if (activeTrack.id === "B") setTrackB(activeTrack);
    if (activeTrack.id === "C") setTrackC(activeTrack);
    if (activeTrack.id === "D") setTrackD(activeTrack);
  };

  const fetchTrack = () => {
    if (activeTrack.id === "A") setActiveTrack(trackA);
    if (activeTrack.id === "B") setActiveTrack(trackB);
    if (activeTrack.id === "C") setActiveTrack(trackC);
    if (activeTrack.id === "D") setActiveTrack(trackD);
  };

  const clearTrack = () => {
    if (recording) alert("You can´t clear a track while recording");
    if (activeTrack.id === "A") setTrackA({ ...trackA, recording: [] });
    if (activeTrack.id === "B") setTrackB({ ...trackB, recording: [] });
    if (activeTrack.id === "C") setTrackC({ ...trackC, recording: [] });
    if (activeTrack.id === "D") setTrackD({ ...trackD, recording: [] });
  };

  const updateDisplay = (keyTrigger) => {
    let clip = {};
    if (activeDrumset[1] === "drumset1") {
      clip = drumset1.filter((x) => x.keyTrigger === keyTrigger)[0];
    }
    if (activeDrumset[1] === "drumset2") {
      clip = drumset2.filter((x) => x.keyTrigger === keyTrigger)[0];
    }

    setDisplay(clip.id);
  };

  const toggleRecording = () => {
    if (recording) setRecording(false);
    else {
      setRecording(true);
      if (playingRecords) togglePlaying();
    }
  };

  const togglePlaying = () =>
    playingRecords ? setPlayingRecords(false) : setPlayingRecords(true);
  const toggleLoop = () => {
    if (loop) setLoop(false);
    else {
      setLoop(true);
      alert(
        "CAUTION: The loop function was not polished and the only way to stop the loop once it is played is refreshing the page (it will reset the recordings)"
      );
    }
  };

  useEffect(() => {
    if (playingRecords) {
      if (recording) toggleRecording();
      [trackA, trackB, trackC, trackD].map((track) => {
        if (track.recording.length) {
          let i = 0;
          const interval = setInterval(() => {
            const playing = playingRecords;
            return (function () {
              const currentElement = document.getElementById(
                `${track.id + i}-note`
              );
              if (playing && track.recording[i].keyTrigger !== "SHIFT") {
                const audiotag = document.getElementById(
                  `${track.id + i}-audio-clip`
                );
                audiotag.volume = track.volume;
                audiotag.currentTime = 0;
                audiotag.play();
                currentElement.classList.remove("transition");
                currentElement.classList.add("track-note-active");
                setTimeout(() => {
                  currentElement.classList.add("transition");
                }, 100);
                setTimeout(() => {
                  currentElement.classList.remove("track-note-active");
                }, 200);
              } else {
                currentElement.classList.remove("transition");
                currentElement.classList.add("track-rest-active");
                setTimeout(() => {
                  currentElement.classList.add("transition");
                }, 100);
                setTimeout(() => {
                  currentElement.classList.remove("track-rest-active");
                }, 200);
              }
              i === track.recording.length - 1 ? (i = 0) : i++;
            })();
          }, 60000 / bpm / 4);
          setInterval(() => {
            if (!loop) clearInterval(interval);
          }, (60000 / bpm / 4) * track.recording.length);
        }
      });
    }
  }, [playingRecords]);

  return (
    <div className="App" id="drum-machine">
      <div className="main">
        <header className="main-header">
          Drum <i class="fa-solid fa-drum"></i> Machine
        </header>
        <div className="drumpad-container">
          <div className="drumpad-grid">
            {activeDrumset[0].map((clip) => (
              <DrumPad
                keyTrigger={clip.keyTrigger}
                keyCode={clip.keyCode}
                id={clip.id}
                url={clip.url || ""}
                volume={Math.floor(activeTrack.volume * 100) / 100}
                updateDisplay={updateDisplay}
                setDisplayActive={setDisplayActive}
                transition={transition}
                setTransition={setTransition}
                setDisplayRotation={setDisplayRotation}
                activeDrumset={activeDrumset}
                recording={recording}
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                updateTrack={updateTrack}
                fetchTrack={fetchTrack}
              />
            ))}
          </div>
        </div>
        <button className="drumset-selector" onClick={updateDrumset}>
          <div
            className={`drumset1-display ${
              activeDrumset[1] === "drumset1" && "active-drumset"
            }`}
          >
            <i class="fa-solid fa-music"></i>Drum Set 1
          </div>
          <div
            className={`drumset2-display ${
              activeDrumset[1] === "drumset2" && "active-drumset"
            }`}
          >
            <i class="fa-solid fa-music"></i>Drum Set 2
          </div>
        </button>
        <div
          className={`display ${displayActive && "display-active"} ${
            transition && "transition"
          }`}
          id="display"
        >
          <p style={{ transform: `rotate(${displayRotation}deg)` }}>
            {display}
          </p>
        </div>
      </div>
      <div className="control-panel">
        <div className="control-panel-top">
          <header className="control-panel-header">
            <div className="volume-icon">
              {activeTrack.volume == 0 && (
                <i class="fa-solid fa-volume-xmark"></i>
              )}
              {activeTrack.volume < 0.5 && activeTrack.volume > 0 && (
                <i class="fa-solid fa-volume-low"></i>
              )}
              {activeTrack.volume >= 0.5 && (
                <i class="fa-solid fa-volume-high"></i>
              )}
            </div>
            <div className="slider">
              <input
                className="slider-input"
                type="range"
                name="volume"
                id="volume"
                value={activeTrack.volume}
                min={0}
                max={1}
                step={0.01}
                onChange={(e) => {
                  setActiveTrack({ ...activeTrack, volume: e.target.value });
                  switch (activeTrack.id) {
                    case "A":
                      setTrackA(activeTrack);
                      break;
                    case "B":
                      setTrackB(activeTrack);
                      break;
                    case "C":
                      setTrackC(activeTrack);
                      break;
                    case "D":
                      setTrackD(activeTrack);
                      break;
                  }
                }}
              />
              <div
                style={{ width: `${activeTrack.volume * 100}%` }}
                className="slider-progress-bar"
                id="volume-progress-bar"
              ></div>
            </div>
            <button
              onClick={toggleLoop}
              className={`loop-button ${loop && "loop-active"}`}
            >
              <i class="fa-solid fa-repeat"></i>
            </button>
            <button onClick={clearTrack} className="clear-track-button">
              <i class="fa-solid fa-trash"></i>
            </button>
          </header>
          <div className="track-bar">
            <button
              onClick={() => {
                setActiveTrack(trackA);
              }}
              id="track-a-button"
              className={`track-button ${
                activeTrack.id === "A" && "track-button-active"
              }`}
            >
              Track A
            </button>
            <button
              onClick={() => {
                setActiveTrack(trackB);
              }}
              id="track-b-button"
              className={`track-button ${
                activeTrack.id === "B" && "track-button-active"
              }`}
            >
              Track B
            </button>
            <button
              onClick={() => {
                setActiveTrack(trackC);
              }}
              id="track-c-button"
              className={`track-button ${
                activeTrack.id === "C" && "track-button-active"
              }`}
            >
              Track C
            </button>
            <button
              onClick={() => {
                setActiveTrack(trackD);
              }}
              id="track-d-button"
              className={`track-button ${
                activeTrack.id === "D" && "track-button-active"
              }`}
            >
              Track D
            </button>
          </div>
        </div>
        <div className="tracks-display">
          <Track id="track-a" className="track" track={trackA} />
          <Track id="track-b" className="track" track={trackB} />
          <Track id="track-c" className="track" track={trackC} />
          <Track id="track-d" className="track" track={trackD} />
        </div>
        <footer className="control-panel-footer">
          <button className="record-button" onClick={toggleRecording}>
            <i class={`record-icon ${recording && "record-icon-active"}`}></i>
          </button>
          <button onClick={togglePlaying} className="playpause-button">
            {playingRecords ? (
              <i class="fa-solid fa-pause"></i>
            ) : (
              <i class="fa-solid fa-play"></i>
            )}
          </button>
          <div className="slider">
            <input
              className="slider-input"
              type="range"
              name="bpm"
              id="bpm"
              min={30}
              max={300}
              step={1}
              value={bpm}
              onChange={(e) => {
                setBpm(e.target.value);
              }}
            />
            <div
              style={{ width: `${((bpm - 30) / 270) * 100}%` }}
              className="slider-progress-bar"
              id="bpm-progress-bar"
            ></div>
          </div>
          <div className="bpm-display">
            {bpm} <span class="bpm-letters">BPM</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DrumPad({
  keyTrigger,
  keyCode,
  id,
  url = "",
  volume = 0,
  updateDisplay,
  setDisplayActive,
  setDisplayRotation,
  activeDrumset,
  recording,
  activeTrack,
  setActiveTrack,
  updateTrack,
  fetchTrack,
}) {
  const [transition, setTransition] = useState(false);
  const [padActive, setPadActive] = useState(false);
  const [elemHeight, setElemHeight] = useState(0);
  const [elemWidth, setElemWidth] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    setElemHeight(document.getElementById(`${keyTrigger}-pad`).offsetHeight);
    setElemWidth(document.getElementById(`${keyTrigger}-pad`).offsetWidth);
    if (recording) updateTrack();
    else fetchTrack();

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    volume,
    id,
    activeDrumset,
    recording,
    setActiveTrack,
    fetchTrack,
    activeTrack,
    useWindowSize(),
  ]);

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) playSound();
  };

  const playSound = () => {
    if (recording) {
      setActiveTrack({
        ...activeTrack,
        recording: [
          ...activeTrack.recording,
          {
            keyCode: keyCode,
            keyTrigger: keyTrigger,
            id: id,
            url: url,
            drumsetId: activeDrumset[1],
          },
        ],
      });
    }

    setDisplayRotation(Math.floor(Math.random() * 20) - 10);
    updateDisplay(keyTrigger);

    setTransition(false);
    setPadActive(true);
    setDisplayActive(true);
    setTimeout(() => setTransition(true), 100);
    setTimeout(() => setPadActive(false), 200);
    setTimeout(() => setDisplayActive(false), 200);
    if (url) {
      const audioTag = document.getElementById(keyTrigger);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
    }
  };

  return (
    <button
      onClick={playSound}
      id={`${keyTrigger}-pad`}
      className={`${(keyTrigger !== "SHIFT" && "drum-pad") || "rest-pad"} ${
        padActive && "pad-active"
      } ${transition && "transition"}`}
      style={(()=>{
          if(keyTrigger !== "SHIFT") {
            if(window.innerWidth>920) return ({ 'width': elemHeight, 'borderRadius': "50%" })
            else return ({ 'height': elemWidth, 'borderRadius': "50%" })
          } else {
            if(window.innerWidth>900) return ({ borderRadius: "1rem", margin: "0 15%" })
            else return ({ 'height': "8rem", 'borderRadius': "1rem%" })
          }
        })()
      }
    >
      <audio className="clip" id={keyTrigger} src={url} />
      {keyTrigger === "SHIFT" && <i class="fa-solid fa-arrow-up"></i>}{" "}
      {keyTrigger}
    </button>
  );
}

function Track({ id, className, track }) {
  useEffect(() => {}, [track]);

  return (
    <div className="track-container">
      <div id={id} className={className}>
        {track.recording.map((clip, i) => {
          if (clip.keyTrigger !== "SHIFT")
            return (
              <div id={track.id + i + "-note"} className="track-note">
                <p className="note-keytrigger">{clip.keyTrigger}</p>
                <p className="note-drumset">
                  {clip.drumsetId === "drumset1"
                    ? "1"
                    : clip.drumsetId === "drumset2"
                    ? "2"
                    : ""}
                </p>
                <audio id={track.id + i + "-audio-clip"} src={clip.url}></audio>
              </div>
            );
          else
            return (
              <div id={track.id + i + "-note"} className="track-rest">
                𝄽
              </div>
            );
        })}
      </div>
    </div>
  );
}

// useWindowSize Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

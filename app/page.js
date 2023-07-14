"use client";

import HUD from "@/components/HUD";
import css from "./page.module.scss";
import Maze from "@/components/Maze";
import ModalOverlay from "@/components/ModalOverlay";
// import HelpModal from "@/components/HelpModal";
import ResultModal from "@/components/ResultModal";
import { useState, useEffect, useReducer } from "react";
import { generateMaze } from "@/utils/generateMaze";
import Player from "@/components/Player";
import Item from "@/components/Item";
import { randomNumber } from "@/utils/shared";
import { generateItems } from "@/utils/generateItems";
import { SFX } from "@/utils/sfx";

const SCORES = {
  potion: 50,
  coin: 20,
  heart: 10,
};

export default function Page() {
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [maze, setMaze] = useState([[]]);
  const [playerPosition, setPlayerPosition] = useState([1, 0]);
  const [playerFace, setPlayerFace] = useState("right");
  const [items, setItems] = useState([]);
  const [exitPoint, setExitPoint] = useState([0, 0]);
  const [score, setScore] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [lang, setLang] = useState("en");
  const [mazeDifficulty, setMazeDifficulty] = useState(0);

  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  function handeNewGame() {
    SFX.newGame.play();
    // setScore(0);
    setShowResult(false);
    setCanPlay(true);

    let mazeWidth = randomNumber(4 + mazeDifficulty, 6 + mazeDifficulty);
    let mazeHeight = randomNumber(4 + mazeDifficulty, 6 + mazeDifficulty);

    let newMaze = generateMaze(mazeWidth, mazeHeight);
    let newItems = generateItems(mazeWidth, mazeHeight, newMaze);

    setMaze(newMaze);
    setItems(newItems);
    setExitPoint([newMaze[mazeHeight - 1].indexOf("p"), mazeHeight - 1]);
    setPlayerPosition([newMaze[0].indexOf("p"), 0]);
  }

  function handleModalNewGame() {
    handeNewGame();
    setShowResult(false);
  }

  function toggleSong() {
    SFX.theme.playing() ? SFX.theme.pause() : SFX.theme.play();
    forceUpdate();
  }

  function toggleLang() {
    lang === "en" ? setLang("fa") : setLang("en");
  }

  function handleItemTouch(x, y) {
    let touchedItem = items.find((item) => item.x == x && item.y == y);
    if (touchedItem) {
      setScore((score) => score + SCORES[touchedItem.name]);
      SFX[touchedItem.name].play();
      let removedItems = items.filter((item) => item != touchedItem);
      setItems(removedItems);
    }
  }

  function handleWin(x, y) {
    if (x == exitPoint[0] && y == exitPoint[1]) {
      setShowResult(true);
      setCanPlay(false);
      setMazeDifficulty((mazeDifficulty) => mazeDifficulty + 1);
    }
  }

  useEffect(() => {
    const [x, y] = playerPosition;
    handleItemTouch(x, y);
    handleWin(x, y);
  }, [playerPosition]);

  function handleMove(e) {
    e.preventDefault();
    if (canPlay) {
      const [x, y] = playerPosition;
      SFX.click.play();

      if ((e.code === "ArrowUp" || e.code === "KeyW") && maze[y - 1][x] === "p") {
        setPlayerPosition([x, y - 1]);
      }
      if ((e.code === "ArrowDown" || e.code === "KeyS") && maze[y + 1][x] === "p") {
        setPlayerPosition([x, y + 1]);
      }
      if ((e.code === "ArrowRight" || e.code === "KeyD") && maze[y][x + 1] === "p") {
        setPlayerPosition([x + 1, y]);
        setPlayerFace("right");
      }
      if ((e.code === "ArrowLeft" || e.code === "KeyA") && maze[y][x - 1] === "p") {
        setPlayerPosition([x - 1, y]);
        setPlayerFace("left");
      }
    }
  }

  // load game on first render
  useEffect(() => {
    handeNewGame();
  }, []);

  return (
    <div className={css.app}>
      <HUD
        openHelp={() => setShowHelp(true)}
        newGame={handeNewGame}
        score={score}
        toggleSong={toggleSong}
        songIsPlaying={SFX.theme.playing()}
        lang={lang}
        toggleLang={toggleLang}
      />
      <Maze handleMove={handleMove} maze={maze}>
        <Player position={playerPosition} face={playerFace} />
        {items?.map((item) => {
          return <Item x={item.x} y={item.y} name={item.name} key={item.x + "," + item.y} />;
        })}
      </Maze>
      {(showHelp || showResult) && (
        <ModalOverlay
          closeModals={() => {
            setShowHelp(false);
            setShowResult(false);
          }}
        >
          {/* {showHelp && <HelpModal />} */}
          {showResult && <ResultModal button={handleModalNewGame} score={score} lang={lang} />}
        </ModalOverlay>
      )}
    </div>
  );
}

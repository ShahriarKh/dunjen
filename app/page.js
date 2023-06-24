"use client";

import HUD from "@/components/HUD";
import css from "./page.module.scss";
import Maze from "@/components/Maze";
import ModalOverlay from "@/components/ModalOverlay";
import HelpModal from "@/components/HelpModal";
import ResultModal from "@/components/ResultModal";
import { useState, useEffect } from "react";
import { generateMaze } from "@/utils/generateMaze";
import Player from "@/components/Player";
import Item from "@/components/Item";
import { randomNumber } from "@/utils/shared";
import { generateItems } from "@/utils/generateItems";
import { clickSound, coinSound, newGameSound, themeSong, potion2Sound, potionSound } from "@/utils/sfx";

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
  const [playSong, setPlaySong] = useState(false);

  // themeSong.loop = true;
  themeSong.volume = 0.1;

  const SCORES = {
    potion: 50,
    coin: 20,
    heart: 10,
  };

  const SOUNDS = {
    coin: coinSound,
    potion: potionSound,
    heart: potion2Sound,
  };

  function handeNewGame() {
    newGameSound.play();
    setScore(0);
    setShowResult(false);
    setCanPlay(true);

    let MAZE_WIDTH = randomNumber(4, 6);
    let MAZE_HEIGHT = randomNumber(4, 6);

    let newMaze = generateMaze(MAZE_WIDTH, MAZE_HEIGHT);
    let newItems = generateItems(MAZE_WIDTH, MAZE_HEIGHT, newMaze);

    setMaze(newMaze);
    setItems(newItems);
    setExitPoint([newMaze[MAZE_HEIGHT - 1].indexOf("p"), MAZE_HEIGHT - 1]);
    setPlayerPosition([newMaze[0].indexOf("p"), 0]);
  }

  function handleModalNewGame() {
    handeNewGame();
    setShowResult(false);
  }

  function toggleSong() {
    setPlaySong(!playSong);
  }

  useEffect(() => {
    if (!playSong) {
      themeSong.pause();
      return;
    }
    themeSong.play();
  }, [playSong]);

  useEffect(() => {
    const [x, y] = playerPosition;
    // touching items
    let touchedItem = items.find((item) => item.x == x && item.y == y);
    if (touchedItem) {
      setScore((score) => score + SCORES[touchedItem.name]);
      SOUNDS[touchedItem.name].play();
      let removedItems = items.filter((item) => item != touchedItem);
      setItems(removedItems);
    }
    // winning
    if (x == exitPoint[0] && y == exitPoint[1]) {
      setShowResult(true);
      setCanPlay(false);
    }
  }, [playerPosition]);

  // load game
  useEffect(() => {
    handeNewGame();
  }, []);

  function handleMove(e) {
    e.preventDefault();
    if (canPlay) {
      const [x, y] = playerPosition;
      clickSound.volume = 0.1;
      clickSound.play();

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

  return (
    <div className={css.app}>
      <HUD openHelp={() => setShowHelp(true)} newGame={handeNewGame} score={score} toggleSong={toggleSong} />
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
          {showHelp && <HelpModal />}
          {showResult && <ResultModal button={handleModalNewGame} score={score} />}
        </ModalOverlay>
      )}
    </div>
  );
}

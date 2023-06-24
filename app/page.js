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

export default function Page() {
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [maze, setMaze] = useState([[]]);
  const [playerPosition, setPlayerPosition] = useState([1, 0]);
  const [playerFace, setPlayerFace] = useState("right");
  const [items, setItems] = useState([]);
  const [exitPoint, setExitPoint] = useState([0, 0]);
  const [score, setScore] = useState(0);

  const SCORES = {
    potion: 50,
    coin: 20,
    heart: 10,
  };

  function handeNewGame() {
    setScore(0);

    let MAZE_WIDTH = randomNumber(3, 40);
    let MAZE_HEIGHT = randomNumber(3, 40);

    let newMaze = generateMaze(MAZE_WIDTH, MAZE_HEIGHT);
    let newItems = generateItems(MAZE_WIDTH, MAZE_HEIGHT, newMaze);

    setMaze(newMaze);
    setItems(newItems);
    setExitPoint([MAZE_HEIGHT - 1, newMaze[MAZE_HEIGHT - 1].indexOf("p")]);
    setPlayerPosition([newMaze[0].indexOf("p"), 0]);
  }

  useEffect(() => {
    const [x, y] = playerPosition;
    let touchedItem = items.find((item) => item.x == x && item.y == y);
    if (touchedItem) {
      setScore((score) => score + SCORES[touchedItem.name]);
    }
  }, [playerPosition]);

  // generate a maze on page load
  useEffect(() => {
    handeNewGame();
  }, []);

  function handleMove(e) {
    e.preventDefault();

    const [x, y] = playerPosition;

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

  return (
    <div className={css.app}>
      <HUD openHelp={() => setShowHelp(true)} newGame={handeNewGame} score={score} />
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
          {showResult && <ResultModal />}
        </ModalOverlay>
      )}
    </div>
  );
}

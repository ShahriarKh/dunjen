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

export default function Page() {
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [maze, setMaze] = useState([[]]);
  const [playerPosition, setPlayerPosition] = useState([1, 0]);
  const [playerFace, setPlayerFace] = useState("right");
  const [items, setItems] = useState();

  function handeNewGame() {
    let newMaze = generateMaze(27, 30);
    setMaze(newMaze);
    setPlayerPosition([newMaze[0].indexOf("p"), 0]);
    generateItems();
  }

  function placeItem() {
    const x = Math.floor(Math.random() * maze[0].length) + 1;
    const y = Math.floor(Math.random() * maze.length) + 1;
    console.log(x, y);
  }

  function generateItems() {
    const items = { potion: 1, coin: 5, heart: 2 };
    Object.entries(items).map((item) => {
      placeItem();
    });
  }

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
      <HUD openHelp={(showHelp) => setShowHelp(true)} newGame={handeNewGame} />
      <Maze handleMove={handleMove} maze={maze}>
        <Player position={playerPosition} face={playerFace} />
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

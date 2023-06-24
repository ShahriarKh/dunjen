"use client";

import HUD from "@/components/HUD";
import css from "./page.module.scss";
import Maze from "@/components/Maze";
import ModalOverlay from "@/components/ModalOverlay";
import HelpModal from "@/components/HelpModal";
import ResultModal from "@/components/ResultModal";
import { useState, useEffect, createElement } from "react";
import { generateMaze } from "@/utils/generateMaze";
import Player from "@/components/Player";
import Item from "@/components/Item";

export default function Page() {
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [maze, setMaze, getMaze] = useState([[]]);
  const [playerPosition, setPlayerPosition] = useState([1, 0]);
  const [playerFace, setPlayerFace] = useState("right");
  const [items, setItems] = useState([]);

  function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  async function handeNewGame() {
    let MAZE_WIDTH = randomNumber(3, 40);
    let MAZE_HEIGHT = randomNumber(3, 40);

    let newMaze = generateMaze(MAZE_WIDTH, MAZE_HEIGHT);
    let newItems = generateItems(MAZE_WIDTH, MAZE_HEIGHT, newMaze);

    setMaze(newMaze);
    setItems(newItems);
    setPlayerPosition([newMaze[0].indexOf("p"), 0]);
  }

  function generateItems(MAZE_WIDTH, MAZE_HEIGHT, newMaze) {
    let generatedItems = [];
    const randomItems = {
      potion: randomNumber(0, 2),
      coin: randomNumber(2, 6),
      heart: randomNumber(0, 2),
    };
    Object.entries(randomItems).map((item) => {
      for (let i = 0; i < item[1]; i++) {
        let x = 0;
        let y = 0;
        while (newMaze[y][x] == "w" || generatedItems.some((item) => (item.x == x) & (item.y == y))) {
          x = randomNumber(1, MAZE_WIDTH - 1);
          y = randomNumber(1, MAZE_HEIGHT - 1);
        }
        generatedItems.push({ x: x, y: y, name: item[0] });
      }
    });
    console.log(generatedItems);
    return generatedItems;
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
      <HUD openHelp={() => setShowHelp(true)} newGame={handeNewGame} />
      <Maze handleMove={handleMove} maze={maze}>
        <Player position={playerPosition} face={playerFace} />
        {items?.map((item) => {
          return <Item x={item.x} y={item.y} name={item.name} />;
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

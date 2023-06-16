"use client";

import { BaseTexture, Application, Loader, Assets, Spritesheet } from "pixi.js";
import { Stage, Container, Sprite, useTick, AnimatedSprite } from "@pixi/react";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import spd from "../public/spritesheets/all.json";

BaseTexture.defaultOptions.scaleMode = "nearest";

const Slime = () => {
  const [frames, setFrames] = useState();

  useEffect(() => {
    async function yes() {
      // console.log(spd);
      const sheet = await Assets.load(spd);
      console.log(sheet.animations);
      // console.log("sheer", sheet);
      setFrames(sheet);
    }

    if (!frames) {
      yes();
    }
  }, []);

  return <></>;
};

export default function Home() {
  return (
    <Stage options={{ backgroundAlpha: 0.5 }}>
      <Slime />
    </Stage>
  );
}

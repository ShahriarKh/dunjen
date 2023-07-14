"use client";
import { Howl } from "howler";

const coinSound = new Howl({ src: ["../sfx/coin.wav"] });
const themeSong = new Howl({ src: ["../sfx/song2.mp3"], loop: true, volume: 0.1 });
const clickSound = new Howl({ src: ["../sfx/clicking.mp3"], volume: 0.1 });
const newGameSound = new Howl({ src: ["../sfx/newgame.mp3"] });
const potionSound = new Howl({ src: ["../sfx/potion.mp3"] });
const potion2Sound = new Howl({ src: ["../sfx/potion2.mp3"] });
const winSong = new Howl({ src: ["../sfx/win.mp3"] });

export const SFX = {
  coin: coinSound,
  potion: potionSound,
  heart: potion2Sound,
  win: winSong,
  theme: themeSong,
  click: clickSound,
  newGame: newGameSound,
};

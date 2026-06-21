import type { AnimationSprite, GameLibrary } from "../types";

type LatestSpriteResponse = {
  sprite?: AnimationSprite | null;
};

const EMPTY_LIBRARY: GameLibrary = {
  assets: [],
  scenes: [],
};

export async function fetchLatestSprite(): Promise<AnimationSprite | null> {
  const response = await fetch("/api/spritesheet/latest");
  const data = await response.json().catch(() => ({ sprite: null })) as LatestSpriteResponse;
  return data.sprite && Array.isArray(data.sprite.frames) ? data.sprite : null;
}

export async function fetchGameLibrary(): Promise<GameLibrary> {
  const response = await fetch("/api/game-library");
  const data = await response.json().catch(() => EMPTY_LIBRARY) as GameLibrary;
  return {
    ...data,
    assets: Array.isArray(data.assets) ? data.assets : [],
    scenes: Array.isArray(data.scenes) ? data.scenes : [],
  };
}

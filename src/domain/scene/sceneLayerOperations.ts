import type { SceneLayer } from "../../types";
import { cloneSceneLayer } from "./sceneHistory";

export type SceneLayerCopyLabel = "copy" | "paste";
export type SceneObjectTarget = "layer" | "interaction-zone";

export function createSceneLayerInstance(
  sourceLayer: SceneLayer,
  label: SceneLayerCopyLabel,
  offsetIndex: number,
  zIndex: number
): SceneLayer {
  const layer = cloneSceneLayer(sourceLayer);
  return {
    ...layer,
    id: `layer_${label}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: `${layer.name} ${label}`,
    visible: true,
    locked: false,
    x: Number((layer.x + offsetIndex * 36).toFixed(2)),
    y: Number((layer.y + offsetIndex * 24).toFixed(2)),
    zIndex,
  };
}

export function replaceBackgroundLayerSettings(targetBackground: SceneLayer, sourceBackground: SceneLayer): SceneLayer {
  return {
    ...sourceBackground,
    id: targetBackground.id,
    name: targetBackground.name,
    type: "background",
    locked: targetBackground.locked,
    visible: true,
    zIndex: targetBackground.zIndex,
  };
}

export function clearBackgroundLayerImage(layer: SceneLayer): SceneLayer {
  return {
    ...layer,
    name: "Black Background",
    visible: true,
    imageUrl: undefined,
    color: "#000000",
    opacity: 1,
    fit: "stretch",
    position: "center center",
  };
}

export function disableLayerInteraction(layer: SceneLayer): SceneLayer {
  return {
    ...layer,
    interaction: layer.interaction ? { ...layer.interaction, enabled: false } : layer.interaction,
  };
}

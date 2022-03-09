import { saveDataManager } from "../features/saveDataManager/exports";
import { setAddPlayer, setHasPlayer } from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerInitLateFire,
  postPlayerInitLateHasSubscriptions,
} from "./subscriptions/postPlayerInitLate";

const v = {
  run: {
    playersFiredSet: new Set<PlayerIndex>(),
  },
};

/** @internal */
export function postPlayerInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postPlayerInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31
}

function hasSubscriptions() {
  return postPlayerInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
function postPlayerUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (!setHasPlayer(v.run.playersFiredSet, player)) {
    setAddPlayer(v.run.playersFiredSet, player);
    postPlayerInitLateFire(player);
  }
}

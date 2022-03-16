import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { doorSlotToDirection } from "../functions/doors";
import { getClosestPlayer } from "../functions/player";
import { ensureAllCases } from "../functions/utils";
import { directionToVector } from "../functions/vector";
import {
  postCustomDoorEnterFire,
  postCustomDoorEnterHasSubscriptions,
} from "./subscriptions/postCustomDoorEnter";

interface CustomDoorData {
  slot: DoorSlot;
  state: DoorState;
}

const POSITION_OFFSET_MULTIPLIER = -23;

const initializedEffectVariants = new Set<int>();

const v = {
  room: {
    customDoors: new Map<PtrHash, CustomDoorData>(),
  },
};

/** @internal */
export function postCustomDoorEnterCallbackInit(): void {
  saveDataManager("postCustomDoorEnter", v, hasSubscriptions);
}

function hasSubscriptions() {
  return postCustomDoorEnterHasSubscriptions();
}

/**
 * `isaacscript-common` provides custom doors that can be spawned where any wall segment is. If you
 * use this feature, you must first call this initialization function at the beginning of your mod.
 *
 * Each kind of custom door that you create must have an entry in the "content/entities2.xml" file,
 * like so:
 *
 * ```xml
 * <entity id="1000" name="Foo Custom Door" anm2path="grid/door_foo.anm2" />
 * ```
 *
 * (Custom door entities must have an id of "1000", which corresponds to an effect. If you do not
 * specify the variant, then the game will automatically assign it.)
 *
 * Next, pass the variant into this function:
 *
 * ```ts
 * const modVanilla = RegisterMod("My Mod", 1);
 * const mod = upgradeMod(modVanilla);
 * const fooEffectVariant = Isaac.GetEntityVariantByName("Foo Custom Door");
 * initCustomDoor(mod, fooEffectVariant);
 * ```
 */
export function initCustomDoor(mod: Mod, effectVariant: int): void {
  initializedEffectVariants.add(effectVariant);

  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_UPDATE,
    postEffectUpdaterCustomEntity,
    effectVariant,
  ); // 55
  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_RENDER,
    postEffectRenderCustomEntity,
    effectVariant,
  ); // 56
}

// ModCallbacks.MC_POST_EFFECT_UPDATE (55)
function postEffectUpdaterCustomEntity(effect: EntityEffect) {
  const ptrHash = GetPtrHash(effect);
  const doorData = v.room.customDoors.get(ptrHash);
  if (doorData === undefined) {
    return;
  }

  if (doorData.state === effect.State) {
    return;
  }
  doorData.state = effect.State;

  doorChangedState(effect);
}

function doorChangedState(effect: EntityEffect) {
  const room = game.GetRoom();

  const sprite = effect.GetSprite();
  const animation = getAnimation(effect);
  sprite.Play(animation, true);

  if (effect.State === DoorState.STATE_OPEN) {
    const gridIndex = room.GetGridIndex(effect.Position);
    const wall = room.GetGridEntity(gridIndex);
    if (wall !== undefined) {
      wall.CollisionClass = GridCollisionClass.COLLISION_WALL_EXCEPT_PLAYER;
    }
  } else if (effect.State === DoorState.STATE_CLOSED) {
    // TODO
  }
}

function getAnimation(effect: EntityEffect): string {
  switch (effect.State as DoorState) {
    case DoorState.STATE_OPEN: {
      return "Opened";
    }

    case DoorState.STATE_CLOSED: {
      return "Closed";
    }

    default: {
      return "Opened";
    }
  }
}

// ModCallbacks.MC_POST_EFFECT_RENDER (56)
function postEffectRenderCustomEntity(effect: EntityEffect) {
  const ptrHash = GetPtrHash(effect);
  const doorData = v.room.customDoors.get(ptrHash);
  if (doorData === undefined) {
    return;
  }

  const direction = doorSlotToDirection(doorData.slot);
  const player = getClosestPlayer(effect.Position);
  if (isPlayerPastDoorThreshold(effect, player, direction)) {
    postCustomDoorEnterFire(player, effect.Variant, doorData.slot, direction);
  }
}

function isPlayerPastDoorThreshold(
  effect: EntityEffect,
  player: EntityPlayer,
  direction: Direction,
) {
  switch (direction) {
    case Direction.NO_DIRECTION: {
      return false;
    }

    // 1
    case Direction.UP: {
      return player.Position.Y <= effect.Position.Y;
    }

    // 2
    case Direction.RIGHT: {
      return player.Position.X >= effect.Position.X;
    }

    // 3
    case Direction.DOWN: {
      return player.Position.Y >= effect.Position.Y;
    }

    // 4
    case Direction.LEFT: {
      return player.Position.X <= effect.Position.X;
    }

    default: {
      return ensureAllCases(direction);
    }
  }
}

/**
 * Helper function to spawn a custom door. Handle when a player enters the door by hooking the
 * custom `MC_POST_CUSTOM_DOOR_ENTER` callback.
 *
 * The custom door is an `EntityEffect`. You can manually open or close the door by modifying its
 * state. (The values to use correspond to the `DoorState` enum.)
 *
 * Before using this function, you must first initialize it with the `initCustomDoor` function.
 */
export function spawnCustomDoor(
  effectVariant: int,
  doorSlot: DoorSlot,
): EntityEffect {
  if (!initializedEffectVariants.has(effectVariant)) {
    error(
      'In order to spawn custom doors, you must first initialize them with the "initCustomDoor" function at the beginning of your mod.',
    );
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();
  const position = room.GetDoorSlotPosition(doorSlot);
  const effect = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    effectVariant,
    0,
    position,
    Vector.Zero,
    undefined,
  ).ToEffect();
  if (effect === undefined) {
    error(`Failed to spawn a custom door with variant: ${effectVariant}`);
  }

  // Do initial setup for the door
  effect.State = roomClear ? DoorState.STATE_OPEN : DoorState.STATE_CLOSED;
  effect.RenderZOffset = -10000;
  effect.PositionOffset = getPositionOffset(doorSlot);
  const sprite = effect.GetSprite();
  sprite.Rotation = doorSlot * 90 - 90;

  // Keep track of metadata about this door
  const ptrHash = GetPtrHash(effect);
  const doorData: CustomDoorData = {
    slot: doorSlot,
    state: effect.State,
  };
  v.room.customDoors.set(ptrHash, doorData);

  doorChangedState(effect);

  return effect;
}

function getPositionOffset(doorSlot: DoorSlot) {
  const direction = doorSlotToDirection(doorSlot);
  const vector = directionToVector(direction);
  return vector.mul(POSITION_OFFSET_MULTIPLIER);
}

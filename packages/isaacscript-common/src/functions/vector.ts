import { Direction } from "isaac-typescript-definitions";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { copyValuesToTable, getNumbersFromTable, tableHasKeys } from "./table";
import { ensureAllCases } from "./utils";

type SerializedVector = LuaTable<string, unknown> & {
  __serializedVectorBrand: void;
};

interface CopyVectorReturn {
  [SerializationType.NONE]: Vector;
  [SerializationType.SERIALIZE]: SerializedVector;
  [SerializationType.DESERIALIZE]: Vector;
}

const KEYS = ["X", "Y"];
const OBJECT_NAME = "Vector";

/**
 * Helper function to copy a `Vector` object.
 *
 * @param vector The vector to copy. In the case of deserialization, this will actually be a Lua
 *               table instead of an instantiated Vector class.
 * @param serializationType Default is `SerializationType.NONE`.
 */
export function copyVector<
  V extends Vector | SerializedVector,
  S extends SerializationType,
>(vector: V, serializationType: S): CopyVectorReturn[S];
export function copyVector<V extends Vector | SerializedVector>(
  vector: V,
): CopyVectorReturn[SerializationType.NONE];
export function copyVector(
  vector: Vector | SerializedVector,
  serializationType = SerializationType.NONE,
): CopyVectorReturn[keyof CopyVectorReturn] {
  switch (serializationType) {
    case SerializationType.NONE: {
      if (!isVector(vector)) {
        error(
          `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      return Vector(vector.X, vector.Y);
    }

    case SerializationType.SERIALIZE: {
      if (!isVector(vector)) {
        error(
          `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      const vectorTable = new LuaTable<string, unknown>();
      copyValuesToTable(vector, KEYS, vectorTable);
      vectorTable.set(SerializationBrand.VECTOR, "");
      return vectorTable as SerializedVector;
    }

    case SerializationType.DESERIALIZE: {
      const vectorType = type(vector);
      if (isVector(vector) || vectorType !== "table") {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
        );
      }

      const [x, y] = getNumbersFromTable(vector, OBJECT_NAME, ...KEYS);

      if (x === undefined) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: x`,
        );
      }
      if (y === undefined) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: y`,
        );
      }

      return Vector(x, y);
    }

    default: {
      return ensureAllCases(serializationType);
    }
  }
}

/**
 * Used to determine is the given table is a serialized `Vector` object created by the save data
 * manager and/or the `deepCopy` function.
 */
export function isSerializedVector(
  object: unknown,
): object is SerializedVector {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const table = object as LuaTable<AnyNotNil, unknown>;
  return tableHasKeys(table, ...KEYS) && table.has(SerializationBrand.VECTOR);
}

/** Helper function to check if something is an instantiated Vector object. */
export function isVector(object: unknown): object is Vector {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

export function vectorEquals(vector1: Vector, vector2: Vector): boolean {
  return isaacAPIClassEquals(vector1, vector2, KEYS);
}

/** Helper function for finding out which way a vector is pointing. */
export function vectorToDirection(vector: Vector): Direction {
  const degrees = vector.GetAngleDegrees();

  if (degrees > -45 && degrees < 45) {
    return Direction.RIGHT;
  }

  if (degrees >= 45 && degrees <= 135) {
    return Direction.DOWN;
  }

  if (degrees <= -45 && degrees >= -135) {
    return Direction.UP;
  }

  if (degrees > 135 || degrees < -135) {
    return Direction.LEFT;
  }

  return Direction.NO_DIRECTION;
}

export function vectorToString(vector: Vector, round = false): string {
  const x = round ? Math.round(vector.X) : vector.X;
  const y = round ? Math.round(vector.Y) : vector.Y;
  return `(${x}, ${y})`;
}

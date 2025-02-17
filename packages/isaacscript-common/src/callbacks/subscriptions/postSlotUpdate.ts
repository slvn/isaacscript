import { SlotVariant } from "isaac-typescript-definitions";

export type PostSlotUpdateRegisterParameters = [
  callback: (slot: EntitySlot) => void,
  slotVariant?: SlotVariant,
];

const subscriptions: PostSlotUpdateRegisterParameters[] = [];

/** @internal */
export function postSlotUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotUpdateRegister(
  ...args: PostSlotUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postSlotUpdateFire(slot: EntitySlot): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}

---
title: JavaScript/TypeScript Tutorial
---

If you have never programmed in JavaScript/TypeScript before, but you **have** programmed in Lua, then this page is for you. Below, you can compare Lua code side by side with the equivalent TypeScript code. If you have coded a mod in Lua before, reading through this page will probably be enough to get you started.

If you have never programmed in Lua before, then skip reading this page.

<br />

## Level 1 - Basic

<br />

### Comments

```lua
-- This is a single-line comment in Lua.

--[[

This is a multi-line comment in Lua.
It's very long.
And wordy.

--]]
```

```ts
// This is a single-line comment in TypeScript.

/*

This is a multi-line comment in TypeScript.
It's very long.
And wordy.

*/
```

<br />

### Semi-Colons

Unlike Lua, TypeScript code should have semi-colons after every line.

```lua
-- Lua code
Isaac.DebugString("hello world")
```

```ts
// TypeScript code
Isaac.DebugString("hello world");
```

But don't bother typing the semi-colons yourself - just hit `Ctrl + s` and the editor will automatically insert them for you. That's [Prettier](https://prettier.io/) doing its job.

(In fact, you should always hit `Ctrl + s` periodically as you code, so that the code is constantly formatting itself. This frees you from the tedium of aligning things, breaking up long if statements, and so forth. If the file is not auto-formatting itself, then you probably need to add a bracket somewhere so that the code can properly compile.)

<br />

### Colons

In Lua, you sometimes call functions with a colon, and you sometimes call functions with a period. This is really annoying.

In TypeScript, you just call everything with a period. Easy.

```lua
-- Lua code
Isaac.DebugString("hello world")
Game():GetPlayer():AddMaxHearts(2)
```

```ts
// TypeScript code
Isaac.DebugString("hello world");
Game().GetPlayer().AddMaxHearts(2);
```

<br />

### Variables: `local` --> `const` and `let`

In Lua, you generally type `local` before declaring a variable to stop it from being turned into a global.

In TypeScript, this isn't necessary. There are no globals variables, unless we explicitly create one.

Furthermore, in TypeScript, there are two kinds of variable declarations: `let` and `const`.<br />
(Don't ever use `var`, which is only used in older JavaScript code.)

```lua
-- Lua code
local poop = "poop"
local numFarts = 1
numFarts = numFarts + 1 -- numFarts is now equal to 2
```

```ts
// TypeScript code
const poop = "poop"; // We use "const" because this value never changes
let numFarts = 1; // We use "let" because we have to modify it later
numFarts = numFarts + 1; // numFarts is now equal to 2
```

<br />

### Functions

```lua
-- Lua code
function getNumPoops() -- This is a global function
  return 2
end

local function getNumFarts() -- This is a local function
  return 3
end
```

```ts
// TypeScript code
// All functions in TypeScript are local by default
function getNumPoops() {
  return 2;
}
```

<br />

### Anonymous Functions

For very small functions, it is common to type them anonymously (i.e. without a name).

```lua
-- Lua code
mod:AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, function()
  Isaac.DebugString("Arrived on a new floor.")
end);
```

```ts
// Typescript code
mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, () => {
  Isaac.DebugString("Arrived on a new floor.");
});
```

(If this syntax looks confusing, google "JavaScript arrow functions" in order to get more familiar with them. But of course, you don't have to use arrow functions if you don't want to.)

<br />

### `if` Statements and Operators

In Lua, you don't put parentheses around the conditions of an `if` statement. But in TypeScript, you do.

Also, the operators are a bit different:

- `and` --> `&&`
- `or` --> `||`
- `==` --> `===`
- `~=` --> `!==`
- `..` --> `+`

For example:

```lua
-- Lua code
if x == 1 and y ~= 0 then
  -- Do something
end
```

```ts
// TypeScript code
if (x === 1 && y !== 0) {
  // Do something
}
```

<br />

### `for` Statements for Counting

In Lua, basic `for` loops look like this:

```lua
-- Lua code
for i = 1, 10 do
  -- "i" will iterate upwards from 1 to 10
end
```

In TypeScript, you use the more-standard C-style syntax:

```ts
// TypeScript code
for (let i = 1; i <= 10; i++) {
  // "i" will iterate upwards from 1 to 10
}
```

In Lua, you count downwards like this:

```lua
-- Lua code
for i = 10, 1, -1 do
  -- "i" will iterate downwards from 10 to 1
end
```

In TypeScript, that would be:

```ts
// TypeScript code
for (let i = 10; i >= 1; i--) {
  // "i" will iterate downwards from 1 to 10
}
```

<br />

### `for` Statements for Arrays

In Lua, the typical way to iterate over an array is with `ipairs`.

```lua
-- Lua code
local gapers = Isaac.FindByType(EntityType.ENTITY_GAPER)

for i, gaper in ipairs(gapers) do
  print(i)
  gaper:Remove()
end
```

In TypeScript, you have a few different options.

```ts
// Typescript code
const gapers = Isaac.FindByType(EntityType.ENTITY_GAPER);

// A "for of" loop is the simplest way to iterate over an array
for (const gaper of gapers) {
  gaper.Remove();
}

// Or, use a "normal" for loop if you need the array index too
for (let i = 0; i < gaper.length; i++) {
  const gaper = gapers[i];
  gaper.Remove();
}
```

<br />

### `for` Statements for Key/Value Tables

In Lua, the typical way to iterate over a key/value table is with `pairs`.

```lua
-- Lua code
-- Define a table of collectible prices
-- (we must put "[]" around the collectible types since the table keys are numbers)
local collectiblePrices = {
  [1] = 15, -- Sad Onion
  [2] = 15, -- The Inner Eye
  [3] = 7, -- Spoon Bender
}

for collectibleType, price in pairs(collectiblePrices) do
  -- Do something with "collectibleType" and "price"
end
```

In TypeScript, you have a few different options.

```ts
// TypeScript code
// Define an anonymous object containing collectible prices
const collectiblePrices = {
  [1]: 15, // Sad Onion
  [2]: 15, // The Inner Eye
  [3]: 7, // Spoon Bender
};

for (const [collectibleType, price] of Object.entries(collectiblePrices)) {
  // Do something with "collectibleType" and "price"
}

// Or, if you just need the collectible type, you would use the "keys()" method
for (const collectibleType of Object.keys(collectiblePrices)) {
  // Do something with "collectibleType"
}

// Or, if you just need the price, you would use the "values()" method
for (const price of Object.values(collectiblePrices)) {
  // Do something with "price"
}
```

<br />

### `nil` --> `undefined`

```lua
-- Lua code
if entity.SpawnerEntity == nil then
  -- This entity was not spawned by anything in particular
end
```

```ts
// TypeScript code
if (entity.SpawnerEntity === undefined) {
  // This entity was not spawned by anything in particular
}
```

Note that `null` also transpiles to `nil` (in addition to `undefined`). But `null` should be reserved for situations where you want to model an actual null-type defined value.

<br />

## Level 2 - Intermediate

<br />

### Assignment Operators

Lua does not have assignment operators, because it is a terrible language.

```lua
-- Lua code
local numFarts = 1
numFarts = numFarts + 1 -- numFarts is now equal to 2
```

```ts
// TypeScript code
let numFarts = 1;
numFarts += 1; // numFarts is now equal to 2
```

<br />

### String Concatenation

The way to concatenate strings is different:

```lua
-- Lua code
local poopString = "Poop"
local fartString = "Fart"
local combinedString = poopString .. fartString -- combinedString is now equal to "PoopFart"
```

```ts
// TypeScript code
const poopString = "Poop";
const fartString = "Fart";
const combinedString = poopString + fartString; // combinedString is now equal to "PoopFart"
```

(TypeScript uses the same operator for adding numbers and concatenating strings.)

<br />

### String Conversion

```lua
-- Lua code
local numPoops = 3
local numPoopsString = tostring(numPoops)
```

```ts
// TypeScript code
const numPoops = 3;
const numPoopsString1 = tostring(numPoops); // You can do the same thing as you would in Lua
const numPoopsString2 = numPoops.toString(); // Or, you can use the typical JavaScript conversion method
```

Feel free to use either the standard Lua method or the JavaScript conversion method - it will be transpiled to the same thing.

Furthermore, when concatenating numbers to strings, TypeScript will automatically convert them to strings for you:

```lua
-- Lua code
local numPoops = 3
local numFarts = 4
Isaac.DebugString("numPoops: " .. tostring(numPoops) .. ", numFarts: " .. tostring(numFarts))
```

```ts
// Typescript code
const numPoops = 3;
const numFarts = 4;
Isaac.DebugString("numPoops: " + numPoops + ", numFarts: " + numFarts); // No conversion necessary!
```

### String Templates

TypeScript has a special feature that Lua does not have called _string templates_. String templates allow you to easily create a string that has a bunch of variables in it. They are denoted by the <code>`</code> character.

In the previous section, we used the `+` operator to combine a bunch of variables with text. But it would probably be better written by using a string template, like this:

```ts
// Typescript code
const numPoops = 3;
const numFarts = 4;
Isaac.DebugString(`numPoops: ${numPoops}, numFarts: ${numFarts}`);
```

<br />

### TypeScript Type Annotations

The main thing that TypeScript adds to JavaScript is type annotations. Here's a quick example:

```lua
-- Lua code
function postPlayerInit(player)
  -- Add Sad Onion
  player:AddCollectible(1, 0, false)
end
```

```javascript
// JavaScript code
function postPlayerInit(player) {
  // Add Sad Onion
  player.AddCollectible(1, 0, false);
}
```

```ts
// TypeScript code
function postPlayerInit(player: EntityPlayer) {
  // Add Sad Onion
  player.AddCollectible(1, 0, false);
}
```

In the TypeScript code snippet, you can see that we marked "player" as the "EntityPlayer" type by using a colon. The "EntityPlayer" type is automatically provided by the `isaac-typescript-definitions` package, and corresponds to "EntityPlayer" in the official docs. (The `isaac-typescript-definitions` package is automatically added to any IsaacScript project.)

Once the type has been annotated, your editor will know about all of the legal methods for the "player" variable. If you make a typo on the "AddCollectible" method, the editor will immediately tell you by drawing a squiggly line underneath it.

When coding in TypeScript, you will need to add the type for every function argument. That way, the compiler can catch all of the bugs.

<br />

### Splitting Your Code Into Multiple Files: `require()` --> `import`

In Lua, you split your code into multiple files by using `require()`.

```lua
-- main.lua
-- In Lua, we must namespace the mod to avoid require conflicts
local postGameStarted = require("revelations.callbacks.postGameStarted")

local mod = RegisterMod("Revelations", 1)
postGameStarted:init(mod)
```

```lua
-- revelations/callbacks/postGameStarted.lua
local postGameStarted = {}

function postGameStarted:init(mod)
  mod:AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted.main);
end

function postGameStarted:main()
  -- Add Sad Onion
  local player = Isaac.GetPlayer()
  player:AddCollectible(1, 0, false)
end

return postGameStarted
```

In TypeScript, this is accomplished with `import`.<br />
(Don't ever use the JavaScript/TypeScript version of `require()`, which is only used in older JavaScript code.)

```ts
// main.ts
import { postGameStartedInit } from "./callbacks/postGameStarted";

const mod = RegisterMod("Revelations", 1);
postGameStartedInit(mod);
```

```ts
// callbacks/postGameStarted.ts
// "export" makes it so that other files can use this function
// "void" is an return-type annotation, meaning "this function returns nothing"
export function postGameStartedInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, main);
}

function main() {
  // Add Sad Onion
  const player = Isaac.GetPlayer();
  player.AddCollectible(1, 0, false);
}
```

(With TypeScript, there is no need to have a superfluous namespacing directory like in Lua.)

<br />

## Level 3 - Advanced

<br />

### Using Global Variables

Sometimes, your mod might need to use a global variable exported by someone else's mod. For example, you might need to use the `InfinityTrueCoopInterface` global variable from the True Co-op Mod. (This mod is useless now in Repentance, but in Afterbirth+, most character mods would want to register their character with the True Co-op Mod.)

<br />

#### Option 1 - Inline Declarations

In Lua, checking to see if the user has the True Co-op Mod installed would look something like this:

```lua
-- Lua code
if InfinityTrueCoopInterface ~= nil then
  -- The user has the True Co-op mod enabled, so now do something
end
```

The TypeScript equivalent would look like this:

```ts
// TypeScript code
if (InfinityTrueCoopInterface !== undefined) {
  // The user has the True Co-op mod enabled, so now do something
}
```

However, this exact code would result in an error, because the TypeScript compiler (rightly) complains that the "InfinityTrueCoopInterface" variable does not exist. Normally, this kind of thing is extremely useful, because when a variable "does not exist", it usually means we forgot to initialize it or we made a typo somewhere. However, in this case, the "InfinityTrueCoopInterface" variable really does exist - it's just not a part of _our_ code. So, we just need a way to tell the TypeScript compiler that.

The way to do that is to use the `declare` keyword, like this:

```ts
// TypeScript code
declare const InfinityTrueCoopInterface: unknown | undefined;

if (InfinityTrueCoopInterface !== undefined) {
  // The user has the True Co-op mod enabled, so now do something
}
```

The `declare` keyword essentially means "the following variable exists outside of the context of this program, and is provided by some other running code". Importantly, `declare` statements do not actually result in any transpiled Lua code; they are purely messages to the TypeScript compiler.

In this context, we annotate the type of the variable as `unknown | undefined`, which means that it is either "something" or "does not exist". (`unknown` is a special TypeScript type that you can use when you don't know what the real type of something is.)

<br />

#### Option 2 - A Declaration File

If you check for `InfinityTrueCoopInterface !== undefined` in more than one place in your mod, then option 1 is bad, because you would be [need to repeat yourself before each check](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Instead, make a TypeScript definition file that corresponds to the variable / table.

For example, to declare `InfinityTrueCoopInterface`, starting from the root of your project:

- Create the `src/types` directory.
- Create the `src/types/InfinityTrueCoopInterface.d.ts` file. (A `d.ts` file is a TypeScript _declaration_ file.)
- Put the following in it:

```ts
declare const InfinityTrueCoopInterface: unknown | undefined;
```

Now, your other TypeScript files will "see" it as a global variable without you having to do anything else.

<br />

### Using Complicated Global Variables

First, see the previous section on [using global variables](#using-global-variables).

In the True Co-op Mod, the exported global variable of `InfinityTrueCoopInterface` allows other mods to add new characters with the `AddCharacter` method. Imagine that your mod creates a new character and you want to add that character to the True Co-op Mod. If you try calling `InfinityTrueCoopInterface.AddCharacter()`, TypeScript will throw an error and say that it doesn't exist.

The solution is to add the `AddCharacter()` method to our definition file. We need to flesh out the `src/types/InfinityTrueCoopInterface.d.ts` file a bit:

```ts
// The global variable exists and it is a Lua table of type TrueCoop,
// which we will immediately define below
declare const InfinityTrueCoopInterface: TrueCoop | undefined;

// We declare a TrueCoop class that has as many methods or members as we need
// (but for now we will only add one)
declare class TrueCoop() {
  AddCharacter(playerData: TrueCoopPlayerData)
}

// We also have to specify what the True Co-op mod expects to be passed for the
// first argument of the "AddCharacter" method (which is a table with a bunch of
// things in it
// This (partially) matches the documentation near the top of the "main.lua"
// file for the True Co-op Mod
interface TrueCoopPlayerData {
  Name: string;
  Type: PlayerType;
  SelectionGfx: string;
  GhostCostume: NullCostumeID;
  MaxHearts: int;
  Hearts: int;
  // etc.
}
```

After doing this, we will be able to call `InfinityTrueCoopInterface.AddCharacter(playerData)` successfully in our code.

<br />

### Exporting Global Variables

In Lua, some mods export functionality by using a global variable:

```lua
-- Lua code
RevelationsVersion = "2.1"
-- "RevelationsVersion" is now a global variable
```

In TypeScript, you just have to declare it beforehand:

```ts
// TypeScript code
declare let RevelationsVersion: string;
RevelationsVersion = "2.1";
// "RevelationsVersion" is now a global variable
```

Building on this example, you can also expose both variables and methods:

```ts
declare let RevelationsExports: unknown;
RevelationsExports = {
  myVariable1,
  myVariable2,
  myFunction1,
  myFunction2,
};
// "RevelationsExports" is now a global variable
```

<br />

### Enums

In the previous [`for` loop section](#for-statements-for-keyvalue-tables), we defined a mapping of collectibles to prices. <!-- cspell:ignore keyvalue -->

Imagine that in our mod, collectibles can only be sold for three different prices:

- 15 coins (normal)
- 30 coins (double)
- 7 coins (on sale)

This means that we can get even more specific with our collectible prices definition by using an `enum`. Unlike Lua, TypeScript has a built-in `enum` data type.

```ts
enum CollectiblePrice {
  NORMAL = 15,
  DOUBLE = 30,
  SALE = 7,
}

// collectiblePrices now only has values of CollectiblePrice, which is even safer than before!
const collectiblePrices = {
  [1]: CollectiblePrice.NORMAL, // Sad Onion
  [2]: CollectiblePrice.NORMAL, // The Inner Eye
  [3]: CollectiblePrice.SALE, // Spoon Bender
};
```

<br />

### Maps

In the previous [enums](#enums) section, we defined "collectiblePrices" as an anonymous object, which is roughly equivalent to a Lua table.

Anonymous objects are good for cases where you won't use variables to access the data. But this isn't the case for "collectiblePrices". Here, we are only specifying the prices for _some_ of the collectibles in the game. If a collectible isn't in the list, we'll probably want to ignore it, or give it a default value, or something along those lines.

In this example, what "collectiblePrices" _really_ represents is a _map_ of a specific collectible type to a price. Unlike Lua, TypeScript has a `Map` data type. So, the example would be better written like this:

```ts
const collectiblePrices = new Map<int, CollectiblePrice>([
  [1, CollectiblePrice.NORMAL], // Sad Onion
  [2, CollectiblePrice.NORMAL], // The Inner Eye
  [3, CollectiblePrice.SALE], // Spoon Bender
]);
for (const [collectibleType, price] of collectiblePrices.entries()) {
  // Do something with "collectibleType" and "price"
}
```

In this example, collectiblePrices has a type of `Map<int, number>`, which makes much more sense than an anonymous object.

- The first value in the angle brackets corresponds to the map key type.
- The second value in the angle brackets corresponds to the map value type.

We initialize the map by passing an array of key/value pairs to the constructor.

With a map, you can use all of the handy methods [shown in the MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (listed on the left side). Here's an example of using the `get()` method to emulate checking for a value in a Lua table:

```lua
-- Lua code
function pickingUpCollectible(player, collectibleType)
  -- If the player picked up a new collectible,
  -- subtract the price of that collectible from their coin amount
  local price = collectiblePrices[collectibleType]
  if price ~= nil then
    player:AddCoins(price * -1)
  end
end
```

```ts
// TypeScript code
function pickingUpCollectible(player: EntityPlayer, collectibleType: int) {
  // If the player picked up a new collectible,
  // subtract the price of that collectible from their coin amount
  const price = collectiblePrices.get(collectibleType);
  if (price !== undefined) {
    player.AddCoins(price * -1);
  }
}
```

<br />

### Type Narrowing

Lua allows you to write unsafe code. Consider the following:

```lua
-- Lua code
local player = entity:ToPlayer() -- Convert the entity to a player
player:AddMaxHearts(2) -- Give them a heart container
```

Not all entities convert to players though, so this code can fail. In fact, for most entities, the `ToPlayer()` method would return `nil` and cause the next line to throw a runtime error, preventing all of the subsequent code in the callback from firing. In TypeScript, writing this code would cause a compiler error:

```ts
const player = entity.ToPlayer();
player.AddMaxHearts(2); // Error: Object is possibly 'undefined'
```

This error is because the return type of the `ToPlayer()` method is `EntityPlayer | undefined`. To solve this, we can use _type narrowing_:

```ts
const player = entity.ToPlayer();
if (player === undefined) {
  error("Failed to convert the entity to a player.");
}
player.AddMaxHearts(2); // The type of player is now narrowed to "EntityPlayer"
```

Here, we explicitly handle the error case and supply a helpful error message. But this code does something more important than simply providing the error message.

`error()` is a Lua function that causes execution of the function to immediately end. Thus, TypeScript is smart enough to realize that if the code gets to the `AddMaxHearts()` line, the type of `player` is no longer `EntityPlayer | undefined` - it would have to be a `EntityPlayer`. You can confirm this by mousing over the variable in VSCode.

Since many of the Isaac API methods can fail, you will have to use _type narrowing_ like this in many places in your code. Sometimes, it can be annoying to explicitly check to see if things go wrong. But _type narrowing_ should be seen as a good thing: by handling errors in a sane way, you safely limit the damage that runtime errors can cause. And when things do go wrong, troubleshooting what happened becomes a lot easier.

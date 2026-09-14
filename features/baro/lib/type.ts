export type KitierType =
    | "Booster"
    | "Bundle"
    | "Captura Scene"
    | "Color Palette"
    | "Consumable"
    | "Cosmetic"
    | "Decoration"
    | "Emote"
    | "Glyph"
    | "Lootbox"
    | "Mod"
    | "Primed Mod"
    | "Quest"
    | "Sentinel"
    | "Somachord"
    | "Void Relic"
    | "Weapon";

export type KitierCategory =
    | "Archgun"
    | "Archwing"
    | "Armor"
    | "Atomicycle"
    | "Bow"
    | "Companion"
    | "Emblem"
    | "Ephemera"
    | "K-Drive"
    | "Kavat"
    | "Kubrow"
    | "Landing Craft"
    | "MOA"
    | "Melee"
    | "Operator"
    | "Orbiter"
    | "Pistol"
    | "Rifle"
    | "Sentinel"
    | "Shotgun"
    | "Sigil"
    | "Sniper"
    | "Stance"
    | "Syandana"
    | "Warframe"
    | "Warframe Skin"
    | "Weapon"
    | "Weapon Skin"
    | "unknown";

export interface kitierItems {
    item: string;
    item_kr?: string;
    type: KitierType;
    category: KitierCategory;
    credit: number;
    ducat: number;
    only: boolean;
}
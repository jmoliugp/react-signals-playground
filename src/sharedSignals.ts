import { signal } from "@preact/signals-react";
import { Character } from "./entities/character";

export const sithCount = signal(0);
export const jedis = signal<Character[]>([]);
export const siths = signal<Character[]>([]);

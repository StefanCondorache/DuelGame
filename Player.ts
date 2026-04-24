import * as Skills from './Skills.ts';

const allSkills = Object.values(Skills);

export class Player {
  name?: string = "Unknown player";
  health: number;
  attack: number;
  defense: number;
  ability: Function;

  constructor(
    name: string,
    health: number = 100,
    attack: number = Math.floor(Math.random() * 6) + 15,
    defense: number = Math.floor(Math.random() * 6) + 10,
    ability: Function = allSkills[Math.floor(Math.random() * allSkills.length)]
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.ability = ability;
  }

}
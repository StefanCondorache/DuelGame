import { Player } from "./Player.ts";
import * as Skills from "./Skills.ts";

const perRoundAbilities = process.argv.includes('--per-round');
const allSkills = Object.values(Skills);

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

console.log(`${player1.name}: attack = ${player1.attack}, defense = ${player1.defense}, ability = ${player1.ability.name}`);
console.log(`${player2.name}: attack = ${player2.attack}, defense = ${player2.defense}, ability = ${player2.ability.name}\n`);

let isPlayer1Turn = Math.random() < 0.5;
let round = 1;

while (player1.health > 0 && player2.health > 0) {

    console.log(`Round ${round}:`);
    
    let attacker = isPlayer1Turn ? player1 : player2;
    let defender = isPlayer1Turn ? player2 : player1;
    let attackerName = isPlayer1Turn ? player1.name : player2.name;
    let defenderName = isPlayer1Turn ? player2.name : player1.name;

    if (attacker.attack == defender.defense && attacker.defense == defender.attack) {
        console.log("It's a stalemate! Both players have equal attack and defense.\n")
        break;
    }

    if (defender.attack == 0) {
        console.log(`${defenderName} has no attack power! ${attackerName} wins by default.\n`);
        break;
    }

    if (attacker.attack == 0) {
        console.log(`${attackerName} has no attack power! ${defenderName} wins by default.\n`);
        break;
    }

    console.log(`${attackerName} attacks`);

    let currentAttack = attacker.attack;

    if (attacker.ability.name === "PowerStrike" && Math.random() <= 0.25) {
        const ability = attacker.ability(attackerName, currentAttack);
        currentAttack = ability.number;
        console.log(ability.msg);
    }

    if (attacker.ability.name === "MortalStrike" && Math.random() <= 0.25) {
        const ability = attacker.ability(attackerName, defender.attack);
        defender.attack = ability.number;
        console.log(ability.msg);
    }

    let damage = Math.max(0, currentAttack - defender.defense);

    if (defender.ability.name === "DamageReduction" && Math.random() <= 0.25) {
        const ability = defender.ability(defenderName, damage);
        damage = ability.number;
        console.log(ability.msg);
    }
    
    defender.health -= damage;

    if (defender.health > 0 && defender.health < 30) {
        if (defender.ability.name === "SecondWind" && Math.random() <= 0.25) {
            const ability = defender.ability(defenderName, defender.health);
            defender.health = ability.number;
            console.log(ability.msg);
        }
    }

    if (defender.health < 0) defender.health = 0;

    console.log(`${defenderName} has ${Math.round(defender.health)} health\n`);

    if (defender.health <= 0) {
        console.log(`${attackerName} won!`);
        break;
    }

    isPlayer1Turn = !isPlayer1Turn;
    round++;

    if (perRoundAbilities) {
        player1.ability = allSkills[Math.floor(Math.random() * allSkills.length)];
        console.log(`${player1.name} gets new ability: ${player1.ability.name}`);

        player2.ability = allSkills[Math.floor(Math.random() * allSkills.length)];
        console.log(`${player2.name} gets new ability: ${player2.ability.name}\n`);
    }
}
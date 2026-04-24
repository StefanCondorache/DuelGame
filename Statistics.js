import { execSync } from 'child_process';

const perRoundAbilities = process.argv.includes('--per-round');

let player1Wins = 0;
let player2Wins = 0;
let ties = 0;
const ROUNDS = 1000;

for (let i = 0; i < ROUNDS; i++) {
    try{
        let outputBuffer;
        if (perRoundAbilities) {
            outputBuffer = execSync('node Duel.js --per-round', { stdio: 'pipe' });
        }
        else{
            outputBuffer = execSync('node Duel.js', { stdio: 'pipe' });
        }

        const outputString = outputBuffer.toString();

        if (outputString.includes('Player 1 won!') || outputString.includes('Player 1 wins by default')) {
            player1Wins++;
        } else if (outputString.includes('Player 2 won!') || outputString.includes('Player 2 wins by default')) {
            player2Wins++;
        }
    }catch (error) {
        console.error('Error executing Duel.js:', error);
    }
}

if (player1Wins + player2Wins !== ROUNDS) { ties = ROUNDS - (player1Wins + player2Wins); }

console.log(`Player 1 win rate = ${Math.round(player1Wins/ROUNDS * 100)}%`);
console.log(`Player 2 win rate = ${Math.round(player2Wins/ROUNDS * 100)}%`);
console.log(`Ties = ${Math.round(ties/ROUNDS * 100)}%`);
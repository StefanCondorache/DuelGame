function DamageReduction(playerName: string, damage: number) {
    // When the character is attacked, it takes only half damage.
    return {
        msg: `${playerName} activates Damage Reduction`,
        number: Math.floor(damage / 2)
    };
}

function PowerStrike(playerName: string, attack: number){
    // When the character attacks, it attacks with 50% more power.
    return {
        msg: `${playerName} activates Power Strike`,
        number: Math.floor(attack * 1.5)
    };
}

function SecondWind(playerName: string, health: number){
    // If an attack brings the character below 30 health, it heals itself by 5.
    return {
        msg: `${playerName} activates Second Wind`,
        number: health + 5
    };
}

function MortalStrike(playerName: string, attack: number){
    // When the character attacks, it reduces the defenders attack power by 50% permanently.
    return {
        msg: `${playerName} activates Mortal Strike`,
        number: Math.floor(attack / 2)
    };
}

export {DamageReduction, PowerStrike, SecondWind, MortalStrike};
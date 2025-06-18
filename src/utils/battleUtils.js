export const battlePokemon = (pokemon1, pokemon2) => {
    const speed1 = pokemon1.speed || 0;
    const speed2 = pokemon2.speed || 0;
    const attack1 = pokemon1.attack || 0;
    const attack2 = pokemon2.attack || 0;
    const defense1 = pokemon1.defense || 0;
    const defense2 = pokemon2.defense || 0;

    const firstAttacker = speed1 >= speed2 ? pokemon1 : pokemon2;
    const secondAttacker = speed1 >= speed2 ? pokemon2 : pokemon1;
    const firstAttack = speed1 >= speed2 ? attack1 : attack2;
    const firstDefense = speed1 >= speed2 ? defense2 : defense1;
    const secondAttack = speed1 >= speed2 ? attack2 : attack1;
    const secondDefense = speed1 >= speed2 ? defense1 : defense2;

    let winner = null;
    let battleLog = [];

    if (firstAttack > firstDefense) {
        winner = firstAttacker;
        battleLog.push(
            `${firstAttacker.name} ataca primero y debilita a ${secondAttacker.name}!`
        );
    } else {
        if (secondAttack > secondDefense) {
            winner = secondAttacker;
            battleLog.push(
                `${firstAttacker.name} ataca pero no causa daño suficiente.`
            );
            battleLog.push(
                `${secondAttacker.name} contraataca y debilita a ${firstAttacker.name}!`
            );
        } else {
            if (speed1 > speed2) {
                winner = pokemon1;
                battleLog.push(`Ningún pokémon puede superar la defensa del otro.`);
                battleLog.push(`${pokemon1.name} gana por mayor velocidad!`);
            } else if (speed2 > speed1) {
                winner = pokemon2;
                battleLog.push(`Ningún pokémon puede superar la defensa del otro.`);
                battleLog.push(`${pokemon2.name} gana por mayor velocidad!`);
            } else {
                winner = null;
                battleLog.push(`Ningún pokémon puede superar la defensa del otro.`);
                battleLog.push(`Ambos pokémon tienen la misma velocidad.`);
                battleLog.push(`¡La batalla termina en empate!`);
            }
        }
    }
    return {
        winner,
        loser: winner ? (winner.id === pokemon1.id ? pokemon2 : pokemon1) : null,
        isDraw: winner === null,
        battleLog,
        stats: {
            [firstAttacker.name]: {
                attack: firstAttack,
                defense: firstDefense,
                speed: speed1 >= speed2 ? speed1 : speed2,
            },
            [secondAttacker.name]: {
                attack: secondAttack,
                defense: secondDefense,
                speed: speed1 >= speed2 ? speed2 : speed1,
            },
        },
    };
};

export const battleTeams = (team1, team2) => {
    const minPokemon = Math.min(team1.pokemon.length, team2.pokemon.length);
    const rounds = [];
    let team1Wins = 0;
    let team2Wins = 0;
    let draws = 0;

    for (let i = 0; i < minPokemon; i++) {
        const pokemon1 = team1.pokemon[i];
        const pokemon2 = team2.pokemon[i];

        if (pokemon1 && pokemon2) {
            const roundResult = battlePokemon(pokemon1, pokemon2);

            if (roundResult.isDraw) {
                draws++;
            } else if (roundResult.winner.id === pokemon1.id) {
                team1Wins++;
            } else {
                team2Wins++;
            } rounds.push({
                round: i + 1,
                pokemon1,
                pokemon2,
                winner: roundResult.winner,
                isDraw: roundResult.isDraw,
                loser: roundResult.loser,
                battleLog: roundResult.battleLog,
                stats: roundResult.stats,
                isRealBattle: true,
            });
        }
    }

    const overallWinner =
        team1Wins > team2Wins ? team1 : team2Wins > team1Wins ? team2 : null; return {
            team1,
            team2,
            rounds,
            team1Wins,
            team2Wins,
            draws,
            team1Losses: team2Wins,
            team2Losses: team1Wins,
            overallWinner,
            isDraw: team1Wins === team2Wins,
            totalRealBattles: rounds.length,
            team1ExtraPokemon: Math.max(0, team1.pokemon.length - minPokemon),
            team2ExtraPokemon: Math.max(0, team2.pokemon.length - minPokemon),
        };
};

export const validateBattleTeams = (team1, team2) => {
    if (!team1 || !team2) {
        return {
            isValid: false,
            error: "Debes seleccionar dos equipos para batallar",
        };
    }

    if (team1.id === team2.id) {
        return {
            isValid: false,
            error: "No puedes hacer que un equipo luche contra sí mismo",
        };
    }

    if (team1.pokemon.length === 0 || team2.pokemon.length === 0) {
        return {
            isValid: false,
            error: "Ambos equipos deben tener al menos un Pokémon",
        };
    }

    return {
        isValid: true,
        error: null,
    };
};

export const updateBattleRecords = (battleResults, updateTeamRecord) => {
    const { overallWinner, team1, team2 } = battleResults;

    if (overallWinner) {
        if (overallWinner.id === team1.id) {
            updateTeamRecord(team1.id, "win");
            updateTeamRecord(team2.id, "lose");
        } else {
            updateTeamRecord(team2.id, "win");
            updateTeamRecord(team1.id, "lose");
        }
    }
};

export const getBattleResultMessage = (battleResults) => {
    const { overallWinner, isDraw } = battleResults;

    if (isDraw) {
        return "¡La batalla terminó en empate!";
    }

    if (overallWinner) {
        return `¡${overallWinner.name} ha ganado la batalla!`;
    }

    return "Batalla completada";
};

export const calculateBattleStats = (battleResults) => {
    const { team1, team2, team1Wins, team2Wins, rounds } = battleResults;

    const team1WinRate = team1.pokemon.length > 0
        ? (team1Wins / team1.pokemon.length) * 100
        : 0;

    const team2WinRate = team2.pokemon.length > 0
        ? (team2Wins / team2.pokemon.length) * 100
        : 0;

    const totalRounds = rounds.length;
    const decisiveRounds = rounds.filter(round =>
        round.pokemon1 && round.pokemon2
    ).length;

    return {
        team1WinRate: Math.round(team1WinRate),
        team2WinRate: Math.round(team2WinRate),
        totalRounds,
        decisiveRounds,
        defaultWins: totalRounds - decisiveRounds,
    };
};

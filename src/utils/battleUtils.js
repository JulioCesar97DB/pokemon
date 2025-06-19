const BATTLE_OUTCOMES = {
    FIRST_WINS: 'FIRST_WINS',
    SECOND_WINS: 'SECOND_WINS',
    SPEED_TIE: 'SPEED_TIE',
    DRAW: 'DRAW'
};

const getPokemonStats = (pokemon) => ({
    speed: pokemon.speed || 0,
    attack: pokemon.attack || 0,
    defense: pokemon.defense || 0
});

const getBattleOrder = (pokemon1, pokemon2) => {
    const stats1 = getPokemonStats(pokemon1);
    const stats2 = getPokemonStats(pokemon2);
    
    const isFirstAttacker = stats1.speed >= stats2.speed;
    
    return {
        first: isFirstAttacker ? pokemon1 : pokemon2,
        second: isFirstAttacker ? pokemon2 : pokemon1,
        firstStats: isFirstAttacker ? stats1 : stats2,
        secondStats: isFirstAttacker ? stats2 : stats1
    };
};

const determineBattleOutcome = (firstStats, secondStats, pokemon1Stats, pokemon2Stats) => {
    if (firstStats.attack > secondStats.defense) {
        return BATTLE_OUTCOMES.FIRST_WINS;
    }
    
    if (secondStats.attack > firstStats.defense) {
        return BATTLE_OUTCOMES.SECOND_WINS;
    }
    
    if (pokemon1Stats.speed === pokemon2Stats.speed) {
        return BATTLE_OUTCOMES.DRAW;
    }
    
    return BATTLE_OUTCOMES.SPEED_TIE;
};

const generateBattleLog = (outcome, battleOrder, pokemon1, pokemon2) => {
    const { first, second } = battleOrder;
    
    const battleMessages = {
        [BATTLE_OUTCOMES.FIRST_WINS]: [
            `${first.name} ataca primero y debilita a ${second.name}!`
        ],
        [BATTLE_OUTCOMES.SECOND_WINS]: [
            `${first.name} ataca pero no causa daño suficiente.`,
            `${second.name} contraataca y debilita a ${first.name}!`
        ],
        [BATTLE_OUTCOMES.SPEED_TIE]: [
            `Ningún pokémon puede superar la defensa del otro.`,
            `${getPokemonStats(pokemon1).speed > getPokemonStats(pokemon2).speed ? pokemon1.name : pokemon2.name} gana por mayor velocidad!`
        ],
        [BATTLE_OUTCOMES.DRAW]: [
            `Ningún pokémon puede superar la defensa del otro.`,
            `Ambos pokémon tienen la misma velocidad.`,
            `¡La batalla termina en empate!`
        ]
    };
    
    return battleMessages[outcome] || [];
};

const getWinnerFromOutcome = (outcome, battleOrder, pokemon1, pokemon2) => {
    const { first, second } = battleOrder;
    
    const winnerMap = {
        [BATTLE_OUTCOMES.FIRST_WINS]: first,
        [BATTLE_OUTCOMES.SECOND_WINS]: second,
        [BATTLE_OUTCOMES.SPEED_TIE]: getPokemonStats(pokemon1).speed > getPokemonStats(pokemon2).speed ? pokemon1 : pokemon2,
        [BATTLE_OUTCOMES.DRAW]: null
    };
    
    return winnerMap[outcome];
};

export const battlePokemon = (pokemon1, pokemon2) => {
    const pokemon1Stats = getPokemonStats(pokemon1);
    const pokemon2Stats = getPokemonStats(pokemon2);
    const battleOrder = getBattleOrder(pokemon1, pokemon2);
    
    const outcome = determineBattleOutcome(
        battleOrder.firstStats, 
        battleOrder.secondStats,
        pokemon1Stats,
        pokemon2Stats
    );
    
    const winner = getWinnerFromOutcome(outcome, battleOrder, pokemon1, pokemon2);
    const battleLog = generateBattleLog(outcome, battleOrder, pokemon1, pokemon2);
    
    return {
        winner,
        loser: winner ? (winner.id === pokemon1.id ? pokemon2 : pokemon1) : null,
        isDraw: winner === null,
        battleLog,
        stats: {
            [battleOrder.first.name]: battleOrder.firstStats,
            [battleOrder.second.name]: battleOrder.secondStats
        }
    };
};

export const battleTeams = (team1, team2) => {
    const minPokemon = Math.min(team1.pokemon.length, team2.pokemon.length);
    const battleStats = { team1Wins: 0, team2Wins: 0, draws: 0 };
    
    const rounds = Array.from({ length: minPokemon }, (_, i) => {
        const pokemon1 = team1.pokemon[i];
        const pokemon2 = team2.pokemon[i];
        
        if (!pokemon1 || !pokemon2) return null;
        
        const roundResult = battlePokemon(pokemon1, pokemon2);
        
        if (roundResult.isDraw) {
            battleStats.draws++;
        } else if (roundResult.winner.id === pokemon1.id) {
            battleStats.team1Wins++;
        } else {
            battleStats.team2Wins++;
        }
        
        return {
            round: i + 1,
            pokemon1,
            pokemon2,
            ...roundResult,
            isRealBattle: true
        };
    }).filter(Boolean);
    
    const overallWinner = battleStats.team1Wins === battleStats.team2Wins 
        ? null 
        : (battleStats.team1Wins > battleStats.team2Wins ? team1 : team2);
    
    return {
        team1,
        team2,
        rounds,
        ...battleStats,
        team1Losses: battleStats.team2Wins,
        team2Losses: battleStats.team1Wins,
        overallWinner,
        isDraw: battleStats.team1Wins === battleStats.team2Wins,
        totalRealBattles: rounds.length,
        team1ExtraPokemon: Math.max(0, team1.pokemon.length - minPokemon),
        team2ExtraPokemon: Math.max(0, team2.pokemon.length - minPokemon),
    };
};

const VALIDATION_RULES = [
    {
        condition: (team1, team2) => !team1 || !team2,
        error: "Debes seleccionar dos equipos para batallar"
    },
    {
        condition: (team1, team2) => team1.id === team2.id,
        error: "No puedes hacer que un equipo luche contra sí mismo"
    },
    {
        condition: (team1, team2) => team1.pokemon.length === 0 || team2.pokemon.length === 0,
        error: "Ambos equipos deben tener al menos un Pokémon"
    }
];

export const validateBattleTeams = (team1, team2) => {
    const failedRule = VALIDATION_RULES.find(rule => rule.condition(team1, team2));
    
    return failedRule 
        ? { isValid: false, error: failedRule.error }
        : { isValid: true, error: null };
};

export const updateBattleRecords = (battleResults, updateTeamRecord) => {
    const { overallWinner, team1, team2 } = battleResults;
    
    if (!overallWinner) return;
    
    const isTeam1Winner = overallWinner.id === team1.id;
    const [winnerTeam, loserTeam] = isTeam1Winner ? [team1, team2] : [team2, team1];
    
    updateTeamRecord(winnerTeam.id, "win");
    updateTeamRecord(loserTeam.id, "lose");
};

export const getBattleResultMessage = ({ overallWinner, isDraw }) => {
    if (isDraw) return "¡La batalla terminó en empate!";
    if (overallWinner) return `¡${overallWinner.name} ha ganado la batalla!`;
    return "Batalla completada";
};
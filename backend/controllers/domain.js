const { data, error } = require("../wrapper");

const caughtPokemons = {}; // To store caught Pokemons and their nicknames
let fibonacciSequence = [0, 1]; // Start with 0 and 1

let myPokemon = [];

const catchPokemon = (req, res) => {
    try {
        const probability = Math.random();
        const success = probability < 0.5;
        let message = 'failed to catch pokemon';
        if (success) {
            myPokemon.push(req.body);
            message = 'congrats! you got the pokemon';
            return data(success, message, 200);
        }
        
        return data(success, message, 400);
    } catch (error) {
        return error(false, 'Internal Server Error', 500)
    }
};

const releasePokemon = (req, res) => {
    const primeCheck = Math.floor(Math.random() * 100) + 1;
    const isPrime = (num) => {
        for (let iteration = 2, squareroot = Math.sqrt(num); iteration <= squareroot; iteration++) {
            if (num % iteration === 0) return false;
        }
        return num > 1;
    };

    if (isPrime(primeCheck)) {
        delete caughtPokemons[req.body.nickname];
        res.json({ success: true, primeCheck });
    } else {
        res.json({ success: false, primeCheck });
    }
};

const renamePokemon = (req, res) => {
    const { oldNickname, newNickname } = req.body;
    const fibIndex = fibonacciSequence.length;

    caughtPokemons[newNickname] = caughtPokemons[oldNickname];
    delete caughtPokemons[oldNickname];

    if (fibIndex >= 2) {
        fibonacciSequence.push(fibonacciSequence[fibIndex - 1] + fibonacciSequence[fibIndex - 2]);
    }

    res.json({ renamedTo: `${newNickname}-${fibonacciSequence[fibIndex]}` });
};

module.exports = { catchPokemon, releasePokemon, renamePokemon };

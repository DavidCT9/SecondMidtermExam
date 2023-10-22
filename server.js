import express from "express";

const server = express();
const port = 3000;

server.use(express.static('public'));
server.set('view engine', 'ejs');

server.get('/', async (req, res) => {
    const { pokemon } = req.query;

    const random_pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${30 * Math.floor(Math.random() * 15)}`);
    const random_pokemons_json = await random_pokemons.json();

    const other_pokemons = [];

    for (let i = 0; i < 30; i++) {
        const curr = await fetch(random_pokemons_json.results[i].url);
        const curr_json = await curr.json();

        other_pokemons.push(curr_json);
    }

    if (pokemon !== undefined) {
        const pokemon_fetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const pokemon_json = await pokemon_fetch.json();
        res.render('index', {
            pokemon: pokemon_json,
            random_pokemons: other_pokemons,
        });
    }
    res.render('index', {
        random_pokemons: other_pokemons,
    });

})

server.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
});
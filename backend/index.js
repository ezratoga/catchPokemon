const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

const corsOpt = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(bodyParser.json());

const pokemonRouter = require('./routes/server');
app.use('/api/pokemon', pokemonRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
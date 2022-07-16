// dépendances
const rateLimit = require("express-rate-limit");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const helmet = require("helmet");
const app = express();
const routes = require('./routes/index.js');

// helmet pour la securité 
//app.use(helmet());

// cross origin ressource sharing
app.use(cors());

// morgan logger for developpement
app.use(morgan('combined'));
app.use(morgan('combined', { immediate: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// rate limit gere le nombre de requetes maximum à 100 pour 15min
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use("/api", apiLimiter, routes);

// renvoie des messages d'erreurs en cas de problemes 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.message,
    });
});

module.exports = app;
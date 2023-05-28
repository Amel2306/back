const http = require('http');
const cors = require("cors");
const WebSocket = require('ws').Server;

/*const wss = new WebSocket.Server({ port: 8080 });

/*wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});*/

// Empêche le programme de crasher en production, car il n'y pas dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app');
const sequelize = require('./config/database');

app.use(cors);

// Défini le port où le serveur écoutera les requêtes entrantes
const PORT = process.env.PORT || 4000;

// Charge les modelels de la base de données pour que Sequelize puisse les synchroniser
require('./models/Image');
require('./models/User');
require('./models/TypeRecette');
require('./models/Recette');

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync( );
        console.log('Database connection established and models synced.');

        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or sync models:', error);
    }
})();
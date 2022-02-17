'use strict';

const Hapi = require('hapi');
const path = require('path');
const routes = require("./routes");

const server = Hapi.Server({
	host: 'localhost',
	port: 8000,
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'frontend')
        }
    }
});

async function start() {
	try {
        await server.register(routes);
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log('Server running at:', server.info.uri);
}

start();
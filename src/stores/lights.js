// Dependencies
import { writable } from 'svelte/store';
import { io } from 'socket.io-client';
import { apiDomain } from '../lib/config';

// Keep track of previous lights
let previousLights = {};

// Create store
const lights = writable(0);

// Connect socket
const socket = io(apiDomain);

// Connect
socket.on('connect', () => {
	//debug(`Socket connect: ${socket.id}`);

	// Send initial request for lights
	socket.emit('lights:get');

	// Listen for events
	socket.on('lights', (data) => {
		if (!previousLights || previousLights.id !== data.id) {
			lights.set({
				...data,
				previous: previousLights
					? {
							...previousLights
					  }
					: null
			});
		}
	});
});

// Disconnect
socket.on('disconnect', () => {
	//debug('Socket disconnect');
});

// Export
export default lights;

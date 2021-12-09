/**
 * Utility functions
 */

import Chance from 'chance';
import { maxSpread } from './config';

// Spread pixels
function spreadColors(colors = [], lightCount, id, localMaxSpread = maxSpread) {
	// Amount of spread
	let chance = new Chance(`${id}-spread`);
	let spread = colors.length > 1 ? chance.integer({ min: 1, max: localMaxSpread }) : 1;

	// Keep track of colors
	let fullColors = [];

	// Fill in colors.  Probably a more efficient way to do this.
	let spreadPlace = 0;
	let colorPlace = 0;
	for (var i = 0; i < lightCount; i++) {
		fullColors[i] = colors[colorPlace];

		// Spread place used to know how many times to repeat the color place
		spreadPlace = spreadPlace === spread - 1 ? 0 : spreadPlace + 1;
		// When the spread place starts, increment the color.
		if (i > 0 || spread === 1) {
			colorPlace = spreadPlace === 0 ? colorPlace + 1 : colorPlace;
			colorPlace = colorPlace >= colors.length ? 0 : colorPlace;
		}
	}

	return fullColors;
}

export { spreadColors };

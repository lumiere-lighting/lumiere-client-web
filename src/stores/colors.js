// Dependencies
import { apiDomain } from '../lib/config';
import Fuse from 'fuse.js';

// Colors index
let colorsIndex = null;

// Load colors
async function loadColors() {
  // No need to do more than once
  if (colorsIndex !== null) {
    return colorsIndex;
  }

  try {
    const colorFetch = await fetch(`${apiDomain}/colors`, {
      method: 'GET'
    });
    const colors = (await colorFetch.json()).results;

    colorsIndex = new Fuse(colors, {
      includeScore: true,
      keys: ['name', 'id']
    });
  }
  catch (e) {
    console.error(e);

    // It's ok if we don't have colors
    return colorsIndex;
  }
}

export { colorsIndex, loadColors };


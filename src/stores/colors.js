// Dependencies
import { apiDomain } from '../lib/config';
// Flexsearch bundling is weird
// https://github.com/nextapps-de/flexsearch/issues/341
import flexsearch from 'flexsearch/dist/flexsearch.bundle';

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

    // Make index
    colorsIndex = new flexsearch.Document({
      tokenize: 'full',
      document: {
        id: 'id',
        index: ['name'],
        store: true,
      }
    });

    // Add documents
    colors.forEach((color) => {
      colorsIndex.add(color)
    });
  }
  catch (e) {
    console.error(e);

    // It's ok if we don't have colors
    return colorsIndex;
  }
}

export { colorsIndex, loadColors };


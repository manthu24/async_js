import { createRandomJSONFilesWithCallbacks, createRandomJSONFilesWithPromises, createRandomJSONFilesAsync } from './problem1';

  // Part 1: Using callbacks
  createRandomJSONFilesWithCallbacks((err) => {
    if (err) {
      console.error('Error creating JSON files with callbacks:', err);
      return;
    }

    console.log('JSON files created successfully with callbacks');
  });

  // Part 2: Using promises
  createRandomJSONFilesWithPromises()
    .then(() => {
      console.log('JSON files created successfully with promises');
    })
    .catch((err) => {
      console.error('Error creating JSON files with promises:', err);
    });

  // Part 3: Using async/await
  createRandomJSONFilesAsync()
    .then(() => {
      console.log('JSON files created successfully with async/await');
    })
    .catch((err) => {
      console.error('Error creating JSON files with async/await:', err);
    });

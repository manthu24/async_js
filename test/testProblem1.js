import { createRandomJSONFilesWithCallbacks, createRandomJSONFilesWithPromises, createRandomJSONFilesAsync } from './problem1';


  createRandomJSONFilesWithCallbacks((err) => {
    if (err) {
      console.error('Error creating JSON files with callbacks:', err);
      return;
    }

    console.log('JSON files created successfully with callbacks');
  });


  createRandomJSONFilesWithPromises()
    .then(() => {
      console.log('JSON files created successfully with promises');
    })
    .catch((err) => {
      console.error('Error creating JSON files with promises:', err);
    });


  createRandomJSONFilesAsync()
    .then(() => {
      console.log('JSON files created successfully with async/await');
    })
    .catch((err) => {
      console.error('Error creating JSON files with async/await:', err);
    });

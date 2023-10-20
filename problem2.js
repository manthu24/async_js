const fs = require('fs').promises;

// Function to read a file asynchronously
async function readFileAsync(filename) {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    return data;
  } catch (err) {
    throw err;
  }
}

// Function to write data to a file asynchronously
async function writeFileAsync(filename, data) {
  try {
    await fs.writeFile(filename, data, 'utf-8');
  } catch (err) {
    throw err;
  }
}

// Function to process and convert to uppercase
async function processAndWriteToUppercase() {
  try {
    const content = await readFileAsync('lipsum.txt');
    const uppercaseContent = content.toUpperCase();
    await writeFileAsync('uppercase.txt', uppercaseContent);
  } catch (err) {
    throw err;
  }
}

// Function to split content into sentences and write to separate files
async function splitContentAndWriteToFiles() {
  try {
    const content = await readFileAsync('uppercase.txt');
    const sentences = content.split('. ');
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const filename = `sentence_${i + 1}.txt`;
      await writeFileAsync(filename, sentence);
    }
  } catch (err) {
    throw err;
  }
}

// Function to read, sort, and write content to a new file
async function sortContentAndWriteToFile() {
  try {
    const filenames = await fs.readdir('.');
    const sentenceFiles = filenames.filter((filename) =>
      filename.startsWith('sentence_')
    );
    const sortedContent = sentenceFiles
      .map((filename) => fs.readFile(filename, 'utf-8'))
      .sort()
      .join('\n');

    await writeFileAsync('sorted.txt', sortedContent);
  } catch (err) {
    throw err;
  }
}

// Function to delete files mentioned in filenames.txt
async function deleteFilesAsync(filenames) {
  try {
    for (const filename of filenames) {
      await fs.unlink(filename);
    }
  } catch (err) {
    throw err;
  }
}


async function main() {
  try {
    await processAndWriteToUppercase();

    await splitContentAndWriteToFiles();

    await sortContentAndWriteToFile();

    const filenamesContent = await readFileAsync('filenames.txt');
    const filenamesToDelete = filenamesContent.split('\n').filter(Boolean);
    await deleteFilesAsync(filenamesToDelete);

    console.log('All tasks completed.');
  } catch (err) {
    console.error(err);
  }
}

main();

/* eslint-disable no-undef */
const fs = require('fs').promises;
const assert = require('assert');
const { processAndWriteToUppercase, splitContentAndWriteToFiles, sortContentAndWriteToFile, deleteFilesAsync } = require('./problem2');

// Test the processAndWriteToUppercase function
async function testUppercaseFunction() {
  await processAndWriteToUppercase();
  const uppercaseContent = await fs.readFile('uppercase.txt', 'utf-8');
  assert.strictEqual(uppercaseContent, 'YOUR EXPECTED UPPERCASE CONTENT');
  console.log('processAndWriteToUppercase test passed');
}

// Test the splitContentAndWriteToFiles function
async function testSplitContentFunction() {
  await splitContentAndWriteToFiles();
  const sentence1 = await fs.readFile('sentence_1.txt', 'utf-8');
  // Add more assertions for other sentences
  assert.strictEqual(sentence1, 'YOUR EXPECTED SENTENCE CONTENT');
  console.log('splitContentAndWriteToFiles test passed');
}

// Test the sortContentAndWriteToFile function
async function testSortContentFunction() {
  await sortContentAndWriteToFile();
  const sortedContent = await fs.readFile('sorted.txt', 'utf-8');
  assert.strictEqual(sortedContent, 'YOUR EXPECTED SORTED CONTENT');
  console.log('sortContentAndWriteToFile test passed');
}

// Test the deleteFilesAsync function
async function testDeleteFilesFunction() {
  // Create some test files to delete
  await fs.writeFile('test_file_1.txt', 'Test content 1', 'utf-8');
  await fs.writeFile('test_file_2.txt', 'Test content 2', 'utf-8');

  // Create a filenames.txt with these test files
  await fs.writeFile('filenames.txt', 'test_file_1.txt\ntest_file_2.txt', 'utf-8');

  // Delete the test files
  await deleteFilesAsync(['test_file_1.txt', 'test_file_2.txt']);

  // Check if the test files are deleted
  try {
    await fs.access('test_file_1.txt');
    assert.fail('File should not exist.');
  } catch (err) {
    // File should not exist
  }

  try {
    await fs.access('test_file_2.txt');
    assert.fail('File should not exist.');
  } catch (err) {
    // File should not exist
  }

  console.log('deleteFilesAsync test passed');
}

// Run the tests
async function runTests() {
  try {
    await testUppercaseFunction();
    await testSplitContentFunction();
    await testSortContentFunction();
    await testDeleteFilesFunction();
  } catch (err) {
    console.error('Test failed:', err.message);
  }
}

runTests();

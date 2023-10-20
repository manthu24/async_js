/* eslint-disable no-undef */
const fs = require('fs').promises;
const assert = require('assert');
const { processAndWriteToUppercase, splitContentAndWriteToFiles, sortContentAndWriteToFile, deleteFilesAsync } = require('./problem2');

async function testUppercaseFunction() {
  await processAndWriteToUppercase();
  const uppercaseContent = await fs.readFile('uppercase.txt', 'utf-8');
  assert.strictEqual(uppercaseContent, 'YOUR EXPECTED UPPERCASE CONTENT');
  console.log('processAndWriteToUppercase test passed');
}

async function testSplitContentFunction() {
  await splitContentAndWriteToFiles();
  const sentence1 = await fs.readFile('sentence_1.txt', 'utf-8');
  assert.strictEqual(sentence1, 'YOUR EXPECTED SENTENCE CONTENT');
  console.log('splitContentAndWriteToFiles test passed');
}

async function testSortContentFunction() {
  await sortContentAndWriteToFile();
  const sortedContent = await fs.readFile('sorted.txt', 'utf-8');
  assert.strictEqual(sortedContent, 'YOUR EXPECTED SORTED CONTENT');
  console.log('sortContentAndWriteToFile test passed');
}

async function testDeleteFilesFunction() {
  await fs.writeFile('test_file_1.txt', 'Test content 1', 'utf-8');
  await fs.writeFile('test_file_2.txt', 'Test content 2', 'utf-8');

  await fs.writeFile('filenames.txt', 'test_file_1.txt\ntest_file_2.txt', 'utf-8');

  await deleteFilesAsync(['test_file_1.txt', 'test_file_2.txt']);

  try {
    await fs.access('test_file_1.txt');
    assert.fail('File should not exist.');
  } catch (err) {
  }

  try {
    await fs.access('test_file_2.txt');
    assert.fail('File should not exist.');
  } catch (err) {
  }

  console.log('deleteFilesAsync test passed');
}

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

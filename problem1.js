/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Part 1: Implementing with callbacks and asynchronous functions
function createRandomJSONFilesWithCallbacks(callback) {
	const directoryPath = path.join(__dirname, 'data');
	fs.mkdir(directoryPath, (err) => {
		if (err) {
			callback(err);
			return;
		}

		const files = ['file1.json', 'file2.json', 'file3.json'];

		let count = 0;
		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);
			const randomData = { value: Math.random() };

			fs.writeFile(filePath, JSON.stringify(randomData), (err) => {
				if (err) {
					callback(err);
					return;
				}

				count++;
				if (count === files.length) {
					callback(null);
				}
			});
		});
	});
}

// Part 2: Implementing with callbacks and promises
function createRandomJSONFilesWithPromises() {
	const directoryPath = path.join(__dirname, 'data');
	return new Promise((resolve, reject) => {
		fs.mkdir(directoryPath, (err) => {
			if (err) {
				reject(err);
				return;
			}

			const files = ['file1.json', 'file2.json', 'file3.json'];
			const promises = files.map((file) => {
				const filePath = path.join(directoryPath, file);
				const randomData = { value: Math.random() };

				return new Promise((resolve, reject) => {
					fs.writeFile(filePath, JSON.stringify(randomData), (err) => {
						if (err) {
							reject(err);
							return;
						}
						resolve();
					});
				});
			});

			Promise.all(promises)
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	});
}

// Part 3: Implementing with async/await
async function createRandomJSONFilesAsync() {
	const directoryPath = path.join(__dirname, 'data');
	try {
		await fs.promises.mkdir(directoryPath);

		const files = ['file1.json', 'file2.json', 'file3.json'];
		for (const file of files) {
			const filePath = path.join(directoryPath, file);
			const randomData = { value: Math.random() };

			await fs.promises.writeFile(filePath, JSON.stringify(randomData));
		}
	} catch (err) {
		throw err;
	}
}



// Export all three functions
module.exports = {
	createRandomJSONFilesWithCallbacks,
	createRandomJSONFilesWithPromises,
	createRandomJSONFilesAsync,
};

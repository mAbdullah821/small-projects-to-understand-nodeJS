const fs = require('fs/promises');
const { END_LINE_PATTERN } = require('../utils/config');
const limitStringLength = require('../utils/limitStringLength');

const createFile = async (path) => {
  try {
    const fileHandler = await fs.open(path);
    fileHandler.close();
    console.error(`The file ${limitStringLength(path)} is already exists`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        // with the 'w' flag, the file will create if it does not exist
        const fileHandler = await fs.open(path, 'w');
        fileHandler.close();

        console.log(
          `The file ${limitStringLength(
            path
          )} created \x1b[32msuccessfully!\x1b[0m`
        );
      } catch (error) {
        console.error(`Error creating file: ${error}`);
      }
    } else {
      console.error(`Error opening file: ${err}`);
    }
  }
};

const deleteFile = async (path) => {
  try {
    await fs.unlink(path);
    console.log(
      `The file ${limitStringLength(
        path
      )} was deleted \x1b[32msuccessfully!\x1b[0m`
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`The file ${limitStringLength(path)} is not exists`);
    } else {
      console.error(`Error deleting file: ${err}`);
    }
  }
};

const renameFile = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
    console.log(
      `Renamed file from '${limitStringLength(
        oldPath
      )}' to '${limitStringLength(newPath)}' \x1b[32msuccessfully!\x1b[0m`
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`The file ${limitStringLength(err.path)} not found`);
    } else {
      console.error(`Error renaming file: ${err}`);
    }
  }
};

const addToFile = async (path, content) => {
  try {
    const fileHandler = await fs.open(path, 'a');
    await fileHandler.appendFile(content + END_LINE_PATTERN);
    fileHandler.close();
    console.log(
      `Content added \x1b[32msuccessfully!\x1b[0m to the file ${limitStringLength(
        path
      )}`
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`The file ${limitStringLength(path)} not found`);
    } else {
      console.error(`Error adding content to file: ${err}`);
    }
  }
};

module.exports = {
  createFile,
  deleteFile,
  renameFile,
  addToFile,
};

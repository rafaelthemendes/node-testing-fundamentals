const { readFile } = require("fs/promises");
const { join } = require("path");
const constants = require("./constants");
const User = require("./user");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);

    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);

    return File.parseCSVToJSON(content);
  }

  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath);
    return (await readFile(filename)).toString("utf-8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");

    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: constants.error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: constants.error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split("\n");

    const header = lines.shift().split(",");

    const list = lines.map((line) => {
      const columns = line.split(",");
      const data = {};
      columns.forEach((value, index) => {
        const field = header[index];
        data[field] = value;
      });
      return new User(data);
    });

    return list;
  }
}

module.exports = File;

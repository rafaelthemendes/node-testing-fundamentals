const { rejects, deepStrictEqual } = require("assert");
const constants = require("./constants");
const File = require("./file");

(async () => {
  {
    const filePath = "../mocks/emptyFile-invalid.csv";
    const rejection = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const promise = File.csvToJson(filePath);
    await rejects(promise, rejection);
  }

  {
    const filePath = "../mocks/fourItems-invalid.csv";
    const rejection = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const promise = File.csvToJson(filePath);
    await rejects(promise, rejection);
  }

  {
    const expected = [
      {
        name: "Mendes Experience",
        id: 1234,
        profession: "Senior Software Engineer Specialist",
        birthDay: 2004,
      },
      {
        name: "Mendez",
        id: 5678,
        profession: "Software Developer",
        birthDay: 1991,
      },
      {
        name: "Mendonza",
        id: 9012,
        profession: "Software Craftsman",
        birthDay: 1989,
      },
    ];
    const filePath = "../mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();

const sinon = require("sinon");
const Service = require("./service");
const { deepStrictEqual } = require("assert");
const mockTatooine = require("../mocks/tatooine.json");
const mockAlderaan = require("../mocks/alderaan.json");

const endpoint1 = "https://swapi.dev/api/planets/1/";
const endpoint2 = "https://swapi.dev/api/planets/2/";

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, "makeRequest");
  stub.withArgs(endpoint1).resolves(mockTatooine);
  stub.withArgs(endpoint2).resolves(mockAlderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearIn: 5,
    };
    const result = await service.getPlanets(endpoint1);
    deepStrictEqual(result, expected);
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearIn: 2,
    };
    const result = await service.getPlanets(endpoint2);
    deepStrictEqual(result, expected);
  }
})();

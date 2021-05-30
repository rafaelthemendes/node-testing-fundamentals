const https = require("https");

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }
  async getPlanets(url) {
    const data = await this.makeRequest(url);
    return {
      name: data.name,
      surfaceWater: data.surface_water,
      appearIn: data.films.length,
    };
  }
}

module.exports = Service;

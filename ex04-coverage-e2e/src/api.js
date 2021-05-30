const http = require("http");

const DEFAULT_CREDENTIALS = { username: "Mendes", password: "experience" };

const routes = {
  "/contact:get": (_, response) => {
    response.write("contact us!");
    return response.end();
  },
  "/login:post": async (request, response) => {
    for await (const data of request) {
      const { username, password } = JSON.parse(data);
      if (
        username === DEFAULT_CREDENTIALS.username &&
        password === DEFAULT_CREDENTIALS.password
      ) {
        response.write("login succeeded!");
        return response.end();
      }
      response.writeHead(401);
      response.write("login failed!");
      return response.end();
    }
  },
  default: (_, response) => {
    response.write("vish 404");
    return response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method}`.toLowerCase();
  const route = routes[routeKey] || routes.default;

  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  return route(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at", 3000));

module.exports = app;

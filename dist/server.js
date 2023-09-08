"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/infra/router/express/middlewares/error-middleware.ts
var errorHandlerMiddleware;
var init_error_middleware = __esm({
  "src/infra/router/express/middlewares/error-middleware.ts"() {
    "use strict";
    errorHandlerMiddleware = (err, req, res, next) => {
      console.log(err);
      res.status(err.status || 500);
      res.json({ message: err.message });
    };
  }
});

// src/infra/router/express/config/middleware.ts
function setupBeforeRequestMiddlewares(app2) {
  app2.use((0, import_express.json)());
  app2.use((0, import_morgan.default)("dev"));
  app2.use((0, import_cors.default)({
    origin: "*",
    allowedHeaders: "*",
    methods: "*"
  }));
}
function setupAfterRequestMiddlewares(app2) {
  app2.use(errorHandlerMiddleware);
}
var import_express, import_morgan, import_cors;
var init_middleware = __esm({
  "src/infra/router/express/config/middleware.ts"() {
    "use strict";
    import_express = require("express");
    import_morgan = __toESM(require("morgan"));
    import_cors = __toESM(require("cors"));
    init_error_middleware();
  }
});

// src/infra/router/express/config/routes.ts
function setupRoutes(app2) {
  const router = (0, import_express2.Router)();
  app2.use("/api", router);
  (0, import_node_fs.readdirSync)(`${__dirname}/../routes`).map((file) => __async(this, null, function* () {
    if (!file.includes(".test")) {
      (yield import(`../routes/${file}`)).register(router);
    }
  }));
}
var import_express2, import_node_fs;
var init_routes = __esm({
  "src/infra/router/express/config/routes.ts"() {
    "use strict";
    import_express2 = require("express");
    import_node_fs = require("fs");
  }
});

// src/infra/router/express/config/app.ts
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
var import_express3, app, app_default;
var init_app = __esm({
  "src/infra/router/express/config/app.ts"() {
    "use strict";
    import_express3 = __toESM(require("express"));
    init_middleware();
    init_routes();
    app = (0, import_express3.default)();
    setupBeforeRequestMiddlewares(app);
    setupRoutes(app);
    setupAfterRequestMiddlewares(app);
    app_default = app;
  }
});

// src/infra/database/typeorm/index.ts
var import_typeorm2 = require("typeorm");

// src/infra/database/typeorm/entity/user.ts
var import_typeorm = require("typeorm");
var User = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)()
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    length: 100
  })
], User.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    length: 256,
    unique: true
  })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    length: 20
  })
], User.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    length: 11
  })
], User.prototype, "cpf", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    length: 20
  })
], User.prototype, "phone", 2);
User = __decorateClass([
  (0, import_typeorm.Entity)()
], User);

// src/infra/database/typeorm/index.ts
var AppDataSource = new import_typeorm2.DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: "./database/database.sqlite",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: []
});

// src/server.ts
AppDataSource.initialize().then(() => __async(exports, null, function* () {
  const PORT = process.env.PORT || 8080;
  const app2 = (yield Promise.resolve().then(() => (init_app(), app_exports))).default;
  app2.listen(PORT, () => console.log(`O servidor est\xE1 rodando na porta: ${PORT}`));
})).catch(console.error);

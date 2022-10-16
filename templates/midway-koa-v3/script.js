const { spawnSync } = require("node:child_process");
const { changePackageJson } = require("../common/utils");
const fse = require("fs-extra");
const path = require("path");

const { PROJECT_PATH } = process.env;

//创建项目
spawnSync(`cd ${PROJECT_PATH} && npm init midway -- --type=koa-v3 server`, { stdio: "inherit", shell: true });

//将文件覆盖进去
fse.copySync(path.join(__dirname, "api.controller.ts"), `${PROJECT_PATH}/server/src/controller/api.controller.ts`);
fse.copySync(path.join(__dirname, "configuration.ts"), `${PROJECT_PATH}/server/src/configuration.ts`);
fse.copySync(path.join(__dirname, "../common/bridge.ts"), `${PROJECT_PATH}/server/src/bridge.ts`);
fse.copySync(path.join(__dirname, "next-bridge.middleware.ts"), `${PROJECT_PATH}/server/src/middleware/next-bridge.middleware.ts`);
changePackageJson(`${PROJECT_PATH}/server/package.json`, "server");
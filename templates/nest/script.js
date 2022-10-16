const { spawnSync } = require("node:child_process");
const { changePackageJson } = require("../common/utils");
const fse = require("fs-extra");
const path = require("path");

const { PROJECT_PATH } = process.env;

//创建项目
spawnSync(`cd ${PROJECT_PATH} && npx @nestjs/cli new server -p yarn`, { stdio: "inherit", shell: true });

//将文件覆盖进去
fse.copySync(`${path.join(__dirname, "main.ts")}`, `${PROJECT_PATH}/server/src/main.ts`);
fse.copySync(`${path.join(__dirname, "app.controller.ts")}`, `${PROJECT_PATH}/server/src/app.controller.ts`);
fse.copySync(`${path.join(__dirname, "../common/bridge.ts")}`, `${PROJECT_PATH}/server/src/bridge.ts`);
changePackageJson(`${PROJECT_PATH}/server/package.json`, "server");

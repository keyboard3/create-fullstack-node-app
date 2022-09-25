const { spawnSync } = require("node:child_process");
const { changePackageJson } = require("../common/utils");
const path = require("path");
const projectPath = process.env.appPath;
//创建项目
spawnSync(`cd ${projectPath} && npm init midway -- --type=koa-v3 server`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cp ${path.join(__dirname, "api.controller.ts")} ${projectPath}/server/src/controller/`, { stdio: "inherit", shell: true });
spawnSync(`cp \
${path.join(__dirname, "configuration.ts")} \
${path.join(__dirname, "../common/bridge.ts")} \
${projectPath}/server/src/`, { stdio: "inherit", shell: true });
spawnSync(`cp ${path.join(__dirname, "next-bridge.middleware.ts")} ${projectPath}/server/src/middleware/`, { stdio: "inherit", shell: true });
changePackageJson(`${projectPath}/server/package.json`, projectPath + "-server");
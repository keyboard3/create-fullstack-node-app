const { spawnSync } = require("node:child_process");
const { changePackageJson } = require("../common/utils");
const path = require("path");
const projectPath = process.env.appPath;
//创建项目
spawnSync(`cd ${projectPath} && nest new server`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cp \
${path.join(__dirname, "main.ts")} \
${path.join(__dirname, "app.controller.ts")} \
${path.join(__dirname, "../common/bridge.ts")} \
${projectPath}/server/src/`, { stdio: "inherit", shell: true });

changePackageJson(`${projectPath}/server/package.json`, projectPath + "-server");
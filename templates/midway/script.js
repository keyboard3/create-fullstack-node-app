const { spawnSync } = require("node:child_process");
const changePackageJson = require("../../helpers/change-package");
const projectPath = process.env.appPath;
//创建项目
spawnSync(`cd ${projectPath} && npm init midway -- --type=koa-v3 server`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cp ./templates/midway/api.controller.ts ${projectPath}/server/src/controller/`, { stdio: "inherit", shell: true });
spawnSync(`cp \
./templates/midway/configuration.ts \
./templates/common/bridge.ts \
${projectPath}/server/src/`, { stdio: "inherit", shell: true });
spawnSync(`cp ./templates/midway/next-bridge.middleware.ts ${projectPath}/server/src/middleware/`, { stdio: "inherit", shell: true });
changePackageJson(`${projectPath}/server/package.json`, projectPath);
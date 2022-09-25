const { spawnSync } = require("node:child_process");
const changePackageJson = require("../../helpers/change-package");
const projectPath = process.env.appPath;
//创建项目
spawnSync(`cd ${projectPath} && git clone https://github.com/nestjs/typescript-starter.git server`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cp \
./templates/nest/main.ts \
./templates/nest/app.controller.ts \
./templates/common/bridge.ts \
${projectPath}/server/src/`, { stdio: "inherit", shell: true });

changePackageJson(`${projectPath}/server/package.json`, projectPath);
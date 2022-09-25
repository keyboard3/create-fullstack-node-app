const { spawnSync } = require("node:child_process");
const changePackageJson = require("../../helpers/change-package");

const projectPath = process.env.appPath;
//创建项目
spawnSync(`cd ${projectPath} && npx create-next-app@latest --typescript render`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cd ${projectPath} && mv render/node_modules ./ && mv render/yarn.lock ./`, { stdio: "inherit", shell: true });
spawnSync(`cp ./templates/next/index.js ${projectPath}/render/`, { stdio: "inherit", shell: true });
spawnSync(`cp ./templates/next/page.tsx ${projectPath}/render/pages/index.tsx`, { stdio: "inherit", shell: true });

changePackageJson(`${projectPath}/render/package.json`, projectPath);
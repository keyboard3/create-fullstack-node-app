const { spawnSync } = require("node:child_process");
const { changePackageJson } = require("../common/utils");
const path = require("path");

const projectPath = process.env.appPath;
//创建项目
spawnSync(`cd ${projectPath} && npx create-next-app@latest --typescript render`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cd ${projectPath} && mv render/node_modules ./ && mv render/yarn.lock ./`, { stdio: "inherit", shell: true });
spawnSync(`cp ${path.join(__dirname, "index.js")} ${projectPath}/render/`, { stdio: "inherit", shell: true });
spawnSync(`cp ${path.join(__dirname, "page.tsx")} ${projectPath}/render/pages/index.tsx`, { stdio: "inherit", shell: true });

changePackageJson(`${projectPath}/render/package.json`, projectPath + "-render");
const { spawnSync } = require("node:child_process");
const { changePackageJson } = require("../common/utils");
const path = require("path");
const fse = require("fs-extra");

const { PROJECT_PATH, PACKAGE_NAME } = process.env;

//创建项目
spawnSync(`cd ${PROJECT_PATH} && npx create-next-app@latest --typescript render`,{ stdio: "inherit", shell: true });

//将文件覆盖进去
fse.copySync(`${path.join(__dirname, "index.js")}`,`${PROJECT_PATH}/render/index.js`);
fse.copySync(`${path.join(__dirname, "page.tsx")}`,`${PROJECT_PATH}/render/pages/index.tsx`);

changePackageJson(`${PROJECT_PATH}/render/package.json`,PACKAGE_NAME + "-render");

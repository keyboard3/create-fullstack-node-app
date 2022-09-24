import { spawnSync } from "child_process";
import path from "path";
const projectPath = path.resolve(__dirname, "../../test");
//创建项目
spawnSync(`cd ${projectPath} && npx create-next-app@latest --typescript render`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cd ${projectPath} && mv render/node_modules ./ && mv render/yarn.lock ./`, { stdio: "inherit", shell: true });
spawnSync(`cd ${projectPath} && cp ../templates/next/index.js render/`, { stdio: "inherit", shell: true });
spawnSync(`cd ${projectPath} && cp ../templates/next/page.tsx render/pages/index.tsx`, { stdio: "inherit", shell: true });
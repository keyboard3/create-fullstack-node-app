import { spawnSync } from "child_process";
import path from "path";
const projectPath = path.resolve(__dirname, "../../test");
//创建项目
spawnSync(`cd ${projectPath} && git clone https://github.com/nestjs/typescript-starter.git server`, { stdio: "inherit", shell: true });

//将文件覆盖进去
spawnSync(`cd ${projectPath} && cp ../templates/nest/main.ts server/src/`, { stdio: "inherit", shell: true });
spawnSync(`cd ${projectPath} && cp ../templates/common/bridge.ts server/src/`, { stdio: "inherit", shell: true });
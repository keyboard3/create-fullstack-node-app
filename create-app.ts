import { spawnSync } from "child_process";
import path from "path";
const projectPath = path.resolve(__dirname);
function createApp() {
  spawnSync("ts-node ./templates/next/script.ts", { stdio: "inherit", shell: true });
  spawnSync("ts-node ./templates/nest/script.ts", { stdio: "inherit", shell: true });
  spawnSync(`cp -r ${projectPath}/templates/project/* test`, { stdio: "inherit", shell: true })
  spawnSync(`cd test && yarn`, { stdio: "inherit", shell: true })
}
createApp();
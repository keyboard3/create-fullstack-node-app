import { spawnSync } from "child_process";

export async function createApp(config: { packageName: string, appPath: string, packageManager: string, render: string, server: string }) {
  const { render, server, packageManager, packageName, appPath: projectPath } = config;
  spawnSync(`mkdir -p ${projectPath}`, { stdio: "inherit", shell: true });
  spawnSync(`export appPath=${projectPath} && node ./templates/${render}/script.js`, { stdio: "inherit", shell: true });
  spawnSync(`export appPath=${projectPath} && node ./templates/${server}/script.js`, { stdio: "inherit", shell: true });
  spawnSync(`cp -r ./templates/project/* ${projectPath}`, { stdio: "inherit", shell: true })
  spawnSync(`cd ${projectPath} && ${packageManager} install`, { stdio: "inherit", shell: true })
}

export class DownloadError extends Error { }
import { spawnSync } from "child_process";
const { changePackageJson } = require("./templates/common/utils")
const path = require("path");

export async function createApp(config: { packageName: string, appPath: string, packageManager: string, render: string, server: string }) {
  const { render, server, packageManager, appPath: projectPath } = config;
  spawnSync(`mkdir -p ${projectPath}`, { stdio: "inherit", shell: true });
  spawnSync(`export appPath=${projectPath} && node ${path.join(__dirname, `./templates/${render}/script.js`)}`, { stdio: "inherit", shell: true });
  spawnSync(`export appPath=${projectPath} && node ${path.join(__dirname, `./templates/${server}/script.js`)}`, { stdio: "inherit", shell: true });
  spawnSync(`cp \
  ${path.join(__dirname, `./templates/project/*`)} \
  ${path.join(__dirname, `./templates/${server}/package.json`)} \
  ${projectPath}`, { stdio: "inherit", shell: true })

  changePackageJson(`${projectPath}/package.json`, projectPath);
  spawnSync(`cd ${projectPath} && ${packageManager} install`, { stdio: "inherit", shell: true })
}

export class DownloadError extends Error { }
import { spawnSync } from "child_process";
const { changePackageJson } = require("./templates/common/utils")
const path = require("path");
import { copySync } from 'fs-extra'

export async function createApp(config: { packageName: string, appPath: string, packageManager: string, render: string, server: string }) {
  const { render, server, packageName, appPath: projectPath } = config;

  copySync(path.join(__dirname, `./templates/project`), projectPath)
  copySync(path.join(__dirname, `./templates/${server}/package.json`), `${projectPath}/package.json`)

  changePackageJson(`${projectPath}/package.json`, packageName);

  spawnSync(`node ${path.join(__dirname, `./templates/${render}/script.js`)}`, { stdio: "inherit", shell: true, env: { PROJECT_PATH: projectPath, PACKAGE_NAME: packageName, ...process.env } });
  spawnSync(`node ${path.join(__dirname, `./templates/${server}/script.js`)}`, { stdio: "inherit", shell: true, env: { PROJECT_PATH: projectPath, PACKAGE_NAME: packageName, ...process.env } });
}

export class DownloadError extends Error { }
#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
import prompts from 'prompts'
import fs from 'node:fs'
import path from 'node:path'
import {
  blue,
  red,
  reset,
  yellow
} from 'kolorist'
import minimist from 'minimist'
import { createApp } from "./create-app";

const argv = minimist<{
  t?: string
}>(process.argv.slice(1), { string: ['_'] })
const cwd = process.cwd()

const defaultTargetDir = 'fullstack-node-app'

async function init() {
  const argTargetDir = formatTargetDir(argv._[1])

  let targetDir = argTargetDir || defaultTargetDir

  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'render' | 'server'
  >

  try {
    result = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: targetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir
        }
      },
      {
        type: () => !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
        name: 'overwrite',
        message: () =>
          (targetDir === '.'
            ? 'Current directory'
            : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`
      },
      {
        type: (_, { overwrite }: { overwrite?: boolean }) => {
          if (overwrite === false) {
            throw new Error(red('✖') + ' Operation cancelled')
          }
          return null
        },
        name: 'overwriteChecker'
      },
      {
        type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
        name: 'packageName',
        message: reset('Package name:'),
        initial: () => toValidPackageName(getProjectName()),
        validate: (dir) =>
          isValidPackageName(dir) || 'Invalid package.json name'
      },
      {
        type: "select",
        name: "render",
        message: "Render SSR Framework",
        initial: 0,
        choices: [
          {
            title: yellow("Next.js"),
            value: "next"
          }
        ]
      },
      {
        type: "select",
        name: "server",
        message: "Server Api Framework",
        initial: 0,
        choices: [
          {
            title: yellow("Nest.js"),
            value: "nest"
          },
          {
            title: blue("Midway.js(koa-v3)"),
            value: "midway-koa-v3"
          }
        ]
      }
    ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      });

    // user choice associated with prompts
    const { render, overwrite, server } = result

    const root = path.join(cwd, targetDir)

    if (overwrite) {
      emptyDir(root)
    } else if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true })
    }

    createApp({ packageName: targetDir, appPath: root, packageManager: "yarn", render, server })
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }
};
init();

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}
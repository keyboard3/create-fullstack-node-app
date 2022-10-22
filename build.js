const { spawnSync } = require("child_process");
const fse = require("fs-extra");
const fs = require("fs")
spawnSync(`esbuild index.ts --bundle --outfile=dist/index.js --platform=node`, {
  stdio: "inherit",
  shell: true,
});

fse.copySync(`${__dirname}/templates`, `${__dirname}/dist/templates`);

const dirs = fs.readdirSync(`${__dirname}/dist/templates`)
dirs.forEach(dir => {
  const scriptFilename = `${__dirname}/dist/templates/${dir}/script.js`
  if (fs.existsSync(scriptFilename)) {
    spawnSync(`esbuild ${scriptFilename} --bundle --outfile=${scriptFilename} --platform=node --allow-overwrite`, {
      stdio: "inherit",
      shell: true,
    });
  }
})
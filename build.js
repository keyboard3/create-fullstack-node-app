const { spawnSync } = require("child_process");
const fse = require("fs-extra");
spawnSync(`esbuild index.ts --bundle --outfile=dist/index.js --platform=node`, {
  stdio: "inherit",
  shell: true,
});

fse.copySync(`${__dirname}/templates`, `${__dirname}/dist/templates`);

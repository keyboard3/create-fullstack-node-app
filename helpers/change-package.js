const fs = require("fs");

function changePackageJson(packagePath, dirPath) {
  try {
    const packageName = dirPath.slice(dirPath.lastIndexOf("/") + 1);
    let packageJson = String(fs.readFileSync(packagePath));
    packageJson = packageJson.replace(/"name":\s*".+"/, `"name": "${packageName}"`);
    fs.writeFileSync(packagePath, packageJson);
  } catch (err) {
    console.error(err);
  }
}

module.exports = changePackageJson;
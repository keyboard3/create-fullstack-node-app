const fs = require("fs");
const path = require("path");

function changePackageJson(packagePath, packageName) {
  try {
    let packageJson = String(fs.readFileSync(packagePath));
    packageJson = packageJson.replace(/"name":\s*".+"/, `"name": "${packageName}"`);
    fs.writeFileSync(packagePath, packageJson);
  } catch (err) {
    console.error(err);
  }
}
function getCorrectPath(filePath) {
  return path.join(__dirname, filePath);
}
module.exports = {
  changePackageJson,
  getCorrectPath
};
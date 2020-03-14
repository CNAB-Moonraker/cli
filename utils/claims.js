const { readdir, readFile } = require('fs');
const { promisify } = require('util');
const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const path = require('path');
const fs = require('fs');
const os = require('os');

const moonrakerDir = path.resolve(os.homedir(), '.moonraker');

let resources = [];
if (fs.existsSync(moonrakerDir)){
    const data = fs.readFileSync(path.resolve(moonrakerDir, 'config.json'));
    resources = JSON.parse(data).resources || [];
}

async function getLocalClaims(directory, resource) {
    const claims = [];
    try {
        const files = await readdirAsync(directory, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile() && file.name.endsWith("json")) {
                const claim = await readFileAsync(
                    path.resolve(directory, file.name)
                );
                claims.push(JSON.parse(claim.toString()));
            }
        }
    } catch (error) {
      console.log(`Could not find claims for resource: ${resource}`)
    }
    
    return claims;
}


async function getClaims() {
  const data = {};
    await resources.forEach(async resource => {
        let resourceName = resource["name"];
        let resourcePath = resource["claims_location"];
        let resourceFullPath = resourcePath.replace('~',os.homedir())
        try {
            data[resourceName] = await getLocalClaims(resourceFullPath, resourceName);
        } catch (error) {
            console.error(error);
            data[resourceName] = `Unable to retrieve ${resourceName} claims.`;
        }
    
      });
    return data;
}


module.exports = {
    getClaims
}
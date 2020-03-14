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

    return {resource, claims};
}


async function getClaims() {
  const data = {};
    let promises = [];
    resources.forEach( (resource) => {
        let resourceName = resource["name"];
        let resourcePath = resource["claims_location"];
        let resourceFullPath = resourcePath.replace('~',os.homedir())
            promises.push(getLocalClaims(resourceFullPath, resourceName));
    })
    const result = await Promise.all(promises);
    return result.reduce((acc, curr) => {
        acc[curr.resource] = curr.claims;
        return acc;
    },{})

    return data;
};


module.exports = {
    getClaims
}
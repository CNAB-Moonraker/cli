const { spawn } = require("child_process");
const path = require('path');
const os = require('os');
const fs = require('fs');
var Git = require("nodegit");
const moonrakerDir = path.resolve(os.homedir(), '.moonraker')
const webDir = path.resolve(moonrakerDir, 'web')

function setup() {
  if (!fs.existsSync(moonrakerDir)){
    console.log('Creating .moonraker')
    fs.mkdirSync(moonrakerDir);
    // create config file, set webDistFolder to front-end build folder
    const data = JSON.stringify({
      "webDistFolder": "web/dist"
    })
    console.log('Creating config.json');
    fs.writeFileSync(path.resolve(moonrakerDir, 'config.json'), data);
  }

  if (!fs.existsSync(webDir)){
    console.log('Cloning Dashboard')
    Git.Clone("https://github.com/CNAB-Moonraker/dashboard-vue", webDir)
    .then((repository) => {
      console.log("Installing Dashboard Dependencies...")
      const install = spawn("npm", ["install"], {cwd: webDir})
      
      install.on('error', (error) => {
        console.log(`error: ${error.message}`);
      });
          
      install.on("close", code => {
        console.log('install complete')
        if (code === 0) {
          console.log("Dashboard Dependency Install Complete")
          console.log("Building Dashboard...")
          const build = spawn("npm", ["run", "build"], {cwd: webDir})
          build.on('error', (error) => {
            console.log(`error: ${error.message}`);
          });
          
          build.on("close", code => {
            if(code === 0) {
              console.log("Dashboard Build Complete")
            }
          });
        }
      });
    });
  }
}

module.exports = setup
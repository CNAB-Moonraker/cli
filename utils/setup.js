const path = require('path');
const os = require('os');
var Git = require("nodegit");

function setup() {
  Git.Clone("https://github.com/CNAB-Moonraker/dashboard-vue", path.resolve(os.homedir(), '.moonraker/web')).then(function(repository) {
    // Work with the repository object here.
    // run the build command
  });
  
}

module.exports = setup
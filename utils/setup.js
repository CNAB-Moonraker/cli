const { spawn } = require("child_process")
const path = require('path')
const os = require('os')
const fs = require('fs')
const moonrakerDir = path.resolve(os.homedir(), '.moonraker')
const webDir = path.resolve(moonrakerDir, 'web')


function setup() {
  if (!fs.existsSync(moonrakerDir)) {
    console.log('Creating .moonraker')
    fs.mkdirSync(moonrakerDir)

    const data = JSON.stringify({
      "webDistFolder": "web/dist",
      "resources": [
        {
          "name": "porter",
          "claims_location": "~/.porter/claims"
        },
        {
          "name": "duffle",
          "claims_location": "~/.duffle/claims"
        },
        {
          "name": "docker-app",
          "claims_location": "~/.docker/app/installations/claims"
        }
      ]
    })
    console.log('Creating config.json')
    fs.writeFileSync(path.resolve(moonrakerDir, 'config.json'), data)
  }

  if (!fs.existsSync(webDir)) {
    console.log('Cloning Dashboard...')

    const clone = spawn("git", ["clone", "https://github.com/CNAB-Moonraker/dashboard-vue", webDir], { cwd: moonrakerDir })
    clone.on("close", code => {
      if (code === 0) {
        console.log('Clone complete.')
        console.log('Installing dashboard dependencies...')
        //TODO: Add some sort of buffer signal in the CLI 

        const install = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ["i"], { cwd: webDir })

        install.stdout.setEncoding(`utf8`)
        install.stdout.on('data', console.log)

        install.on('error', (error) => {
          console.error(`Error: ${error.message}`)
        })

        install.on("close", code => {
          if (code === 0) {
            console.log("Dashboard Dependency Install Complete")
            console.log("Building Dashboard...")
            const build = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ["run", "build"], { cwd: webDir })

            build.stdout.setEncoding(`utf8`)
            build.stdout.on('data', console.log)

            build.on('error', (error) => {
              console.log(`Error: ${error.message}`)
            })

            build.on("close", code => {
              if (code === 0) {
                console.clear()
                console.log("Dashboard Build Complete")
                console.log(`Moonraker Dashboard is ready to serve using the command: \`moonraker run\``)
              }
            })
          }
        })
      }
    })
  }
}

module.exports = setup
#!/usr/bin/env node

const path = require('path')
const shelljs = require('shelljs')

const { DIST_IMAGES, BUILD_ARGS, SERVICE_NAME } = require('./constants')

const ROOT_DIR = path.join(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')

;(() => {
    for (const [distName, { version: SERVICE_VERSION }] of Object.entries(DIST_IMAGES)) {
        /**
         * if DIST_TAG is given only build that specific dist
         */
        if (process.env.DIST_TAG && process.env.DIST_TAG !== distName) {
            continue
        }

        const buildArgs = Object.entries({ SERVICE_VERSION, ...BUILD_ARGS }).map(
            ([name, arg]) => `--build-arg ${name}=${arg}`)

        const dockerfile = path.join(DIST_DIR, distName, 'Dockerfile')
        const cmd = `docker build -f ${dockerfile} -t "${SERVICE_NAME}:${distName}" ${buildArgs.join(' ')} .`

        console.log(`> ${cmd}`)

        /**
         * don't run anything if `--dry-run` is applied as parameter
         */
        if (process.argv.includes('--dry-run')) {
            console.log('Just a dry run!')
            continue
        }
        
        shelljs.cd(path.join(DIST_DIR, distName))
        shelljs.exec(cmd)
    }
})()
#!/usr/bin/env node

const path = require('path')
const shelljs = require('shelljs')

const { DIST_IMAGES, BUILD_ARGS, SERVICE_NAME } = require('./constants')

const ROOT_DIR = path.join(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')

;(() => {
    /**
     * if DIST_TAG is not given exit with error.
     */
    if (!process.env.DIST_TAG) {
        console.error('Please provide a DIST_TAG environment variable')
        process.exit(1)
    }

    for (const [distName, { version: SERVICE_VERSION, tags: SERVICE_TAGS }] of Object.entries(DIST_IMAGES)) {
        if (process.env.DIST_TAG !== distName) {
            continue
        }

        const dockerfile = path.join(DIST_DIR, distName, 'Dockerfile')

        const extraTags = SERVICE_TAGS.map(
            tag => `-t ${SERVICE_NAME}:${tag}`).join(' ')

        const buildArgs = Object.entries({ SERVICE_VERSION, ...BUILD_ARGS }).map(
            ([name, arg]) => `--build-arg ${name}=${arg}`).join(' ')

        const cmd = `docker build -f ${dockerfile} -t "${SERVICE_NAME}:${distName}" ${extraTags} ${buildArgs} .`
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

        if (shelljs.error()) {
            process.exit(1)
        }
    }
})()
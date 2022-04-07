#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const shelljs = require('shelljs')

const { DIST_IMAGES, ...SERVICE_CONSTANTS } = require('./constants')

const ROOT_DIR = path.join(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const DOCKERFILE_TPL = fs.readFileSync(path.join(__dirname, 'templates', 'Dockerfile.tpl.ejs'), 'utf8')
const SC_CONFIG_TPL = fs.readFileSync(path.join(__dirname, 'templates', 'sc-default.tpl.ejs'), 'utf8')
const ENTRYPOINT_SH = path.join(__dirname, 'files', 'entrypoint.sh')

;(() => {
    shelljs.mkdir(DIST_DIR)
    
    for (const [distName, { from, version: SERVICE_VERSION }] of Object.entries(DIST_IMAGES)) {
        /**
         * if DIST_TAG is given only build that specific dist
         */
        if (process.env.DIST_TAG && process.env.DIST_TAG !== distName) {
            continue
        }

        const buildArgs = { from, SERVICE_VERSION, ...SERVICE_CONSTANTS }
        const buildOpts = { delimiter: '?' }
        const dockerfile = ejs.render(DOCKERFILE_TPL, buildArgs, buildOpts)
        const sc_config = ejs.render(SC_CONFIG_TPL, { SERVICE_VERSION }, buildOpts)

        const imageDir = path.join(DIST_DIR, distName)
        shelljs.mkdir(imageDir)
        fs.writeFileSync(path.join(imageDir, 'Dockerfile'), dockerfile)
        fs.writeFileSync(path.join(imageDir, 'sc.yaml'), sc_config)
        fs.copyFileSync(ENTRYPOINT_SH, path.join(imageDir, 'entrypoint.sh'))
    }
})()

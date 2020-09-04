#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const shelljs = require('shelljs')

const { DIST_IMAGES, ...SERVICE_CONSTANTS } = require('./constants')

const ROOT_DIR = path.join(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const DOCKERFILE_TPL = fs.readFileSync(path.join(__dirname, 'templates', 'Dockerfile.tpl.ejs'), 'utf8')
const ENTRYPOINT_TPL = fs.readFileSync(path.join(__dirname, 'templates', 'entrypoint.tpl.ejs'), 'utf8')

;(() => {
    shelljs.mkdir(DIST_DIR)
    
    for (const [distName, { from, version: SERVICE_VERSION }] of Object.entries(DIST_IMAGES)) {
        const buildArgs = { from, SERVICE_VERSION, ...SERVICE_CONSTANTS }
        const buildOpts = { delimiter: '?' }
        const dockerfile = ejs.render(DOCKERFILE_TPL, buildArgs, buildOpts)
        const entrypoint = ejs.render(ENTRYPOINT_TPL, buildArgs, buildOpts)

        const imageDir = path.join(DIST_DIR, distName)
        shelljs.mkdir(imageDir)
        fs.writeFileSync(path.join(imageDir, 'Dockerfile'), dockerfile)
        fs.writeFileSync(path.join(imageDir, 'entrypoint.sh'), entrypoint)
    }
})()
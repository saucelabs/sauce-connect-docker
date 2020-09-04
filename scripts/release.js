#!/usr/bin/env node

const shelljs = require('shelljs')

const { DIST_IMAGES, SERVICE_NAME } = require('./constants')

;(() => {
    for (const [distName] of Object.entries(DIST_IMAGES)) {
        const cmd = `docker push ${SERVICE_NAME}:${distName}`
        shelljs.exec(cmd)
    }
})()
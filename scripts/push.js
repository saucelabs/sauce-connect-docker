#!/usr/bin/env node

const shelljs = require('shelljs')

const {DIST_IMAGES, SERVICE_NAME} = require('./constants')

;(() => {
    /**
     * if DIST_TAG is not given exit with error.
     */
    if (!process.env.DIST_TAG) {
        console.error('Please provide a DIST_TAG environment variable')
        process.exit(1)
    }


    for (const [distName, {tags: SERVICE_TAGS}] of Object.entries(DIST_IMAGES)) {
        if (process.env.DIST_TAG !== distName) {
            continue
        }

        pushImage(distName)
        SERVICE_TAGS.forEach(pushImage)
    }
})()

function pushImage(tag) {
    console.log(`> docker push ${SERVICE_NAME}:${tag}`)

    shelljs.exec(`docker push ${SERVICE_NAME}:${tag}`)

    if (shelljs.error()) {
        process.exit(1)
    }
}

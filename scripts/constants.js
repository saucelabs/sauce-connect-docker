const SERVICE_NAME = 'saucelabs/sauce-connect'
const SERVICE_HOST = '0.0.0.0'
const SERVICE_PORT = '22'
const SERVICE_HOME = `/srv/${SERVICE_NAME}`
const DIST_IMAGES = {
    '4.9.1-ubuntu-22.04': {
        version: '4.9.1',
        from: 'ubuntu:22.04',
        tags: ['latest', '4.9.1', '4.9']
    },
    '4.9.1-alpine-glibc': {
        version: '4.9.1',
        from: 'frolvlad/alpine-glibc:alpine-3.17_glibc-2.34',
        tags: ['4.9-alpine-glibc']
    },
    '4.9.0-ubuntu-22.04': {
        version: '4.9.0',
        from: 'ubuntu:22.04',
        tags: ['4.9.0']
    },
    '4.9.0-alpine-glibc': {
        version: '4.9.0',
        from: 'frolvlad/alpine-glibc:alpine-3.17_glibc-2.34',
    },

    // Legacy versions

    '4.8.3-ubuntu-22.04': {
        version: '4.8.3',
        from: 'ubuntu:22.04',
        tags: ['4.8.3', '4.8']
    },
    '4.8.3-alpine-glibc': {
        version: '4.8.3',
        from: 'frolvlad/alpine-glibc:alpine-3.17_glibc-2.34',
        tags: ['4.8-alpine-glibc']
    },
    '4.8.3': {
        version: '4.8.3',
        from: 'ubuntu:22.04'
    },
    '4.8.2-ubuntu-22.04': {
        version: '4.8.2',
        from: 'ubuntu:22.04'
    },
    '4.8.2-alpine-glibc': {
        version: '4.8.2',
        from: 'frolvlad/alpine-glibc:alpine-3.17_glibc-2.34'
    },
    '4.8.2': {
        version: '4.8.2',
        from: 'ubuntu:22.04'
    },
    '4.8.1-ubuntu-22.04': {
        version: '4.8.1',
        from: 'ubuntu:22.04'
    },
    '4.8.1': {
        version: '4.8.1',
        from: 'ubuntu:20.04'
    },
    '4.8.1-centos': {
        version: '4.8.1',
        from: 'centos:centos7'
    },
    '4.8.1-suse-15': {
        version: '4.8.1',
        from: 'opensuse/leap:15'
    },
    '4.8.1-alpine-glibc': {
        version: '4.8.1',
        from: 'frolvlad/alpine-glibc:alpine-3.14_glibc-2.33'
    },
    '4.8.0': {
        version: '4.8.0',
        from: 'ubuntu:20.04'
    },
    '4.8.0-alpine-glibc': {
        version: '4.8.0',
        from: 'frolvlad/alpine-glibc:alpine-3.14_glibc-2.33'
    },
    '4.7.1': {
        version: '4.7.1',
        from: 'ubuntu:20.04'
    },
    '4.7.1-alpine-glibc': {
        version: '4.7.1',
        from: 'frolvlad/alpine-glibc:alpine-3.14_glibc-2.33'
    },
    '4.7.0': {
        version: '4.7.0',
        from: 'ubuntu:20.04'
    },
    '4.7.0-alpine-glibc': {
        version: '4.7.0',
        from: 'frolvlad/alpine-glibc:alpine-3.14_glibc-2.33'
    }
}
const BUILD_ARGS = { SERVICE_NAME, SERVICE_HOST, SERVICE_PORT, SERVICE_HOME }

module.exports = {
    SERVICE_NAME,
    SERVICE_HOST,
    SERVICE_PORT,
    SERVICE_HOME,
    DIST_IMAGES,
    BUILD_ARGS
}

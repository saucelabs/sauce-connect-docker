const SERVICE_NAME = 'saucelabs/sauce-connect'
const SERVICE_HOST = '0.0.0.0'
const SERVICE_PORT = '22'
const SERVICE_HOME = `/srv/${SERVICE_NAME}`
const DIST_IMAGES = {
    'latest': {
        version: '4.7.1',
        from: 'ubuntu:20.04'
    },
    '4.8.0-dev': {
        version: '4.8.0-dev',
        from: 'ubuntu:20.04'
    },
    '4.8.0-dev-centos': {
        version: '4.8.0-dev',
        from: 'centos:centos7'
    },
    '4.8.0-dev-suse-15': {
        version: '4.8.0-dev',
        from: 'opensuse/leap:15'
    },
    '4.8.0-dev-alpine-glibc': {
        version: '4.8.0-dev',
        from: 'frolvlad/alpine-glibc'
    },
    '4.7.1': {
        version: '4.7.1',
        from: 'ubuntu:20.04'
    },
    '4.7.1-alpine-glibc': {
        version: '4.7.1',
        from: 'frolvlad/alpine-glibc'
    },
    '4.7.0': {
        version: '4.7.0',
        from: 'ubuntu:20.04'
    },
    '4.7.0-alpine-glibc': {
        version: '4.7.0',
        from: 'frolvlad/alpine-glibc'
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

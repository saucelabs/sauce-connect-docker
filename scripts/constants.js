const SERVICE_NAME = 'saucelabs/sauce-connect'
const SERVICE_HOST = '0.0.0.0'
const SERVICE_PORT = '22'
const SERVICE_HOME = `/srv/${SERVICE_NAME}`
const DIST_IMAGES = {
    'latest': {
        version: '4.8.1',
        from: 'ubuntu:22.04'
    },
    '4.8.2-rc0-ubuntu-22.04': {
        version: '4.8.2-rc0',
        from: 'ubuntu:22.04'
    },
    '4.8.2-rc0': {
        version: '4.8.2-rc0',
        from: 'ubuntu:20.04'
    },
    '4.8.2-rc0-centos': {
        version: '4.8.2-rc0',
        from: 'centos:centos7'
    },
    '4.8.2-rc0-suse-15': {
        version: '4.8.2-rc0',
        from: 'opensuse/leap:15'
    },
    '4.8.2-rc0-alpine-glibc': {
        version: '4.8.2-rc0',
        from: 'frolvlad/alpine-glibc:alpine-3.16_glibc-2.34'
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

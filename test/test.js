const assert = require('assert')
const { remote } = require('webdriverio')
const request = require('request');
const waitOn = require('wait-on');
const fs = require('fs');
const path = require('path');
const readinessURL = 'http://localhost:8032/readiness'
const statusURL = 'http://localhost:8032/api/v1/status'
const readyFile = '/tmp/sc.ready'
var opts = {
  resources: [readinessURL],
  delay: 50000, // initial delay in ms
  interval: 500, // poll interval in ms
  simultaneous: 1, // limit to 1 connection per resource at a time
  timeout: 30000, // timeout in ms
  tcpTimeout: 1000, // tcp timeout in ms, default 300ms
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  }
}

function checkExistsWithTimeout(filePath, timeout) {
    return new Promise(function (resolve, reject) {

        var timer = setTimeout(function () {
            watcher.close()
            reject(new Error('File did not exists and was not created during the timeout.'))
        }, timeout)

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer)
                watcher.close()
                resolve()
            }
        })

        var dir = path.dirname(filePath)
        var basename = path.basename(filePath)
        var watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer)
                watcher.close()
                console.log('File exists', filePath)
                resolve()
            }
        })
    })
}

(async () => {

    if (process.env.DIST_TAG && process.env.DIST_TAG.includes('4.8.')) {
        await waitOn(opts);
        console.log("checking status for SC version", process.env.DIST_TAG);
        request({url: statusURL, json: true }, (err, res, body) => {
        assert.equal(err, null)
        console.log("Sauce Connect status %j", body);
        assert.ok(body.tunnelStatus.includes('connected'), JSON.stringify(body))
        })
    } else {
        await checkExistsWithTimeout(readyFile, opts.timeout)
    }
    const browser = await remote({
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        capabilities: {
            browserName: 'chrome',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            'sauce:options': {
                tunnelName: `sc-${process.env.DIST_TAG}-${process.env.GITHUB_RUN_NUMBER}`,
                name:`Sauce Connect Docker Test (#${process.env.GITHUB_RUN_NUMBER})`,
                build: `Sauce Connect Docker (${process.env.GITHUB_REF})`
            }
        }
    })

    await browser.url('http://localhost:8080/')

    const heading = await browser.$('h1')
    const text = await heading.getText()

    await browser.deleteSession()
    assert.equal(text, 'Sauce Connect Success!')
    
    console.log('Success!')
})().catch((err) => {
    console.error(err)
    process.exit(1)
})

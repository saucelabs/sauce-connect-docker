const assert = require('assert')
const { remote } = require('webdriverio')
const request = require('request');

;(async () => {
    if (process.env.DIST_TAG.includes('4.8.')) {
        console.log("checking status for SC version", process.env.DIST_TAG);
        request({url: 'http://localhost:8032/api/v1/status', json: true }, (err, res, body) => {
        assert.equal(err, null)
        console.log("Sauce Connect status %j", body);
        assert.ok(body.tunnelStatus.includes('connected'), JSON.stringify(body))
        })
    } else {
        console.log("not checking status for SC version", process.env.DIST_TAG);
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
})().catch(() => {
    process.exit(1)
})

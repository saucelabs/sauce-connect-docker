const assert = require('assert')
const { remote } = require('webdriverio')

;(async () => {
    const browser = await remote({
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        capabilities: {
            browserName: 'chrome',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            'sauce:options': {
                tunnelIdentifier: `sc-${process.env.GITHUB_RUN_NUMBER}`,
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
})()
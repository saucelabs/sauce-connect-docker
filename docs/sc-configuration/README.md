# SauceConnect Proxy configuration via YAML file

SauceConnect Proxy can be started with `--config-file` option pointing to a configuration file.
YAML configuration may contain any SauceConnect Proxy CLI flag.
See [an example config file](./config.yaml).

## Example for SauceConnect Proxy configured via YAML file

```sh
$ cat /tmp/sc.yaml
---
rest-url: "https://api.us-west-1.saucelabs.com/rest/v1"
api-key: "<YOUR API KEY>"
user: "<YOUR USERNAME>"
no-remove-colliding-tunnels: true
logfile: "-"
tunnel-identifier: "my-tunnel"

$ sc -config-file /tmp/sc.yaml
```

# SauceConnect Proxy configuration via enviroment variables

SauceConnect Proxy supports setting CLI options via environment variables.
See [an incomplete list of the available environment variables](./env).

## Example for running SauceConnect Proxy configured via environment variables

```sh
$ cat /tmp/sc.env
export SAUCE_REST_URL="https://api.us-west-1.saucelabs.com/rest/v1"
export SAUCE_USER="<YOUR USERNAME>"
export SAUCE_API_KEY="<YOUR API KEY>"
export SAUCE_NO_REMOVE_COLLIDING_TUNNELS=TRUE
export SAUCE_LOGFILE="-"
export SAUCE_TUNNEL_IDENTIFIER="my-tunnel"

$ source /tmp/sc.env
$ sc
```

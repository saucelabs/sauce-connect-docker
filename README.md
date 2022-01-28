Sauce Connect Docker
====================

Sauce Connect Docker App lets you easily run [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect) within the confines of a [Docker](https://www.docker.com/) container on any system that supports Docker.

## Supported tags

- 4.7.1, 4.7.1-alpine-glibc, latest
- 4.7.0, 4.7.0-alpine-glibc
- 4.6.5, 4.6.5-alpine-glibc
- 4.6.4, 4.6.4-alpine-glibc
- 4.6.3, 4.6.3-alpine-glibc
- 4.6.2, 4.6.2-alpine-glibc

## Running

Before we can run the container you need to pull it from [Docker Hub](https://hub.docker.com/r/saucelabs/sauce-connect):

```sh
$ docker pull saucelabs/sauce-connect
```

This will pull the latest version of Sauce Connect which we recommend to use. You can always specify a specific tag (see [supported tags](#supported-tags)). To run the image, execute:

```sh
$ export SAUCE_USERNAME="my-user"
$ export SAUCE_ACCESS_KEY="my-access-key"
docker run \
    -e SAUCE_USERNAME=${SAUCE_USERNAME} \
    -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} \
    --network="host" \
    -it saucelabs/sauce-connect
```

Additional arguments may be specified as you would normally do with Sauce Connect. Ensure you have `--network="host"` set as argument otherwise Sauce Connect within the Docker container can not access your local services in the host machine.

### Sauce Connect Setup Leveraging High Availability

[High Availability Sauce Connect Proxy Setup](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/high-availability/) enables you to run tests using multiple Sauce Connect
tunnels and run multiple tunnels grouped together as a tunnel pool, which will be treated as single tunnel.
Pools are ideal for running 200 or more parallel tests (high concurrency) because tunnel capacity is limited by a single TCP Connection.


To leverage tunnel pools add `--tunnel-pool` option to your command and start multiple container with the same tunnel identifier:

```sh
# tunnel #1
$ docker run \
    -e SAUCE_USERNAME=${SAUCE_USERNAME} \
    -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} \
    --network="host" \
    -it saucelabs/sauce-connect \
    --tunnel-pool \
    --tunnel-name sc-tunnel-pool &

# tunnel #2
docker run \
    -e SAUCE_USERNAME=${SAUCE_USERNAME} \
    -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} \
    --network="host" \
    -it saucelabs/sauce-connect \
    --tunnel-pool \
    --tunnel-name sc-tunnel-pool
```

For more information on high availability Sauce Connect Proxy setup, please check out [the docs](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/high-availability).

### Using SauceConnect Config file

SauceConnect allows to define [YAML config file](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/yaml-config/) that will contain your configuration.
YAML config file may contain username, access key, etc... See [SauceConnect documentation](https://docs.saucelabs.com/dev/cli/sauce-connect-proxy) for all the options.
This Docker image comes with [config file](./scripts/files/sc-default.yaml) but it could be replaced with a custom one.

Follow the following steps to use your config file with the docker container.

1. Create a config file with all the required options, for example

```sh
$ cat /path/to/sc.yaml
---
region: "us-west"
api-key: "<MY API KEY>"
user: "<MY USERNAME>"
tunnel-pool: true
logfile: "-"
tunnel-name: "my-tunnel"
```

2. Start the container with docker `-v` option (mount the config file into a container) and SC `--config-file` option

```sh
docker run \
    --network="host" \
    -v /path/to/sc.yaml:/tmp/sc.yaml \
    -it saucelabs/sauce-connect \
    --config-file /tmp/sc.yaml
```

### Additional configuration

See [this README](./docs/sc-configuration/README.md) for the documentation of SauceConnect configuration via environment variables or YAML file.

## CI Example

If you want to run this Docker image as part of your CI/CD pipeline, you can run the following steps:

1. __Create "wait-for-sc.sh" file__

   To ensure we only continue our pipeline once Sauce Connect is fully connected, we need a simple shell script that waits for Sauce Connect to be ready:
   ```sh
   # wait-for-sc.sh
   until [ -f /tmp/sc.ready ]
   do
       sleep 5
   done
   echo "SC ready"
   exit
   ```

1. __Pull docker image__
   ```sh
   $ docker pull saucelabs/sauce-connect
   ```

1. __Start Sauce Connect__

   It is important that you mount a temporary folder so that `wait-for-sc.sh` can detect when Sauce Connect has launched.
   Also make sure that you set `--network="host"` to allow Sauce Connect to access your application in the host machine.
   ```sh
   $ docker run \
       -e SAUCE_USERNAME=${SAUCE_USERNAME} \
       -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} \
       -v /tmp:/tmp \
       --network="host" \
       -t saucelabs/sauce-connect:latest \
       -f /tmp/sc.ready \
       -i some-identifier &
    $ ./wait-for-sc.sh
    ```

Have a look into the GitHub Actions pipeline for [this repository](https://github.com/saucelabs/sauce-connect-docker/blob/master/.github/workflows/pipeline.yml). If you use GitHub Actions you can just make use of our [GitHub Actions Integration](https://github.com/saucelabs/sauce-connect-action).

## Quick reference

- __Maintained by__: the [Open Source Program Office](https://opensource.saucelabs.com/) at Sauce Labs
- __Where to get help__: the [Sauce Labs Community Hub](https://community.saucelabs.com), the [GitHub Issue](https://github.com/saucelabs/sauce-connect-docker/issues/new), or Stack Overflow
- __GitHub Repository__: [saucelabs/sauce-connect-docker](https://github.com/saucelabs/sauce-connect-docker)

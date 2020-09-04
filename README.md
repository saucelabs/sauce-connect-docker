Sauce Connect Docker
====================

Sauce Connect Docker App lets you easily run sauce-connect within the confines of a docker container on any system that supports Docker. 

## Build

This repository uses [Node.js](https://nodejs.org/en/) to build the Docker templates for various image variations. Why? Because why not!

```sh
$ npm run build
```

All image distributions are defined in [`/scripts/constant.js`](https://github.com/saucelabs/sauce-connect-docker/blob/5591268e7ce7f00a7cf8bf82846ba065f30fbdb1/scripts/constants.js#L5). You can also build a specific dist by setting a `DIST_TAG` enviroment variable:

```sh
DIST_TAG=4.6.2 npm run build
```

You will see all flavors of this image being generated in the `dist` directory.

## Running

To run the image (once build), execute:

```sh
$ export SAUCE_USERNAME="my-user"
$ export SAUCE_ACCESS_KEY="my-access-key"
docker run \
    -e SAUCE_USERNAME=${SAUCE_USERNAME} \
    -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} \
    --network="host" \
    -it saucelabs/sauce-connect:<tag>
```

...where `<tag>` is the version you've build. Additional arguments may be specified as you would normally do with sauce-connect. Ensure you have `--network="host"` set as argument otherwise Sauce Connect within the Docker container can not access your local service in the host machine.

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

   It is important that you mount a temp folder so that `wait-for-sc.sh` can detect when Sauce Connect has launched. Also make sure that you set `--network="host"` to allow Sauce Connect to access your application in the host machine.
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
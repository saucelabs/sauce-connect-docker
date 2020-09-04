Sauce Connect Docker
====================

Sauce Connect Docker App lets you easily run sauce-connect within the confines of a docker container on any system that supports Docker. 

## Build

This repository uses [Node.js](https://nodejs.org/en/) to build the Docker templates for various image variations. Why? Because why not!

```sh
$ npm run build
```

You will see all flavors of this image being generated in the `dist` directory.

## Running

To run the image (once build), execute:

```sh
$ export SAUCE_USERNAME="my-user"
$ export SAUCE_ACCESS_KEY="my-access-key"
docker run -e SAUCE_USERNAME=${SAUCE_USERNAME} -e SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} -it saucelabs/sauce-connect:<tag>
```

...where `<tag>` is the version you've build. Additional arguments may be specified as you would normally do with sauce-connect

## Examples

### Logging
Specifying -l /tmp/file.log will create a file called "file.log" in the current directory

```sh
$ ./sc.sh -l /tmp/sc.log
```

### Ready File
Specifying -f /tmp/sc.ready will create a ready file called "sc.ready" in the current directory

```sh
$ ./sc.sh -f /tmp/sc.ready
```

## Caveats
- /tmp in the container is mapped into the current directory so that logs and pid files can be easily accessed. Sauce Connect will default to creating temporary and log files in /tmp, therfore not specifying those options will create files in the current directory anyway.

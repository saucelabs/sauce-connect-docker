# Sauce Connect Docker App

Sauce Connect Docker App lets you easily run sauce-connect within the confines of a docker container on any system that supports Docker. 

## Building
```sh
$ ./docker-build.sh
```

## Running
```sh
$ export SAUCE_USERNAME="my-user"
$ export SAUCE_ACCESS_KEY="my-access-key"
$ ./sc.sh -i mytunnel
```

Additional arguments may be specified as you would normally do with sauce-connect

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

## Updating
Updating is as simple as changing the $SERVICE_VERSION in service.env and issuing a docker-build.sh

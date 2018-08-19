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

## Caveats
- /tmp in the container is mapped into the current directory so that logs and pid files can be easily accessed

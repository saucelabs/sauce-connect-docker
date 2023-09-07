## Orchestrating Sauce Connect Proxy With Docker Compose

> :warning: **Docker Compose is not the best tool for container orchestration in production. It's highly recommended to consider using other tools, such as Kubernetes,
> or public cloud provider specific, such as AWS ECS, etc.**

If you need a Sauce Connect Proxy service running indefinitely using Docker Compose, the [./docker-compose](.docker-compose.yaml) file shows how to set up a Sauce Connect pool.

The example uses the following Docker Compose flags:

- `--scale sauce-connect=<pool size>` will define the number of Sauce Connect Proxy instances.
- `--no-log-prefix` will configure Docker Compose to not prepend Sauce Connect Proxy stdout with the container name

 See the [Docker Compose documentation](https://docs.docker.com/engine/reference/commandline/compose_up/) for more info.

The example uses the following environment variables:

- `SAUCE_REGION` - Sauce Labs region, one of us-west, eu-central, etc.
- `SAUCE_TUNNEL_NAME` - Sauce Connect Tunnel Pool name
- `SAUCE_USERNAME` - Sauce Labs username
- `SAUCE_ACCESS_KEY` - Sauce Labs access key

See the [Sauce Connect documentation](https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/) for more environment variables

Sauce Connect Proxy logs are not persisted in this example.

```sh
SAUCE_USERNAME=foo SAUCE_ACCESS_KEY=xxxx SAUCE_TUNNEL_NAME=my-eu-pool SAUCE_REGION=eu-central docker-compose up --no-log-prefix --pull always --scale sauce-connect=2
…
INFO: Adding tunnel to pool 'my-eu-pool', now running 1 instance.

Sauce Connect runtime information:
- Name: my-eu-pool
- PID: 9
- PID file: /tmp/sc_client-my-eu-pool.pid
- Log file: /tmp/persistent-eu-proxy1.log
- SCProxy Port: 34479
- Status Port: 8032
- Selenium listener: None
- External proxy: None
- Tunnel proxy: None
- Region: eu-central

INFO: Adding tunnel to pool 'my-eu-pool', now running 2 instance.

Sauce Connect runtime information:
- Name: my-eu-pool
- PID: 9
- PID file: /tmp/sc_client-my-eu-pool.pid
- Log file: /tmp/persistent-eu-proxy1.log
- SCProxy Port: 40931
- Status Port: 8032
- Selenium listener: None
- External proxy: None
- Tunnel proxy: None
- Region: eu-central

Secure remote tunnel provisioned. Tunnel ID: 19b29ff9a6f14ba6b7b605043b4dd09d
Secure remote tunnel provisioned. Tunnel ID: 1786f1603cad49dfbf26be11b9e6ccfd
Sauce Connect is up, you may start your tests.
```

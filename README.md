TODO: things that need to be implemented

- cache the post code request result
- add circuit breaker for external request
- add E2E and Unit test
- it's better to handle external request in a `worker` to avoid blocking the server, by using packages like `piscina`

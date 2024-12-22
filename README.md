### BimebBazar/AutoAbzar - Assignment

#### Features

- **CQRS** architecture for clear separation of concerns
- **Linter** for both **Code** and **Commit** consistency
- **NGINX** as a **Reverse Proxy** and **Load Balancer**
- **Swagger** for API documentation
- **Docker** and **Docker Compose** for **Containerization** and **Replication**
- Abstraction layer for **Entities** and **Repositories**

#### TODO

**Pending improvements:**

- Cache results of post-code requests
- Store user request history asynchronously using a queue
- Add a circuit breaker for external requests
- Implement E2E and Unit tests
- Exclude unnecessary properties in the response (e.g., `created_on`, `updated_on`, `id`)
- Handle external requests in a `worker` to prevent server blocking, using tools like `piscina`

**Note**: I kept the implementation simple to ensure timely delivery. Many details, such as more advanced TypeORM configurations, tests, and caching, still need to be addressed.

#### Installation

- Install [Docker and Docker Compose](https://www.docker.com/)

#### Start Development Mode (hot-reload)

```bash
docker compose up dev --build

```

##### Start For Production

```bash
docker compose up nginx --build -d
```

##### Documentations

Access the API documentation at http://localhost:3000/docs.
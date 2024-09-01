# Taberuu core Nestjs

Aplicación backend para cartas virtuales de restaurantes.

## Tech Stack

**Server:**

- Nestjs
- Fastify
- Postgres
- Drizzle
- Jest
- Pino
- Joi
- Fastify-Pino
- Nestjs-Pino

## Run Locally

### Docker compose

Para levantar el entorno de desarrollo (docker container) con las bases de datos y sus gestores UI debemos ejecutar el
siguiente comando.

```bash
docker-compose up -d
```

> [!IMPORTANT]  
> Si utilizas pgadmin para administrar la base de datos, debes establecer `postres` como el host de la base de datos.
> Para otros gestores de bases de datos como Datagrip debes establecer `localhost` como el host de la base de datos.

Para apagar el entorno de desarrollo (docker container) ejecuta el siguiente comando.

```bash
docker-compose down
```

### Variables de entorno

El archivo .env contiene las siguientes variables de entorno que deberá configurar.
La configuración siguiente es la que se utilizará normalmente en desarrollo local.

`NODE_ENV=DEVELOPMENT`
`PORT=3000`
`DATABASE_USER=postgres`
`DATABASE_PASSWORD=postgres`
`DATABASE_HOST=localhost`
`DATABASE_PORT=5432`
`DATABASE_NAME=taberuu_db`

### Levantar proyecto

1. **Clona el proyecto**
    ```bash
    git clone FrankVillachicaGaspar/taberuu-core-nestjs
    ```

2. **Go to the project directory**
    ```bash
    cd taberuu-core-nestjs
    ```

3. **Install pnpm globally**
    ```bash
    npm install -g pnpm
    ```

4. **Install dependencies**
    ```bash
    pnpm install
    ```

5. **Migrate database**
    ```bash
    pnpm db-migrate
    ```
   > [!IMPORTANT]  
   > Antes de migrar la base de datos debemos crear el archivo .env con las varables de entorno de desarrollo indicadas
   en el apartado [Variables de entorno](#variables-de-entorno).

6. **Start the server**
    ```bash
    pnpm start:dev
    ```

### Poblar la base de datos

Una vez levantado el proyecto deberá hacer una petición a la siguiente ruta.

```text
GET /seed/populate
```

## Running Tests

### Unit tests

Para ejecutar los test unitarios, ejecuta el siguiente comando.

```bash
pnpm test
```

### Test coverage

Para ejecutar los test de cobertura, ejecuta el siguiente comando.

```bash
pnpm test:cov
```

> [!NOTE]
> - Al realizar un commit se ejecutarán los test automáticamente.
> - La cobertura de los test se puede ver en el archivo coverage/lcov-report/index.html.
> - El porcentaje de cobertura permitido es del 80% para statements, lines y functions.
> - El porcentaje de cobertura perimitodo es del 70% para branches.

## Development

Existen algunas consideraciones que deben tenerse en cuenta al desarrollar este proyecto.

### Create branch

Para crear una nueva rama debemos seguir la siguiente convención.

```plaintext
feat/issue-number (features)

bug/issue-number (bug fixes)

release/vX.X.X (releases)
```

### Commits

Antes de realizar un commit se ejecutarán ciertas validaciones (Husky).

- Linter
- Formatter
- Build
- Unit tests
- Coverage tests

Los mensajes de commit deben seguir la siguiente convención.

```plaintext
gitmoji (branch-name): commit-message
Exeample: 🐛 (bug/123): fix bug
```

> [!NOTE]  
> El emoji es opcional, pero si usamos el emoji en el mensaje de commit, debemos seguir la siguiente convención:
>
> [🌐Gitmoji website](https://gitmoji.dev/)

> [!IMPORTANT]  
> El mensaje de commmit debe ser lo más descriptivo y conciso posible.

## Resources

Una lista de recursos que puedes estudiar y que se implementaron en el desarrollo de este proyecto.

- [Clean architecture in Nestjs](https://www.youtube.com/watch?v=4_4p5Ojs5XA)
- [Testing in Nestjs](https://www.tomray.dev/nestjs-unit-testing)

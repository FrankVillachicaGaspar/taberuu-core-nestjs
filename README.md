# Taberuu core Nestjs

Aplicación backend para cartas virtuales de restaurantes.

## Tech Stack

**Server:** Nestjs, .Net

## Run Locally

### Docker compose

Para levantar el entorno de desarrollo (docker container) con las bases de datos y sus gestores UI debemos ejecutar el siguiente comando.

```bash
docker-compose up -d
```

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

Clona el proyecto

```bash
  git clone FrankVillachicaGaspar/taberuu-core-nestjs
```

Go to the project directory

```bash
  cd taberuu-core-nestjs
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm start:dev
```

### Poblar la base de datos

Una vez levantado el proyecto deberá hacer una petición a la siguiente ruta.

```text
GET /seed/populate
```

## Running Tests

To run tests, run the following command

```bash
  pnpm test
```

> [!NOTE]  
> Al realizar un commit se ejecutarán los test automáticamente.

## Resources

Una lista de recursos que puedes estudiar y que se implementaron en el desarrollo de este proyecto.

- [Clean architecture in Nestjs](https://www.youtube.com/watch?v=4_4p5Ojs5XA)
- [Testing in Nestjs](https://www.tomray.dev/nestjs-unit-testing)

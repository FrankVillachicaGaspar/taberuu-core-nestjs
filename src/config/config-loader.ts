export const configLoader = () => {
  return {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.DATABASE_PORT,
    dbName: process.env.DATABASE_NAME,
  };
};

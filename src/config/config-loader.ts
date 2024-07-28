export const configLoader = () => {
  return {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
  };
};

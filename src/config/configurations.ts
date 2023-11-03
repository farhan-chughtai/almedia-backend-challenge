export default () => {
  const database = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrationsRun: false,
    autoLoadEntities: true,
    logging: true,
    entities: ['dist/src/**/*.entity.js'],
  };

  return {
    PORT: parseInt(process.env.PORT, 10),
    database,
  };
};

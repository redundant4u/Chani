module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['./dist/entities/*.entity{.ts,/.js}'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/database/migrations',
  },
};

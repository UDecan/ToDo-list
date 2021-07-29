module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'todoDB',
      user: 'postgres',
      password: 'root',
      host: 'localhost',
      port: '5432',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'todoDB',
      user: 'postgres',
      password: 'root',
      port: '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: `${process.env.DATABASE_URL}?ssl=true`,
      ssl: {
        rejectUnauthorized: false,
      }
    },
    pool: {
      min: 0,
      max: 15
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
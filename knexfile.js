module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'todoDB',
      user: 'postgres',
      password: 'root',
      host: 'localhost',
      port: '5432',
      database: 'todoDB'
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
  }
}
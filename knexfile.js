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
      host: 'ec2-54-195-76-73.eu-west-1.compute.amazonaws.com',
      database: 'd9j8oc32nodit8',
      user: 'ajbzgtaahqjmtq',
      password: 'bd14d5f386b8af03ce13ff649a2f63a05fe8528198d714c2a883f3e0ae655832',
      port: '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    ssl: {
      rejectUnauthorized: false,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
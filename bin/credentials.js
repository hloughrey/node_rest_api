let Pool = require('pg').Pool;

module.exports = {
  mongo: {
    host: 'localhost',
    port: 27017,
    database: 'books'
  },
  postgres: {
    host: '',
    database: '',
    user: '',
    password: ''
  },
  createPgresConnectionPool: function() {
    let config = {
      host: this.postgres.host,
      database: this.postgres.database,
      user: this.postgres.user,
      password: this.postgres.password
    };

    process.on('unhandledRejection', (e) => {
      console.log(e.message, e.stack);
    })

    return new Pool(config);

  }

}

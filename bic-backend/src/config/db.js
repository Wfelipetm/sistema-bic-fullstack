const { Pool } = require('pg');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  host: '10.200.200.187',
  port: 5432,
  database: 'bic',
  user: 'postgres',
  password: 'B10m3Tr1@',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// pool.on('connect', () => {
//   console.log('Conectado ao banco de dados PostgreSQL');
// });

module.exports = {
  query: (text, params) => pool.query(text, params),
};

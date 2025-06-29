const { Pool } = require("pg")
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
//   maxLifetimeSeconds: 60
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};
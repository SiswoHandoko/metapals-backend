// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { env = {} } = process;
const {
  dialect = 'postgres',
  NODE_ENV: nodeEnv = 'development',
  POSTGRE_USER_MASTER: username,
  POSTGRE_PASS_MASTER: password,
  POSTGRE_HOST_MASTER: host,
  POSTGRE_PORT_MASTER: port,
  POSTGRE_DB_MASTER: database
} = env;

module.exports = {
  [nodeEnv]: {
    dialect,
    username,
    password,
    host,
    port,
    database,
    migrationStorageTableName: `_migrations`
  }
};
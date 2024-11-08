const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'restore-client',
  location: 'asia-east1'
};
exports.connectorConfig = connectorConfig;


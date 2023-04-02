module.exports = {
  apps : [{
    name   : "node-admin",
    script : "./app.js",
    env_production: {
      NODE_ENV: 'production',
      EGG_SERVER_ENV: 'prod'
    }
  }]
}

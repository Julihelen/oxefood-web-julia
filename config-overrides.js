// config-overrides.js
module.exports = function override(config, env) {
    if (env === 'development') {
      // Desativa o overlay de erro
      config.devServer.overlay = false;
    }
    return config;
  };
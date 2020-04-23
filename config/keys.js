// Heroku adds an environment variable by default. It’s called NODE_ENV and it’s set to production.
// So, what we’ll do is check for the variable and load the according config file.
// if process.env.NODE_ENV equals 'production'.
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod.js');
} else
    module.exports = require('./dev');
// The right set of keys will be loaded based on the node environment variable.
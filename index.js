const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

require('./routes/routes.js')(app);




const port = process.env.PORT || 5000;
app.listen(port);
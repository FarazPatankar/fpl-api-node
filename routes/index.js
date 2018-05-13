
var express = require('express');
var app = express();

var FplApiRouter = require('../dist/routes/index');

app.use('/api', FplApiRouter.routes());

app.listen(3000);

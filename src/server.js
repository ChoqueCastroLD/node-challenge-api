const dotenv = require('dotenv');
dotenv.load();

const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const Koa = require('koa');
const router = require('./routes/router.js');
const { errorHandler } = require('./middlewares/errorHandler.js');

const app = new Koa();

// Middlewares
app.use(errorHandler());
app.use(bodyParser());
if (!module.parent) {
    app.use(logger());
}
app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
}


module.exports = app;
const Koa = require('koa');
const koaapp = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
// @ts-ignore
const onerror = require('koa-onerror');
const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(koaapp);

// middlewares
koaapp.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}));
koaapp.use(json());
koaapp.use(logger());
koaapp.use(require('koa-static')(__dirname + '/../public'));
koaapp.use(require('koa-static')(__dirname + '/../maptool'));

koaapp.use(views(__dirname + './../views', {
    extension: 'html',
}));


const maptool = require('./utils/maptool');


// const test = async () => {
//     const testurl = 'http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x=218543&y=108023&z=18&s=Galil';
//     const httputil = require('./utils/http');
//     const filetool = require('./utils/file');
//     const path = require('path');
//     const body = 
//     // filetool.WriteFile('test.png', body);
// };
// setTimeout(test, 1000);

// logger
koaapp.use(async (ctx, next) => {
    const start: any = new Date();
    await next();
    const now: any = new Date();

    const paths = ctx.url.split('/');
    if (paths[1] === 'mapdata' && ctx.response.status === 404) {
        console.log('get server data');
        const data = await maptool.GetMapData(paths[3], paths[4].split('.')[0], paths[2]);
        ctx.res.writeHeader(200, { 'Context-Type': 'image/png' });
        ctx.res.end(data);
    }

    const ms: any = now.getMilliseconds() - start.getMilliseconds();
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.state}`);
    console.log(`url: ${ctx.url} - method:${ctx.method} - ms:${ms}`);
});

// routes
koaapp.use(index.routes(), index.allowedMethods());
koaapp.use(users.routes(), users.allowedMethods());

// error-handling
koaapp.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = koaapp;





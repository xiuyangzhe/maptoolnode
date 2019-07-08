const Koa = require("koa");
const koaapp = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
// @ts-ignore
const onerror = require("koa-onerror");
const index = require("./routes/index");
const users = require("./routes/users");

// error handler
onerror(koaapp);

// middlewares
koaapp.use(bodyparser({
    enableTypes:["json", "form", "text"]
}));
koaapp.use(json());
koaapp.use(logger());
koaapp.use(require("koa-static")(__dirname + "/../public"));
koaapp.use(require("koa-static")(__dirname + "/../dist"));
koaapp.use(require("koa-static")(__dirname + "/../maptool"));

koaapp.use(views(__dirname + "./../views", {
    extension: "html"
}));

// logger
koaapp.use(async (ctx, next) => {
    const start:any = new Date();
    await next();
    const now:any = new Date();
    const ms:any = now.getMilliseconds - start.getMilliseconds;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
koaapp.use(index.routes(), index.allowedMethods());
koaapp.use(users.routes(), users.allowedMethods());

// error-handling
koaapp.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = koaapp;

// @ts-ignore
var router = require("koa-router")();
router.prefix('/users');
router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!';
});
router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response';
});
module.exports = router;
//# sourceMappingURL=users.js.map
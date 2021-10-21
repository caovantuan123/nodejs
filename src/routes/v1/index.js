const express = require('express');
const authRoute = require('./auth.route');
const TuanRoute = require('./Tuan.route');
const userRoute = require('./user.route');
const apparelSizeRoute = require('./ApparelSize.route');
const productRoute = require('./Product.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/apparelSize',
    route: apparelSizeRoute,
  },
  {
    path: '/Tuan',
    route: TuanRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

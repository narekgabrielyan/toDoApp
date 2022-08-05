const express = require('express');
const webpack = require('webpack');
const middleware = require("webpack-dev-middleware");
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(
    middleware(compiler, {
        publicPath: config.output.publicPath,
    })
);
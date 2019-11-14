import {Configuration} from 'webpack';
import {rules} from './_rules';
import {distDir, isProd, webDir} from './_env';
import AppHelper from '../../helper/AppHelper';


export const WpBase = {
    devtool: isProd ? false : '#cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    output: {
        path: distDir,
        publicPath: '/dist/',
        filename: 'js/[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            '@web': webDir,
            'vue$': 'vue/dist/vue.runtime.esm.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
        modules: [
            'node_modules',
            AppHelper.pathResolve('./node_modules'),
            AppHelper.pathResolve('./node_modules/@vue/cli-service/node_modules'),
        ],
    },
    resolveLoader: {
        modules: [
            AppHelper.pathResolve('./node_modules/@vue/cli-plugin-typescript/node_modules'),
            AppHelper.pathResolve('./node_modules/@vue/cli-plugin-babel/node_modules'),
            'node_modules',
            AppHelper.pathResolve('./node_modules'),
            AppHelper.pathResolve('./node_modules/@vue/cli-service/node_modules'),
        ],
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync|es6-promise\.js)$/,
        rules: rules.map((rule) => rule.conf),
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    parallelism: 2,

} as Configuration;

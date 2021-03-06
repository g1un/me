const path = require('path');
const autoprefixer = require('autoprefixer');
const plugins = require('./webpack/plugins');
const includesLoader = require('./webpack/includesLoader');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const svgObject = require('./webpack/svgObject')(SRC_DIR + '/svg');

let config = (env, argv) => {
    let isProd = argv.mode === 'production';

    return {
        entry: {
            app: SRC_DIR + `/js/dev.app.js`,
        },
        output: {
            path: DIST_DIR,
            filename: 'js/bundle.js'
        },

        resolveLoader: {
            modules: ['node_modules', './webpack/']
        },

        resolve: {
            modules: [
                "node_modules",
                "src/spritesmith-generated",
                "src/img",
                "src/fonts"
            ]
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: 'css/style.css'
                            }
                        },
                        {
                            loader: 'extract-loader',
                            options: {
                                publicPath: '../'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 2 versions', 'ie 10')]
                                }
                            }
                        },
                        "sass-loader",
                    ]
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].html'
                            }
                        },
                        {
                            loader: 'pug-html-loader',
                            options: {
                                pretty: true,
                                data: {
                                    svg: svgObject
                                }
                            }
                        },
                        {
                            loader: 'includesLoader',
                            options: {
                                pathToIncludes: SRC_DIR + '/includes'
                            }
                        }
                    ]
                },
                {
                    test: /\.png$/,
                    include: [ SRC_DIR + '/spritesmith-generated' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/sprite/[name].png'
                            }
                        }
                    ]

                },
                {
                    test: /\.(jpe?g|png|gif|svg|mp4)$/i,
                    include: [ SRC_DIR + '/img', SRC_DIR + '/video' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path]/[name].[ext]'
                            }
                        }
                    ]

                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/i,
                    include: [ SRC_DIR + '/fonts' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]

                }
            ]
        },

        plugins: plugins(isProd, SRC_DIR, DIST_DIR),

        devServer: {
            disableHostCheck: true,
            host: '0.0.0.0'
        },
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 1000
        }
    }
};

module.exports = config;
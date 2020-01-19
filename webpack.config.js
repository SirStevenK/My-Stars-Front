const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
module.exports = {
    context: __dirname,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
        publicPath: '/',
    },
     devServer: {
        historyApiFallback: true
    },

    resolve: {
        // modules: ["src", "node_modules"],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
             },
             {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
             },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
           template: path.resolve( __dirname, 'index.html' ),
           filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'public', to: 'public' }
        ])
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
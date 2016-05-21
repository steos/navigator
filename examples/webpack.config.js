var path = require('path')
module.exports = {
    //devtool: 'source-map',
    context: path.join(__dirname, "src"),
    entry: [
      './main'
    ],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "build")
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel?{presets:["es2015", "react", "stage-2"]}']
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
};

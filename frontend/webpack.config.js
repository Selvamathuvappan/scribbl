module.exports = {
    mode : "development",
    entry : "./app.js",
    watch : true,
    module : {
        rules : [
            {
                test : /\.js/,
                exclude : /node_modules/,
                loader : "babel-loader",
                options : {
                    presets : ["@babel/preset-react"]
                }
            },
            {
                test : /\.s[ac]ss/,
                use : ["style-loader", "css-loader", "sass-loader"],
                exclude : /node_modules/
            }
        ]
    }
}
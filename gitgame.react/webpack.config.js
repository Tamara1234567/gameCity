var path = require("path"); /// Path module from Node js

module.exports = {
	entry: "./src/app.js", /// entry filename
	output: {
		path: path.resolve(__dirname, "output"), /// Where to put output file
		filename: "bundle.js" /// output filename
	},
	module: { /// Configuring loaders
		rules: [
			{	
				test: /.js$/,
				exclude: path.resolve(__dirname, "node_modules"),
				loader: "babel-loader",
				options: {
					presets: ["react", "es2015"]
				}

			}
		]
	},
	mode: "development",
	devtool: "source-map"
}
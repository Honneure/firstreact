module.exports = {
	entry: "./app-client.js",
	output: {
		filename: "public/bundle.js"
	},

	module: {
		loaders:  [

		 {	test: /\.(js|jsx)$/,
		 	exclude: /(node_modules|app-server.js)/,
		 	loader: 'babel-loader',
		 	query:
			      {
			        presets:['es2015', 'react']
			      }
		 }


		]
	}

};
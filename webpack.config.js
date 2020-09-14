const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const getFileName = (name, ext) => {
	return isDev ? `${name}.${ext}` : `${name}.[hash].${ext}`;
};

const returnLoaders = () => {
	const loaders = [
		{
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env"],
			},
		},
	];

	if (isDev) {
		loaders.push("eslint-loader");
	}

	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: ["@babel/polyfill", "./index.js"],
	output: {
		filename: getFileName("main", "js"),
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".js"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@core": path.resolve(__dirname, "src/core"),
		},
	},
	devtool: isDev ? "source-map" : false,
	devServer: {
		port: 3000,
		hot: isDev,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: "index.html",
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: getFileName("style", "css"),
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ["default", { discardComments: { removeAll: true } }],
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{ loader: "style-loader" },
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					{ loader: "css-loader" },
					{
						loader: "less-loader",
						options: {
							lessOptions: {
								compress: isProd,
							},
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
				},
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: returnLoaders(),
			},
		],
	},
};

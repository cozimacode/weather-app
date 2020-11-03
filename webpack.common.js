const babelOptions = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules: true,
      },
    ],
    "@babel/plugin-proposal-class-properties",
  ],
};

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};

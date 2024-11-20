const path = require('path');

module.exports = {
  entry: './src/index.ts', // Entry point for your library
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'FloorMapLibrary', // Global variable name for the library
    libraryTarget: 'umd', // Universal Module Definition
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  devServer: {
    static: './dist', // Serve files from the dist directory
    port: 8080,       // Port for the development server
  },
};

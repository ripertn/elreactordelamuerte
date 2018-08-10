//single entry

// module.exports = { 
//   devtool: 'source-map', 
//   entry: './script.js', 
//   output: { filename: 'bundle.js' }, 
//   module: { 
//     loaders: [ 
//       { 
//         test: /.js?$/, 
//         loader: 'babel-loader', 
//         exclude: /node_modules/, 
//         query: { 
//           presets: ['es2015', 'react'] 
//         } 
//       } 
//     ] 
//   },
// }

//multiple entry

module.exports = { 
  devtool: 'source-map',
  entry: {
    todo: './script.todo.js',
    autorefresh: './script.autorefresh.js', //["./entry1", "./entry2"]
  },
  output: {
    // Make sure to use [name] or [id] in output.filename
    //  when using multiple entry points
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },
  module: { 
    loaders: [ 
      { 
        test: /.js?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/, 
        query: { 
          presets: ['es2015', 'react'] 
        } 
      } 
    ] 
  },
}
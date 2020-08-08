module.exports = {
  env: {
    // 環境変数 NODE_ENV === "test" の場合
    test: {
      presets: [
        [
          '@babel/preset-env',
          { targets: { node: 'current' } }
        ]
      ]
    }
  }
}

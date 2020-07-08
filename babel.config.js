module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'modules': 'false',
        'useBuiltIns': 'usage',
        'targets': '> 0.25%, not dead',
      }
    ]
  ],
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
};

/**
 * @file config of jest
 * @url https://jestjs.io/docs/en/configuration
 */
module.exports = {
  moduleFileExtensions: ['js', 'ts', 'mpx'],
  testEnvironment: 'jsdom',
  collectCoverage: false,
  testMatch: [
    '**/__tests__/**/*.spec.js'
  ],
  collectCoverageFrom: ['/packages/mpx-cube-ui/src/components/**/*.{js,mpx,ts}'],
  coverageDirectory: 'test/coverage',
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/packages/mpx-cube-ui/src/$1',
    '^test/(.*)': '<rootDir>/packages/mpx-cube-ui/__tests__/$1',
    '^example/(.*)': '<rootDir>/example/$1',
    '@mpxjs/core$': '<rootDir>/node_modules/@mpxjs/core/src/index.js',
    '@mpxjs/api-proxy': '<rootDir>/node_modules/@mpxjs/api-proxy/src/index.js'
  },
  globals: {
    __mpx_mode__: 'wx',
    __env__: 'test',
    __mpx_dynamic_runtime__: false,
    'ts-jest': {
      tsconfig: {
        target: 'ES2019'
      },
      // ts-jest 处理后再经过 babel-jest 处理
      babelConfig: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current'
              }
            }
          ]
        ]
      }
    }
  },
  testURL: 'http://test.api.com',
  setupFiles: ['<rootDir>/scripts/test-setup.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.mpx$': '<rootDir>/node_modules/@mpxjs/mpx-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest'
  },
  resolver: '<rootDir>/scripts/jest-mpx-resolver/index.js',
  transformIgnorePatterns: ['node_modules/(?!(@mpxjs|@babel))']
}

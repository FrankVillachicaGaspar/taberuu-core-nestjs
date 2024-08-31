import type { Config } from 'jest';

import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: [
    'src/{context,utils,shared}/**/*.(t|j)s',
    '!src/shared/**/*.(t|j)s',
    '!src/**/infrastructure/repositories/**/*.(t|j)s',
    '!src/**/*.module.{ts,js}',
    '!src/**/*.dto.{ts,js}',
    '!src/**/*.http-dto.{ts,js}',
    '!src/**/*.config.{ts,js}',
    '!src/**/*.interface.{ts,js}',
    '!src/**/*.enum.{ts,js}',
    '!src/**/*.error.{ts,js}',
    '!src/**/*.model.{ts,js}',
    '!src/**/*.mock.{ts,js}',
    '!src/**/*.repository.{ts,js}',
    '!src/**/*.constant.{ts,js}',
    '!src/**/*.type.{ts,js}',
    '!src/shared/drizzle/db/schema.{ts,js}',
  ],
  collectCoverage: true,
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  clearMocks: true,
  coverageProvider: 'v8',
};

export default config;

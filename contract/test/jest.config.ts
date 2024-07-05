import path from 'path'
import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
    const jestConfig: Config.InitialOptions = {
        transform: {
            '^.+\\.(t|j)sx?$': 'ts-jest'
        },
        rootDir: path.normalize(path.join(__dirname, '/..')),
        testMatch: ['<rootDir>/**/*.test.ts'],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
        collectCoverage: false,
        coverageDirectory: '<rootDir>/coverage/',
        collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
        testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.*#.*']
    }

    return jestConfig
}

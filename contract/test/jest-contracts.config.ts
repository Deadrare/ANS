import type { Config } from '@jest/types'

import jestBaseConfigFactory from './jest.config'

export default async (): Promise<Config.InitialOptions> => {
    const jestBaseConfig = await jestBaseConfigFactory()
    return {
        ...jestBaseConfig,
        testMatch: ['<rootDir>/test/**/*.test.ts']
    }
}

type Config = {
    DEPLOYMENT: string;
    NETWORK: 'devnet' | 'testnet' | 'mainnet';
    NODE_URL: string;
    EXPLORER_URL: string;

    NAME_ID: string;
    REWARD_TOKEN_ID: string;
    FORWARD_NAME_RESOLVER_ID: string;
    REVERSE_NAME_RESOLVER_ID_0: string;
    REVERSE_NAME_RESOLVER_ID_1: string;
    REVERSE_NAME_RESOLVER_ID_2: string;
    REVERSE_NAME_RESOLVER_ID_3: string;

    PRIVATE_KEY_GROUP_0: string;
    PRIVATE_KEY_GROUP_1: string;
    PRIVATE_KEY_GROUP_2: string;
    PRIVATE_KEY_GROUP_3: string;
    PUBLIC_ADDRESS: string;
    MINIMAL_CONTRACT_DEPLOSIT: bigint;
}

export const DEPLOYMENTS = {
    DEVELOPMENT: 'DEVELOPMENT',
    STAGING: 'STAGING',
    STAGING_LOCAL: 'STAGING_LOCAL',
    PRODUCTION: 'PRODUCTION'
}

const DefaultConfig: Config = {
    DEPLOYMENT: 'DEVELOPMENT',
    NETWORK: 'devnet',
    NODE_URL: 'http://127.0.0.1:22973',
    EXPLORER_URL: 'http://127.0.0.1:9090',

    NAME_ID: '',
    REWARD_TOKEN_ID: '',
    FORWARD_NAME_RESOLVER_ID: '',
    REVERSE_NAME_RESOLVER_ID_0: '',
    REVERSE_NAME_RESOLVER_ID_1: '',
    REVERSE_NAME_RESOLVER_ID_2: '',
    REVERSE_NAME_RESOLVER_ID_3: '',

    PRIVATE_KEY_GROUP_0: 'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5',
    PRIVATE_KEY_GROUP_1: '',
    PRIVATE_KEY_GROUP_2: '',
    PRIVATE_KEY_GROUP_3: '',
    PUBLIC_ADDRESS: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
    MINIMAL_CONTRACT_DEPLOSIT: 100000000000000000n
}

const DevelopmentConfig: Config = {
    ...DefaultConfig
}

const StagingConfig: Config = {
    ...DefaultConfig,
    DEPLOYMENT: 'STAGING',
    NETWORK: 'testnet',
    NODE_URL: 'https://wallet-v20.testnet.alephium.org',
    EXPLORER_URL: 'https://backend-v113.testnet.alephium.org',

    NAME_ID: 'ec0071c7a2e2263d80bc7c0b6c77591232756f7feacdb7b760fc0d2087074400',
    REWARD_TOKEN_ID: '3a85c83d10958b97e3b35f26dcbf24fc27d706200b163a285a24fd41114bd000',
    FORWARD_NAME_RESOLVER_ID: 'f4e1b0238ff61f062ad937070b34f1a1195256b17856175976917f4bed0e5d00',
    REVERSE_NAME_RESOLVER_ID_0: '83bc9f1c520b30b8907453d94ecd45901931444c169a6d2248fab50b26125700',
    REVERSE_NAME_RESOLVER_ID_1: '059da838ab8b14dba00409c46aac4521d5df56fdb1b0f9f3957faeb075ee7501',
    REVERSE_NAME_RESOLVER_ID_2: '15a531841592a44a53cc4b2db96c10566e50edd94407435f9af280d260703c02',
    REVERSE_NAME_RESOLVER_ID_3: '58e5a842044b8463ea6fc385488ba85bd4ee759db9e6f759b27018cc2bc5c203',

    PRIVATE_KEY_GROUP_0: '',
    PRIVATE_KEY_GROUP_1: '',
    PRIVATE_KEY_GROUP_2: '',
    PRIVATE_KEY_GROUP_3: '',
    PUBLIC_ADDRESS: '1EFXeHsFt94CAbatDMemoKQHprQUu8eepV5d7EqSfbeN2'
}

const StagingLocalConfig: Config = {
    ...StagingConfig,
    DEPLOYMENT: 'STAGING_LOCAL'
}

const ProductionConfig: Config = {
    ...DefaultConfig,
    DEPLOYMENT: 'PRODUCTION',
    NETWORK: 'mainnet',
    NODE_URL: 'https://wallet-v20.mainnet.alephium.org',
    EXPLORER_URL: 'https://backend-v113.mainnet.alephium.org',

    NAME_ID: '',
    REWARD_TOKEN_ID: '',
    FORWARD_NAME_RESOLVER_ID: '',
    REVERSE_NAME_RESOLVER_ID_0: '',
    REVERSE_NAME_RESOLVER_ID_1: '',
    REVERSE_NAME_RESOLVER_ID_2: '',
    REVERSE_NAME_RESOLVER_ID_3: '',

    PRIVATE_KEY_GROUP_0: process.env.PRIVATE_KEY ?? '',
    PUBLIC_ADDRESS: '145c8C1TgRnUEHu66GsktSBe44JmGqNJV8hEbidve5nXn'
}

const getConfig = (): Config => {
    const DEPLOYMENT = process.env.DEPLOYMENT

    if (typeof DEPLOYMENT === 'undefined') {
        return DevelopmentConfig
    }

    if (DEPLOYMENT === DEPLOYMENTS.STAGING) {
        return StagingConfig
    }

    if (DEPLOYMENT === DEPLOYMENTS.STAGING_LOCAL) {
        return StagingLocalConfig
    }

    if (DEPLOYMENT === DEPLOYMENTS.PRODUCTION) {
        return ProductionConfig
    }

    return DevelopmentConfig
}

export default getConfig

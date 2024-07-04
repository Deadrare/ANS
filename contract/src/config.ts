type Config = {
    DEPLOYMENT: string;
    NETWORK: 'devnet' | 'testnet' | 'mainnet';
    NODE_URL: string;
    EXPLORER_URL: string;

    NAME_ID: string;
    REWARD_TOKEN_ID: string;
    CROP_ID: string;
    FARM_ID: string;

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
    CROP_ID: '',
    FARM_ID: '',

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
    NODE_URL: process.env.NODE_URL ?? 'https://wallet-v20.testnet.alephium.org',
    EXPLORER_URL: 'https://backend-v113.testnet.alephium.org',

    NAME_ID: '71d9a404867bb3a79d43888d4753b672e5ea38b4dd041c9148aacf8063959100',
    REWARD_TOKEN_ID: '9c5c55047d02754a191a2c204542b8599e0cb812d70fc195043e3521864b7500',
    CROP_ID: 'd15d31385745362cf8c1ba17d3a62331f5fba9d1aa0896ee721a44e916d49300',
    FARM_ID: '96b79ad3614e20ff6a7afce09cf69867e2734f8af02eee23209a3f42c64f2d00',

    FORWARD_NAME_RESOLVER_ID: 'd309a491c320abcd78a06409ba87183e20a07ee51948162115ca92c9352ec900',
    REVERSE_NAME_RESOLVER_ID_0: '95a9496a638a1923413f1618b7178afdd6b57bdec777be3180dda41229063400',
    REVERSE_NAME_RESOLVER_ID_1: '1d01c3693bf2ffe2c1d09d0ac60fa25e97d05f6484eed86c0a72dc0bed664d01',
    REVERSE_NAME_RESOLVER_ID_2: 'dd566d8414d8b63073eb2455bee90af322f54a67b6d17f8945862268a170f202',
    REVERSE_NAME_RESOLVER_ID_3: '3b0a24b081303da1493bbebf867e5edf3a340f59e86e320dbb9a8644da817b03',

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
    NODE_URL: process.env.NODE_URL ?? 'https://wallet-v20.mainnet.alephium.org',
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

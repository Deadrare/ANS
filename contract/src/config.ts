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
    NODE_URL: 'https://wallet-v20.testnet.alephium.org',
    EXPLORER_URL: 'https://backend-v113.testnet.alephium.org',

    NAME_ID: '18a9958f73cffaf31973c90ac834a16be8b24a2a30fdd87a42f9763f13547700',
    REWARD_TOKEN_ID: '89faa7811d509c98b2501d9f29ab1c0f3eb8d10f0a7b3578d66e29b6e50d0a00',
    CROP_ID: '09bb36f25982b2bb3531a5b33c27f44cc8346262accd7f488ce81497a3844d00',
    FARM_ID: 'c60cb5b2262f5a579c543b43636678a764e28800212104e2fb590e9bfaec7b00',

    FORWARD_NAME_RESOLVER_ID: '8bf1df996f237a53bd4e37898769e5ded4e924c126705274db8a6aadf78e8a00',
    REVERSE_NAME_RESOLVER_ID_0: 'fddd4f37b256b3663dc201015ed4949cc49f8672c34936aa8b9324bd58776500',
    REVERSE_NAME_RESOLVER_ID_1: '8354ca6867366d81ebce93b54c29aaccf589bb8232716b32ad5f98f856827001',
    REVERSE_NAME_RESOLVER_ID_2: 'e9a194abc1b26d199abd62702cb0cae4f53065d2f7b919d632caf5f92629e702',
    REVERSE_NAME_RESOLVER_ID_3: '1fe03363b1661c825a27178ee61d5e1a93966365a03a7fbe8f443df730964303',

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

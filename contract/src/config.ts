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
    NODE_URL: process.env.NODE_URL ?? 'https://wallet.testnet.alephium.org',
    EXPLORER_URL: 'https://backend.testnet.alephium.org',

    NAME_ID: 'eae89175bac0ea6fae112dfa5947b4cb1e5c60de403f5b9cf7d8c329bcc88000',
    REWARD_TOKEN_ID: '7cdb83f533a71100ca8d4305891033ea9ad559ccbe5113416b2fef9892892300',
    CROP_ID: 'ce24d53ac468d8d3debaafc5a90f75441b9cf4658ce60f36184e9fa26a801e00',
    FARM_ID: 'bef5bf7f1577a2ba71ab8de090ce837af1040d1bb2c776aba89a42f2a2cbcb00',

    FORWARD_NAME_RESOLVER_ID: '3bdb2a56a41f317376223883f8527e8ad3b1820115c1bcfd74bb1bb1a876e900',
    REVERSE_NAME_RESOLVER_ID_0: 'c8b65a9f52eb420f0158733206d73dad7b83df51bf15c130b099088547baee00',
    REVERSE_NAME_RESOLVER_ID_1: '39eee9d263f830f1a0757a52b3cd587b7770c6cdf23a7e6698b62120dd5a9d01',
    REVERSE_NAME_RESOLVER_ID_2: '934e62d332144f1cfc17be69d9c21c10ea73eb0a594dff74e0d7992fd81b9a02',
    REVERSE_NAME_RESOLVER_ID_3: 'a319e97ddf01e539b736176b71a00437a5f3b96cfab7088df6ae581beb77bb03',

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
    NODE_URL: process.env.NODE_URL ?? 'https://wallet.mainnet.alephium.org',
    EXPLORER_URL: 'https://backend.mainnet.alephium.org',

    NAME_ID: '5dfe07546c34a9ae9e73cd0a94dc3468ba779bb9564febee5f10d6020e179900',
    REWARD_TOKEN_ID: 'eaf001abb8534bb085ed11e9450bbeddc06a1221ac012c81a60f59bc02b27100',
    CROP_ID: '22829bd8ac7be9693899c870deb9255267056e09f07f1b94ddace1bf621be000',
    FARM_ID: '8a467b3815f38433eca6371ea65afc59cec6d3f7e1dbd42aabdb4d93be349f00',

    FORWARD_NAME_RESOLVER_ID: '6ed2028d263833ada7d8ac87b4478278f2e58e09ddbe819e623b17ba9e6cae00',
    REVERSE_NAME_RESOLVER_ID_0: '6c7075ed4c407c4e20ae39341820240a4065fe69c3840960d2ee2633daf8b000',
    REVERSE_NAME_RESOLVER_ID_1: '40be2751efbf30395c079278972fbe6838f53a6e240f7b30ebfe877b7dddcd01',
    REVERSE_NAME_RESOLVER_ID_2: 'cff6d6016d3160fd5818d92effa79594a4dceec572895d953f1a76f0163ff902',
    REVERSE_NAME_RESOLVER_ID_3: '5777c6381f8dd67297793a4eb6d1e8a1f0de545f5fa4e129d25f4f08d382bd03',

    PRIVATE_KEY_GROUP_0: process.env.PRIVATE_KEY_GROUP_0 ?? '',
    PRIVATE_KEY_GROUP_1: process.env.PRIVATE_KEY_GROUP_1 ?? '',
    PRIVATE_KEY_GROUP_2: process.env.PRIVATE_KEY_GROUP_2 ?? '',
    PRIVATE_KEY_GROUP_3: process.env.PRIVATE_KEY_GROUP_3 ?? '',
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

import { DUST_AMOUNT, ONE_ALPH, web3 } from '@alephium/web3'
import { GenerateFarm, GenerateToken } from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import getConfig from '../config'

const config = getConfig()

const run = async () => {
    web3.setCurrentNodeProvider(config.NODE_URL)
    const wallet = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_0
    })

    const result = await GenerateFarm.execute(
        wallet,
        {
            initialFields: {
                forwardNameResolverId: config.FORWARD_NAME_RESOLVER_ID
            },
            attoAlphAmount: ONE_ALPH + DUST_AMOUNT
        }
    )
    console.log(`Transaction ID: ${result.txId}`)

    // staging
    // Transaction ID: c813e9bc3fe21874b958078e59df19903bf131651d70fca2e74d183f2cda44a2

    // production
    // Transaction ID: 38694a93ce0ed2bbe8e2b9b8118cb1638b2f4b9d41e4501bc64fbe322715f03e
}

run()

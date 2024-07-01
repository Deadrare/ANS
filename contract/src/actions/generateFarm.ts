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
    // Transaction ID: 43caf05f3e5fadcaa2787bf7250f347a84dabcd411fa94e36bae1e6a2dc1f3b4
}

run()

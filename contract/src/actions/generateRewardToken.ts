import { DUST_AMOUNT, ONE_ALPH, web3 } from '@alephium/web3'
import { GenerateToken } from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import getConfig from '../config'

const config = getConfig()

const run = async () => {
    web3.setCurrentNodeProvider(config.NODE_URL)
    const wallet = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_0
    })

    const result = await GenerateToken.execute(
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
    // Transaction ID: 7147919b27d3b40ae559ea8d5a51d2c978a8562ed983bd6f29163d22d1699c3f
}

run()

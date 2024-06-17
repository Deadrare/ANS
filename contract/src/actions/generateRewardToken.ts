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
    // Transaction ID: ccf3546837d02c7859a77efb724264adb7e2778ce2eda9aa5c70f5e3cc8b2410
}

run()

import { stringToHex, web3 } from '@alephium/web3'
import { ForwardNameResolver } from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import getConfig from '../config'
import { FARM_COLLECTION_URL, NAME_COLLECTION_URL } from './dataUris'

const config = getConfig()

const run = async () => {
    web3.setCurrentNodeProvider(config.NODE_URL)
    const wallet = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_0
    })

    const result = await ForwardNameResolver.deploy(
        wallet,
        {
            initialFields: {
                nameTemplateId: config.NAME_ID,
                tokenTemplateId: config.REWARD_TOKEN_ID,
                cropTemplateId: config.CROP_ID,
                farmTemplateId: config.FARM_ID,
                collectionUri: stringToHex(NAME_COLLECTION_URL),
                farmCollectionUri: stringToHex(FARM_COLLECTION_URL),
                renewLength: 31_536_000_000n,
                earliestRenew: 2_592_000_000n,
                totalSupply: 0n
            }
        }
    )
    console.log(`Transaction ID: ${result.txId}`)
    console.log(`ForwardNameResolver contract ID: ${result.contractInstance.contractId}`)
    console.log(`ForwardNameResolver contract address: ${result.contractInstance.address}`)

    // staging
    // Transaction ID: 2b7ba81cbc58c1d4aab98334624f06df02370c80464a0c530c379ff5c7179a64
    // ForwardNameResolver contract ID: 3bdb2a56a41f317376223883f8527e8ad3b1820115c1bcfd74bb1bb1a876e900
    // ForwardNameResolver contract address: xibzpzg1jAE6pVgHqNyo42jGSJP5bxzc6q4d2oktyLVm

    // production
    // Transaction ID: fedecfa7f334d675aa8bacae008cf5eb8957ed2b65ec001939b7df9b1b4cefd2
    // ForwardNameResolver contract ID: 6ed2028d263833ada7d8ac87b4478278f2e58e09ddbe819e623b17ba9e6cae00
    // ForwardNameResolver contract address: 229YhAcdSWLX7UXQF3gXdHKo5NBkr1VgiuiwtJzjqTgwy
    
}

run()

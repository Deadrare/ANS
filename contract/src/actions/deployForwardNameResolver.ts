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
    // Transaction ID: eda278d43ac0d019d1650ad79357d47c4ef511eb29adcec2b22aca9be8e9c918
    // ForwardNameResolver contract ID: d309a491c320abcd78a06409ba87183e20a07ee51948162115ca92c9352ec900
    // ForwardNameResolver contract address: 28tkfXgXNjBxJAU85CqAkTfvN9Rux9HqexFpEmAq8icm5
}

run()

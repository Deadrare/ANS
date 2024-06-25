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
    // Transaction ID: c6d8a3b501d95bcdf3b111f3d7b68b409c5b6a4bfb65f8aa658457ad72970d51
    // ForwardNameResolver contract ID: 8bf1df996f237a53bd4e37898769e5ded4e924c126705274db8a6aadf78e8a00
    // ForwardNameResolver contract address: 247EhNDSPMcvgrLiqyPcCmMh6hpytdnYiNBMcBpZV4dXm
}

run()

import { stringToHex, web3 } from '@alephium/web3'
import { ForwardNameResolver } from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import getConfig from '../config'
import { COLLECTION_URL } from './dataUris'

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
                collectionUri: stringToHex(COLLECTION_URL),
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
    // Transaction ID: 6943881e5952882d4a8088a9d5e634981c7a4e6dc9867447430d0046d4df08d8
    // ForwardNameResolver contract ID: f4e1b0238ff61f062ad937070b34f1a1195256b17856175976917f4bed0e5d00
    // ForwardNameResolver contract address: 2BAsC1S1z9o1TU48NWvH8jZtVidb9SECYvsjRV67txqoD
}

run()

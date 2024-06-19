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
    // Transaction ID: c3df867b4540c8db63e11ddf16ff90f8acc2165c39db64c5b3a3034500fbb8c1
    // ForwardNameResolver contract ID: 610cb9f87ac60c3a6320ff353f90ce66707adbca65dd4057722ce3b0902c8800
    // ForwardNameResolver contract address: 21Dnv1MYPrqNujyvkpJ9mDwnSkje217tUEAiaJ49qS247
}

run()

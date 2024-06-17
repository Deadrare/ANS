import { web3 } from '@alephium/web3'
import {
    Name,
    RewardToken
} from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import getConfig from '../config'
import { randomContractAddress, randomContractId } from '@alephium/web3-test'

const config = getConfig()

const deployName = async (
    wallet: PrivateKeyWallet
): Promise<string> => {
    const result = await Name.deploy(
        wallet,
        {
            initialFields: {
                collectionId: randomContractId(),
                nftIndex: 0n,
                name: '',
                capitalisation: '',
                address: randomContractAddress(),
                expires: 0n
            }
        }
    )
    const contractId = result.contractInstance.contractId
    const contractAddress = result.contractInstance.address
    console.log(`Name: ${contractAddress}, contract id: ${contractId}`)
    return contractId
}

const deployRewardToken = async (
    wallet: PrivateKeyWallet
): Promise<string> => {
    const result = await RewardToken.deploy(
        wallet,
        {
            initialFields: {
                parentId: randomContractId(),
                symbol: '',
                name: '',
                decimals: 0n,
                totalSupply: 0n
            }
        }
    )
    const contractId = result.contractInstance.contractId
    const contractAddress = result.contractInstance.address
    console.log(`RewardToken: ${contractAddress}, contract id: ${contractId}`)
    return contractId
}

const run = async () => {
    web3.setCurrentNodeProvider(config.NODE_URL)
    const wallet = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_0
    })

    await deployName(wallet)
    await deployRewardToken(wallet)
}

run()

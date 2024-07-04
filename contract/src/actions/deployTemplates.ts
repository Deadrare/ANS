import { web3 } from '@alephium/web3'
import {
    Crop,
    Farm,
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

const deployCrop = async (
    wallet: PrivateKeyWallet
): Promise<string> => {
    const result = await Crop.deploy(
        wallet,
        {
            initialFields: {
                collectionId: randomContractId(),
                nftIndex: 0n,
                name: '',
                expires: 0n,
                alphAmount: 0n
            }
        }
    )
    const contractId = result.contractInstance.contractId
    const contractAddress = result.contractInstance.address
    console.log(`Crop: ${contractAddress}, contract id: ${contractId}`)
    return contractId
}

const deployFarm = async (
    wallet: PrivateKeyWallet
): Promise<string> => {
    const result = await Farm.deploy(
        wallet,
        {
            initialFields: {
                cropTemplateId: randomContractId(),
                parentId: randomContractId(),
                collectionUri: '',
                renewLength: 0n,
                totalSupply: 0n
            }
        }
    )
    const contractId = result.contractInstance.contractId
    const contractAddress = result.contractInstance.address
    console.log(`Farm: ${contractAddress}, contract id: ${contractId}`)
    return contractId
}

const run = async () => {
    web3.setCurrentNodeProvider(config.NODE_URL)
    const wallet = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_0
    })

    await deployName(wallet)
    await deployRewardToken(wallet)
    await deployCrop(wallet)
    await deployFarm(wallet)
}

run()

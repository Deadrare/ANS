import { web3 } from '@alephium/web3'
import { ReverseNameResolver } from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import getConfig from '../config'

const config = getConfig()

const run = async () => {
    web3.setCurrentNodeProvider(config.NODE_URL)
    const wallet0 = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_0
    })
    const wallet1 = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_1
    })
    const wallet2 = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_2
    })
    const wallet3 = new PrivateKeyWallet({
        privateKey: config.PRIVATE_KEY_GROUP_3
    })

    const result0 = await ReverseNameResolver.deploy(
        wallet0,
        {
            initialFields: {}
        }
    )
    const result1 = await ReverseNameResolver.deploy(
        wallet1,
        {
            initialFields: {}
        }
    )
    const result2 = await ReverseNameResolver.deploy(
        wallet2,
        {
            initialFields: {}
        }
    )
    const result3 = await ReverseNameResolver.deploy(
        wallet3,
        {
            initialFields: {}
        }
    )

    console.log(`Transaction ID0: ${result0.txId}`)
    console.log(`ForwardNameResolver0 contract ID: ${result0.contractInstance.contractId}`)
    console.log(`ForwardNameResolver0 contract address: ${result0.contractInstance.address}`)

    console.log(`Transaction ID1: ${result1.txId}`)
    console.log(`ForwardNameResolver1 contract ID: ${result1.contractInstance.contractId}`)
    console.log(`ForwardNameResolver1 contract address: ${result1.contractInstance.address}`)

    console.log(`Transaction ID2: ${result2.txId}`)
    console.log(`ForwardNameResolver2 contract ID: ${result2.contractInstance.contractId}`)
    console.log(`ForwardNameResolver2 contract address: ${result2.contractInstance.address}`)

    console.log(`Transaction ID3: ${result3.txId}`)
    console.log(`ForwardNameResolver3 contract ID: ${result3.contractInstance.contractId}`)
    console.log(`ForwardNameResolver3 contract address: ${result3.contractInstance.address}`)

    // Staging
    // Transaction ID0: 8eec46e44000bccaf5e4217704c977bc8bf4b43f9ae64132201e8d91b1b14a4e
    // ForwardNameResolver0 contract ID: fddd4f37b256b3663dc201015ed4949cc49f8672c34936aa8b9324bd58776500
    // ForwardNameResolver0 contract address: 2BmvzDx5FYJjwLpEuTxZYxeJhWRQo4wScHraisBuGoUK1
    // Transaction ID1: a686114198f20697ec60fff85187bc847f71b0eaf58e3e70224a07e0ffb2743d
    // ForwardNameResolver1 contract ID: 8354ca6867366d81ebce93b54c29aaccf589bb8232716b32ad5f98f856827001
    // ForwardNameResolver1 contract address: 23XcWZCobjKR8GRUhro5pavYFyZhXnjXq9mm7rGewNHfW
    // Transaction ID2: fd960fe5647050f15a72d9a8b39373d99b38ee9a0a809ba5794ddb390521d7f2
    // ForwardNameResolver2 contract ID: e9a194abc1b26d199abd62702cb0cae4f53065d2f7b919d632caf5f92629e702
    // ForwardNameResolver2 contract address: 2AQx1UtRSfXPgts1yWx7o8LqvvcnLDGPSiwGQ6mT4SUdw
    // Transaction ID3: b212e79da328559c50e6bbe64dbe077988aa064edc4a590df23e7375bd847deb
    // ForwardNameResolver3 contract ID: 1fe03363b1661c825a27178ee61d5e1a93966365a03a7fbe8f443df730964303
    // ForwardNameResolver3 contract address: vqP321RezH4x8eeRckgb2AserkDSd8L3vPgtN48MwS6E
}

run()

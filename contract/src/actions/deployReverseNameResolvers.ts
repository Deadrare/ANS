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
    console.log(`ReverseNameResolver0 contract ID: ${result0.contractInstance.contractId}`)
    console.log(`ReverseNameResolver0 contract address: ${result0.contractInstance.address}`)

    console.log(`Transaction ID1: ${result1.txId}`)
    console.log(`ReverseNameResolver1 contract ID: ${result1.contractInstance.contractId}`)
    console.log(`ReverseNameResolver1 contract address: ${result1.contractInstance.address}`)

    console.log(`Transaction ID2: ${result2.txId}`)
    console.log(`ReverseNameResolver2 contract ID: ${result2.contractInstance.contractId}`)
    console.log(`ReverseNameResolver2 contract address: ${result2.contractInstance.address}`)

    console.log(`Transaction ID3: ${result3.txId}`)
    console.log(`ReverseNameResolver3 contract ID: ${result3.contractInstance.contractId}`)
    console.log(`ReverseNameResolver3 contract address: ${result3.contractInstance.address}`)

    // Staging
    // Transaction ID0: 09f7d6d26e4aacd39d9d2f60ddc63d84cc3efc97d055e0082b07bb1fedde4e81
    // ReverseNameResolver0 contract ID: c8b65a9f52eb420f0158733206d73dad7b83df51bf15c130b099088547baee00
    // ReverseNameResolver0 contract address: 28CSviqSVutT62i9xKxp6eKFbuS9ArkjzSFssgzaRdJmd
    // Transaction ID1: 3db4922e3f2f72d6d39dc2197c439938fcf6f29ea9fd36118f3859ae820b8c9c
    // ReverseNameResolver1 contract ID: 39eee9d263f830f1a0757a52b3cd587b7770c6cdf23a7e6698b62120dd5a9d01
    // ReverseNameResolver1 contract address: xb6eWzL7cM7g4Wi5eYWvX917f6sJLemSjdHYbVRYApgx
    // Transaction ID2: a645dade7be444271c8e83e46a187d399021575aef1ba124263f9bedbe2a7ce5
    // ReverseNameResolver2 contract ID: 934e62d332144f1cfc17be69d9c21c10ea73eb0a594dff74e0d7992fd81b9a02
    // ReverseNameResolver2 contract address: 24byNNVeNhieJ4aVy593MAuuuAfqhrd9dfWjx6RqvVs4V
    // Transaction ID3: d0f7bedfba61926f65609933a86f6d0087b4850461beaf25db7134486c12c223
    // ReverseNameResolver3 contract ID: a319e97ddf01e539b736176b71a00437a5f3b96cfab7088df6ae581beb77bb03
    // ReverseNameResolver3 contract address: 25fdV37n3JiHgGoBFGXDqim7wfP2QRxSp4xg9VTv8uJsU

    //production
    // Transaction ID0: a8da29350655215ad6bca7456cadab60580732b34b3353a5bd42567073c07a43
    // ReverseNameResolver0 contract ID: 6c7075ed4c407c4e20ae39341820240a4065fe69c3840960d2ee2633daf8b000
    // ReverseNameResolver0 contract address: 21zFc2tYNKbSWHnL2Mb1FT8kd95cgnFhqtDFqbig1QbEF
    // Transaction ID1: f9e939af0508b4ab3f187eb7ebf372acfd0c303c4fe39e324f1c268cb693bc30
    // ReverseNameResolver1 contract ID: 40be2751efbf30395c079278972fbe6838f53a6e240f7b30ebfe877b7dddcd01
    // ReverseNameResolver1 contract address: y3gNtNXxSBRvM3LiXHKzH1N28TKRkjRBjeUoK43Hmpec
    // Transaction ID2: 812c8a8462edd04fc3a800246d5661b5c7f25c7846e031bf5534f1176ff6e76c
    // ReverseNameResolver2 contract ID: cff6d6016d3160fd5818d92effa79594a4dceec572895d953f1a76f0163ff902
    // ReverseNameResolver2 contract address: 28gkot6FiXpVo7yh3nNVGg82mb4XQBSBvycmbXkYyL77w
    // Transaction ID3: 8753314eb56d8c1d78060cf5ef98270b5243f15d075e3df441732982196f94a8
    // ReverseNameResolver3 contract ID: 5777c6381f8dd67297793a4eb6d1e8a1f0de545f5fa4e129d25f4f08d382bd03
    // ReverseNameResolver3 contract address: zaPWcb17opQfnoy9LGuax2QaJmhYf6KG4QNTwGoD1wEz
}

run()

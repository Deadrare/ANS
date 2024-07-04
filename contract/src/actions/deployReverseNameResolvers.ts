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
    // Transaction ID0: ee02e930681dfdc07b8bed92c041b59384407acee8b704e9beeff7ef30e0db8f
    // ReverseNameResolver0 contract ID: 95a9496a638a1923413f1618b7178afdd6b57bdec777be3180dda41229063400
    // ReverseNameResolver0 contract address: 24mAaToaWj4VtMmhycJpBVwZvyUkQp7xz6zA1M6GyBxMD
    // Transaction ID1: 718bd904d18220e79e8045d9cbc3bc9536fcc38cf8f390af3c869393b71b9bf9
    // ReverseNameResolver1 contract ID: 1d01c3693bf2ffe2c1d09d0ac60fa25e97d05f6484eed86c0a72dc0bed664d01
    // ReverseNameResolver1 contract address: veBVgs7wSNSpw7jNvCtcRkvQepPAYPXoXiPZqir15HUc
    // Transaction ID2: 19dfe58898e47ce3b4bd1b2b6014f6777e29f1f031d9bdc063f351c7198f3e3c
    // ReverseNameResolver2 contract ID: dd566d8414d8b63073eb2455bee90af322f54a67b6d17f8945862268a170f202
    // ReverseNameResolver2 contract address: 29axeiVy5yVWWZLx7rnnsLT3pB6zr6YwvqtjEYDRFcPA9
    // Transaction ID3: a6861df5ba3c9fbca048e68d14d8684260dff3db62c39e409450ab003fa06422
    // ReverseNameResolver3 contract ID: 3b0a24b081303da1493bbebf867e5edf3a340f59e86e320dbb9a8644da817b03
    // ReverseNameResolver3 contract address: xfR8wNCcSkToA15vgrvkXLykUTuSDqC5vL4rtYqu91dU
}

run()

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
    // Transaction ID0: e44a9d35dc67eb18b7f6b2e0bf03b7492fcd48bc958f74adb2a6af94ff7cfb56
    // ForwardNameResolver0 contract ID: 83bc9f1c520b30b8907453d94ecd45901931444c169a6d2248fab50b26125700
    // ForwardNameResolver0 contract address: 23ZCLcSUWg2Zp5qjaHZJgid4Fw8jYx6Ck52ZGEnrM71wu
    // Transaction ID1: 2948572bbe79174668e4550093ea4cfebdab7e497e739aa56d3d1e9e2a129473
    // ForwardNameResolver1 contract ID: 059da838ab8b14dba00409c46aac4521d5df56fdb1b0f9f3957faeb075ee7501
    // ForwardNameResolver1 contract address: u4sapctcGuP6G6R3q3n9sPKqGSLgrn2rA4WSVN5SkYGx
    // Transaction ID2: a91cf38f93daee76d110356fe25190613242a2eab556f1e341a442f25655c67c
    // ForwardNameResolver2 contract ID: 15a531841592a44a53cc4b2db96c10566e50edd94407435f9af280d260703c02
    // ForwardNameResolver2 contract address: v9Smk6sjYDx7L6gUPEzoR3JYCtZZYz3T5TgFKSJnGXff
    // Transaction ID3: 36791f2da0f15d4efd4562e717127478e7659ea9a994a8cbec0449d94cb32f79
    // ForwardNameResolver3 contract ID: 58e5a842044b8463ea6fc385488ba85bd4ee759db9e6f759b27018cc2bc5c203
    // ForwardNameResolver3 contract address: zfy6m8jxVtHp7u8RFYspXwdRNLR4HsbcUC4LDT9WF7ar
}

run()

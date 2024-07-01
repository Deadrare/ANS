import {
    addressFromContractId,
    DeployContractResult,
    DUST_AMOUNT,
    ExecuteScriptResult,
    hexToString,
    ONE_ALPH,
    SignerProvider,
    sleep,
    stringToHex,
    subContractId,
    web3
} from '@alephium/web3'
import { getSigners, randomContractAddress, randomContractId } from '@alephium/web3-test'
import {
    Crop,
    CropInstance,
    DeleteExpired,
    Farm,
    FarmInstance,
    ForwardNameResolver,
    ForwardNameResolverInstance,
    GenerateFarm,
    GenerateToken,
    MintName,
    Name,
    NameInstance,
    RenewName,
    RewardToken,
    RewardTokenInstance,
    SetAddress,
    SetCapitalisation
} from '../../artifacts/ts'
import getConfig from '../../src/config'
import { balanceOf } from '../utils'

const config = getConfig()

export const mockName = async (signer: SignerProvider): Promise<DeployContractResult<NameInstance>> => {
    return await Name.deploy(
        signer,
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
}

export const mockRewardToken = async (signer: SignerProvider): Promise<DeployContractResult<RewardTokenInstance>> => {
    return await RewardToken.deploy(
        signer,
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
}

export const mockCrop = async (signer: SignerProvider): Promise<DeployContractResult<CropInstance>> => {
    return await Crop.deploy(
        signer,
        {
            initialFields: {
                collectionId: randomContractId(),
                nftIndex: 0n,
                name: '',
                expires: 0n
            }
        }
    )
}

export const mockFarm = async (signer: SignerProvider): Promise<DeployContractResult<FarmInstance>> => {
    return await Farm.deploy(
        signer,
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
}

const mockGenerateToken = async (
    signer: SignerProvider,
    forwardNameResolverId: string
): Promise<ExecuteScriptResult> => {
    return await GenerateToken.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId
            },
            attoAlphAmount: ONE_ALPH + DUST_AMOUNT
        }
    )
}

const mockGenerateFarm = async (
    signer: SignerProvider,
    forwardNameResolverId: string
): Promise<ExecuteScriptResult> => {
    return await GenerateFarm.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId
            },
            attoAlphAmount: ONE_ALPH + DUST_AMOUNT
        }
    )
}

export const mockForwardNameResolver = async (
    signer: SignerProvider,
    renewLength = 31_536_000_000n,
    earliestRenew = 2_592_000_000n
): Promise<DeployContractResult<ForwardNameResolverInstance>> => {
    const result1 = await mockName(signer)
    const nameTemplateId = result1.contractInstance.contractId

    const result2 = await mockRewardToken(signer)
    const tokenTemplateId = result2.contractInstance.contractId

    const result3 = await mockFarm(signer)
    const farmTemplateId = result3.contractInstance.contractId

    const result4 = await mockCrop(signer)
    const cropTemplateId = result4.contractInstance.contractId

    const forwardNameResolver = await ForwardNameResolver.deploy(
        signer,
        {
            initialFields: {
                nameTemplateId,
                tokenTemplateId,
                cropTemplateId,
                farmTemplateId,
                collectionUri: '',
                farmCollectionUri: '',
                totalSupply: 0n,
                renewLength: renewLength,
                earliestRenew: earliestRenew
            }
        }
    )
    const forwardNameResolverId = forwardNameResolver.contractInstance.contractId
    await mockGenerateToken(signer, forwardNameResolverId)
    await mockGenerateFarm(signer, forwardNameResolverId)
    return forwardNameResolver
}

const mockMintName = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    name: string,
    capitalisation: string,
    tokenAmount = 0n
): Promise<ExecuteScriptResult> => {
    const forwardNameResolver = new ForwardNameResolverInstance(addressFromContractId(forwardNameResolverId))
    const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
    const tokenTransfer = { id: rewardTokenId, amount: tokenAmount }
    return await MintName.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                name: stringToHex(name),
                capitalisation: stringToHex(capitalisation)
            },
            attoAlphAmount: 2n * ONE_ALPH + DUST_AMOUNT,
            tokens: tokenAmount > 0n ? [tokenTransfer] : []
        }
    )
}

const mockRenewName = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    name: string,
    tokenAmount = 0n
): Promise<ExecuteScriptResult> => {
    const forwardNameResolver = new ForwardNameResolverInstance(addressFromContractId(forwardNameResolverId))
    const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(name) } })).returns
    const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
    const tokenTransfer = { id: rewardTokenId, amount: tokenAmount }
    const nftTransfer = { id: nftId, amount: 1n }
    return await RenewName.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                name: stringToHex(name)
            },
            attoAlphAmount: 2n * DUST_AMOUNT,
            tokens: tokenAmount > 0n ? [tokenTransfer, nftTransfer] : [nftTransfer]
        }
    )
}

const mockDeleteExpired = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    name: string
): Promise<ExecuteScriptResult> => {
    const forwardNameResolver = new ForwardNameResolverInstance(addressFromContractId(forwardNameResolverId))
    const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(name) } })).returns
    return await DeleteExpired.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                name: stringToHex(name)
            },
            attoAlphAmount: DUST_AMOUNT,
            tokens: [
                { id: nftId, amount: 1n }
            ]
        }
    )
}

const mockSetAddress = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    name: string,
    address: string
): Promise<ExecuteScriptResult> => {
    const forwardNameResolver = new ForwardNameResolverInstance(addressFromContractId(forwardNameResolverId))
    const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(name) } })).returns
    return await SetAddress.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                name: stringToHex(name),
                address
            },
            attoAlphAmount: DUST_AMOUNT,
            tokens: [
                { id: nftId, amount: 1n }
            ]
        }
    )
}

const mockSetCapitalisation = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    name: string,
    capitalisation: string,
    usingNft: boolean
): Promise<ExecuteScriptResult> => {
    const forwardNameResolver = new ForwardNameResolverInstance(addressFromContractId(forwardNameResolverId))
    const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(name) } })).returns
    return await SetCapitalisation.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                name: stringToHex(name),
                newCapitalisation: stringToHex(capitalisation)
            },
            attoAlphAmount: DUST_AMOUNT,
            tokens: usingNft ? [{ id: nftId, amount: 1n }] : []
        }
    )
}

describe('ForwardNameResolver', function () {
    const nodeUrl = 'http://127.0.0.1:22973'
    web3.setCurrentNodeProvider(nodeUrl)
    const nodeProvider = web3.getCurrentNodeProvider()

    test('can mint a simple name', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns

        // When
        const newName = 'hello12345'
        await mockMintName(signer, forwardNameResolverId, newName, newName)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 31_536_000_000) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(ONE_ALPH)
    }, 300000)

    test('cannot replace NFT before it has expired', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer, forwardNameResolverId, newName, newName)

        // When
        const mintResult = mockMintName(signer, forwardNameResolverId, newName, newName)

        // Then
        await expect(mintResult).rejects.toThrow(Error)

        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 2000) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(ONE_ALPH)
    }, 300000)

    test('can replace NFT after it has expired', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 100n, 10n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer, forwardNameResolverId, newName, newName)
        await sleep(100)

        // When
        await mockMintName(signer, forwardNameResolverId, newName, newName)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(2n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 100) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(2n * ONE_ALPH)
    }, 300000)

    test('cannot renew NFT before the earliest renew time', async () => {
        // Given
        const [signer1, signer2] = await getSigners(2, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer1.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer1, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer1, forwardNameResolverId, newName, newName)

        // When
        const renewResult = mockRenewName(signer2, forwardNameResolverId, newName)

        // Then
        await expect(renewResult).rejects.toThrow(Error)

        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 2000) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(ONE_ALPH)
    }, 300000)

    test('can renew NFT after the earliest renew time', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 100n, 10n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer, forwardNameResolverId, newName, newName)
        await sleep(100)

        // When
        await mockRenewName(signer, forwardNameResolverId, newName)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 100) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(2n * ONE_ALPH)
    }, 300000)

    test('cannot delete NFT before it has expired', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer, forwardNameResolverId, newName, newName)

        // When
        const mintResult = mockDeleteExpired(signer, forwardNameResolverId, newName)

        // Then
        await expect(mintResult).rejects.toThrow(Error)

        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 2000) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(ONE_ALPH)
    }, 300000)

    test('can delete NFT after it has expired', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 100n, 10n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer, forwardNameResolverId, newName, newName)
        await sleep(100)

        // When
        await mockDeleteExpired(signer, forwardNameResolverId, newName)

        // Then
        const getNftByNameResult = forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })
        await expect(getNftByNameResult).rejects.toThrow(Error)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(ONE_ALPH)
    }, 300000)

    test('cannot mint a name shorter than 8 with no tokens', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId

        // When
        const newName = 'hello'
        const mintResult = mockMintName(signer, forwardNameResolverId, newName, newName)

        // Then
        await expect(mintResult).rejects.toThrow(Error)
    }, 300000)

    test('can create name with length 8 using 100 tokens', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns

        let limit = 100
        while (limit > 0) {
            const name = '12345678' + String(limit)
            await mockMintName(signer, forwardNameResolverId, name, name)
            limit -= 1
        }
        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(100n * ONE_ALPH)

        // When
        const newName = '12345678'
        await mockMintName(signer, forwardNameResolverId, newName, newName, 100n * ONE_ALPH)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(101n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signerAddress)
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 31_536_000_000) / 2000, 0)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(0n)
    }, 300000)

    /// This test is hidden becuase it very slow

    // test('can create name with length 1 using 800 tokens', async () => {
    //     // Given
    //     const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
    //     const signerAddress = (await signer.getSelectedAccount()).address

    //     const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
    //     const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
    //     const forwardNameResolver = forwardNameResolverDeployment.contractInstance
    //     const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns

    //     let limit = 800
    //     while (limit > 0) {
    //         await mockMintName(signer, forwardNameResolverId, '12345678' + String(limit))
    //         limit -= 1
    //     }
    //     expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(800n)

    //     // When
    //     const newName = '1'
    //     await nodeProvider.transactions.postTransactionsSweepAddressBuild({
    //         fromPublicKey: signer.account.publicKey,
    //         toAddress: signerAddress
    //     })
    //     await mockMintName(signer, forwardNameResolverId, newName, 800n)

    //     // Then
    //     const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
    //     const nft = new NameInstance(addressFromContractId(nftId))

    //     const nftState = await nft.fetchState()
    //     expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
    //     expect(nftState.fields.nftIndex).toEqual(801n)
    //     expect(hexToString(nftState.fields.name)).toEqual(newName)
    //     expect(nftState.fields.address).toEqual(signerAddress)
    //     expect(Number(nftState.fields.expires) / 1000).toBeCloseTo((Date.now() + 31_536_000_000) / 1000, 0)

    //     expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(0n)
    // }, 300000)

    test('can setAddress', async () => {
        // Given
        const [signer1, signer2] = await getSigners(2, ONE_ALPH * 1000n, 0)
        const signer1Address = (await signer1.getSelectedAccount()).address
        const signer2Address = (await signer2.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer1, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer1, forwardNameResolverId, newName, newName)

        // When
        await mockSetAddress(signer1, forwardNameResolverId, newName, signer2Address)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newName)
        expect(nftState.fields.address).toEqual(signer2Address)

        expect(await balanceOf(rewardTokenId, signer1Address)).toEqual(ONE_ALPH)
    }, 300000)

    test('can setCapitalisation using NFT ownership', async () => {
        // Given
        const [signer1, signer2] = await getSigners(2, ONE_ALPH * 1000n, 0)
        const signer1Address = (await signer1.getSelectedAccount()).address
        const signer2Address = (await signer2.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer1, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer1, forwardNameResolverId, newName, newName)

        // When
        const newCapitalisation = 'Hello12345'
        await mockSetCapitalisation(signer1, forwardNameResolverId, newName, newCapitalisation, true)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newCapitalisation)
        expect(nftState.fields.address).toEqual(signer1Address)

        expect(await balanceOf(rewardTokenId, signer1Address)).toEqual(ONE_ALPH)
    }, 300000)

    test('can setCapitalisation using address asignment', async () => {
        // Given
        const [signer1, signer2] = await getSigners(2, ONE_ALPH * 1000n, 0)
        const signer1Address = (await signer1.getSelectedAccount()).address
        const signer2Address = (await signer2.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer1, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.methods.getRewardToken()).returns
        const newName = 'hello12345'
        await mockMintName(signer1, forwardNameResolverId, newName, newName)
        await mockSetAddress(signer1, forwardNameResolverId, newName, signer2Address)

        // When
        const newCapitalisation = 'Hello12345'
        await mockSetCapitalisation(signer2, forwardNameResolverId, newName, newCapitalisation, false)

        // Then
        const nftId = (await forwardNameResolver.methods.getNftByName({ args: { name: stringToHex(newName) } })).returns
        const nft = new NameInstance(addressFromContractId(nftId))

        const nftState = await nft.fetchState()
        expect(nftState.fields.collectionId).toEqual(forwardNameResolverId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual(newName)
        expect(hexToString(nftState.fields.capitalisation)).toEqual(newCapitalisation)
        expect(nftState.fields.address).toEqual(signer2Address)

        expect(await balanceOf(rewardTokenId, signer1Address)).toEqual(ONE_ALPH)
    }, 300000)
})

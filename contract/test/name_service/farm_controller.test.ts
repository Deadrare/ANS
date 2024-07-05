import {
    addressFromContractId,
    DUST_AMOUNT,
    ExecuteScriptResult,
    hexToString,
    ONE_ALPH,
    SignerProvider,
    sleep,
    stringToHex,
    web3
} from '@alephium/web3'
import { getSigners } from '@alephium/web3-test'
import {
    CropInstance,
    DeleteCrop,
    FarmInstance,
    MintCrop
} from '../../artifacts/ts'
import getConfig from '../../src/config'
import { alphBalanceOf, balanceOf } from '../utils'
import { mockForwardNameResolver } from './forward_name_resolver.test'

const config = getConfig()

const mockMintCrop = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    alphAmount: bigint
): Promise<ExecuteScriptResult> => {
    return await MintCrop.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                alphAmount
            },
            attoAlphAmount: alphAmount + 2n * DUST_AMOUNT
        }
    )
}

const mockDeleteCrop = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    nftId: string
): Promise<ExecuteScriptResult> => {
    const crop = new CropInstance(addressFromContractId(nftId))
    const nftIndex = (await crop.view.getNFTIndex()).returns
    return await DeleteCrop.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                nftIndex
            },
            attoAlphAmount: DUST_AMOUNT,
            tokens: [
                { id: nftId, amount: 1n }
            ]
        }
    )
}

describe('FarmController', function () {
    const nodeUrl = 'http://127.0.0.1:22973'
    web3.setCurrentNodeProvider(nodeUrl)
    const nodeProvider = web3.getCurrentNodeProvider()

    test('can mint a simple Crop', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.view.getRewardToken()).returns

        // When
        const alphAmount = (2n * ONE_ALPH) / 10n
        await mockMintCrop(signer, forwardNameResolverId, alphAmount)

        // Then
        const farmId = (await forwardNameResolver.view.getFarm()).returns
        const farm = new FarmInstance(addressFromContractId(farmId))
        const cropId = (await farm.view.getCrop({ args: { index: 1n } })).returns
        const crop = new CropInstance(addressFromContractId(cropId))

        const nftState = await crop.fetchState()
        expect(nftState.fields.collectionId).toEqual(farmId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual('1 crops')
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 28_944_000_000) / 2000, 0)

        const traitsCount = (await crop.view.getTraitCount()).returns
        expect(traitsCount).toEqual(2n)
        const trait0 = (await crop.view.getTraitAtIndex({ args: { index: 0n } })).returns
        expect(trait0).toEqual({traitType: stringToHex('Expires'), value: stringToHex(nftState.fields.expires.toString())})
        const trait1 = (await crop.view.getTraitAtIndex({ args: { index: 1n } })).returns
        expect(trait1).toEqual({traitType: stringToHex('ALPH'), value: stringToHex(alphAmount.toString())})

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(ONE_ALPH)
        expect(await alphBalanceOf(addressFromContractId(cropId))).toEqual(alphAmount)
    }, 300000)

    test('can mint a Crop with large amount', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.view.getRewardToken()).returns

        // When
        const alphAmount = 100n * (2n * ONE_ALPH) / 10n
        await mockMintCrop(signer, forwardNameResolverId, alphAmount)

        // Then
        const farmId = (await forwardNameResolver.view.getFarm()).returns
        const farm = new FarmInstance(addressFromContractId(farmId))
        const cropId = (await farm.view.getCrop({ args: { index: 1n } })).returns
        const crop = new CropInstance(addressFromContractId(cropId))

        const nftState = await crop.fetchState()
        expect(nftState.fields.collectionId).toEqual(farmId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual('100 crops')
        expect(Number(nftState.fields.expires) / 2000).toBeCloseTo((Date.now() + 28_944_000_000) / 2000, 0)

        const traitsCount = (await crop.view.getTraitCount()).returns
        expect(traitsCount).toEqual(2n)
        const trait0 = (await crop.view.getTraitAtIndex({ args: { index: 0n } })).returns
        expect(trait0).toEqual({traitType: stringToHex('Expires'), value: stringToHex(nftState.fields.expires.toString())})
        const trait1 = (await crop.view.getTraitAtIndex({ args: { index: 1n } })).returns
        expect(trait1).toEqual({traitType: stringToHex('ALPH'), value: stringToHex(alphAmount.toString())})

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(100n * ONE_ALPH)
        expect(await alphBalanceOf(addressFromContractId(cropId))).toEqual(alphAmount)
    }, 300000)

    test('cannot mint crop with wrong amount', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId

        // When
        const alphAmount = (3n * ONE_ALPH) / 10n
        const mintResult = mockMintCrop(signer, forwardNameResolverId, alphAmount)

        // Then
        await expect(mintResult).rejects.toThrow(Error)
    }, 300000)

    test('cannot delete Crop before it has expired', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 2000n, 1000n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.view.getRewardToken()).returns
        const alphAmount = 100n * (2n * ONE_ALPH) / 10n
        await mockMintCrop(signer, forwardNameResolverId, alphAmount)
        const farmId = (await forwardNameResolver.view.getFarm()).returns
        const farm = new FarmInstance(addressFromContractId(farmId))
        const cropId = (await farm.view.getCrop({ args: { index: 1n } })).returns
        const crop = new CropInstance(addressFromContractId(cropId))

        // When
        const mintResult = mockDeleteCrop(signer, forwardNameResolverId, cropId)

        // Then
        await expect(mintResult).rejects.toThrow(Error)

        const nftState = await crop.fetchState()
        expect(nftState.fields.collectionId).toEqual(farmId)
        expect(nftState.fields.nftIndex).toEqual(1n)
        expect(hexToString(nftState.fields.name)).toEqual('100 crops')
        expect(Number(nftState.fields.expires) / 3000).toBeCloseTo((Date.now() + 2000) / 3000, 0)

        const traitsCount = (await crop.view.getTraitCount()).returns
        expect(traitsCount).toEqual(2n)
        const trait0 = (await crop.view.getTraitAtIndex({ args: { index: 0n } })).returns
        expect(trait0).toEqual({traitType: stringToHex('Expires'), value: stringToHex(nftState.fields.expires.toString())})
        const trait1 = (await crop.view.getTraitAtIndex({ args: { index: 1n } })).returns
        expect(trait1).toEqual({traitType: stringToHex('ALPH'), value: stringToHex(alphAmount.toString())})

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(100n * ONE_ALPH)
        expect(await alphBalanceOf(addressFromContractId(cropId))).toEqual(alphAmount)
    }, 300000)

    test('can delete Crop after it has expired', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockForwardNameResolver(signer, 100n, 10n)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        const rewardTokenId = (await forwardNameResolver.view.getRewardToken()).returns
        const alphAmount = 100n * (2n * ONE_ALPH) / 10n
        await mockMintCrop(signer, forwardNameResolverId, alphAmount)
        const farmId = (await forwardNameResolver.view.getFarm()).returns
        const farm = new FarmInstance(addressFromContractId(farmId))
        const cropId = (await farm.view.getCrop({ args: { index: 1n } })).returns
        const crop = new CropInstance(addressFromContractId(cropId))
        await sleep(100)

        // When
        await mockDeleteCrop(signer, forwardNameResolverId, cropId)

        // Then
        const nftStateResult = crop.fetchState()
        await expect(nftStateResult).rejects.toThrow(Error)

        expect(await balanceOf(rewardTokenId, signerAddress)).toEqual(100n * ONE_ALPH)
    }, 300000)
})

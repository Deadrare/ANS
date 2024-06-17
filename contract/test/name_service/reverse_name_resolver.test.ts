import {
    DeployContractResult,
    DUST_AMOUNT,
    ExecuteScriptResult,
    hexToString,
    ONE_ALPH,
    SignerProvider,
    stringToHex,
    web3
} from '@alephium/web3'
import { getSigners } from '@alephium/web3-test'
import {
    RemoveReverseAddressName,
    ReverseNameResolver,
    ReverseNameResolverInstance,
    SetReverseAddressName
} from '../../artifacts/ts'
import getConfig from '../../src/config'

const config = getConfig()

const mockReverseNameResolver = async (
    signer: SignerProvider
): Promise<DeployContractResult<ReverseNameResolverInstance>> => {
    return await ReverseNameResolver.deploy(
        signer,
        {
            initialFields: {}
        }
    )
}

const mockSetReverseAddressName = async (
    signer: SignerProvider,
    forwardNameResolverId: string,
    name: string
): Promise<ExecuteScriptResult> => {
    return await SetReverseAddressName.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId,
                name: stringToHex(name)
            },
            attoAlphAmount: 1n * ONE_ALPH + DUST_AMOUNT
        }
    )
}

const mockRemoveReverseAddressName = async (
    signer: SignerProvider,
    forwardNameResolverId: string
): Promise<ExecuteScriptResult> => {
    return await RemoveReverseAddressName.execute(
        signer,
        {
            initialFields: {
                forwardNameResolverId
            },
            attoAlphAmount: DUST_AMOUNT
        }
    )
}

describe('ReverseNameResolver', function () {
    const nodeUrl = 'http://127.0.0.1:22973'
    web3.setCurrentNodeProvider(nodeUrl)
    const nodeProvider = web3.getCurrentNodeProvider()

    test('can set address', async () => {
        // Given
        const [signer] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signerAddress = (await signer.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockReverseNameResolver(signer)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance

        // When
        const newName = 'hello12345'
        await mockSetReverseAddressName(signer, forwardNameResolverId, newName)

        // Then
        const name = (await forwardNameResolver.methods.getNameByAddress({ args: { address: signerAddress } })).returns
        expect(hexToString(name)).toEqual(newName)
    }, 300000)

    test('can set address twice', async () => {
        // Given
        const [signer1] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signer1Address = (await signer1.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockReverseNameResolver(signer1)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        await mockSetReverseAddressName(signer1, forwardNameResolverId, 'yo')

        // When
        const newName = 'hello12345'
        await mockSetReverseAddressName(signer1, forwardNameResolverId, newName)

        // Then
        const name = (await forwardNameResolver.methods.getNameByAddress({ args: { address: signer1Address } })).returns
        expect(hexToString(name)).toEqual(newName)
    }, 300000)

    test('can remove address', async () => {
        // Given
        const [signer1] = await getSigners(1, ONE_ALPH * 1000n, 0)
        const signer1Address = (await signer1.getSelectedAccount()).address

        const forwardNameResolverDeployment = await mockReverseNameResolver(signer1)
        const forwardNameResolverId = forwardNameResolverDeployment.contractInstance.contractId
        const forwardNameResolver = forwardNameResolverDeployment.contractInstance
        await mockSetReverseAddressName(signer1, forwardNameResolverId, 'yo')

        // When
        await mockRemoveReverseAddressName(signer1, forwardNameResolverId)

        // Then
        const result = forwardNameResolver.methods.getNameByAddress({ args: { address: signer1Address } })
        await expect(result).rejects.toThrow(Error)
    }, 300000)
})

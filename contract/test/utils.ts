import { ContractState, number256ToBigint, web3 } from '@alephium/web3'

export const alphBalanceOf = async (address: string): Promise<bigint> => {
    const balances = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
    const balance = balances.balance
    return balance === undefined ? 0n : BigInt(balance)
}

export const balanceOf = async (tokenId: string, address: string): Promise<bigint> => {
    const balances = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
    const balance = balances.tokenBalances?.find((t) => t.id === tokenId)
    return balance === undefined ? 0n : BigInt(balance.amount)
}

export const contractBalanceOf = (state: ContractState, tokenId: string): bigint => {
    const token = state.asset.tokens?.find((t) => t.id === tokenId)
    return token === undefined ? 0n : number256ToBigint(token.amount)
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as ReverseNameResolverContractJson } from "../reverse_name_resolver/ReverseNameResolver.ral.json";
import { getContractByCodeHash } from "./contracts";
import { Trait, AllStructs } from "./types";
import { RalphMap } from "@alephium/web3";

// Custom types for the contract
export namespace ReverseNameResolverTypes {
  export type State = Omit<ContractState<any>, "fields">;
  export type NameCreatedEvent = ContractEvent<{
    nftIndex: bigint;
    name: HexString;
    capitalisation: HexString;
    creator: Address;
    expires: bigint;
  }>;
  export type NameRenewedEvent = ContractEvent<{
    nftIndex: bigint;
    name: HexString;
    renewer: Address;
    expires: bigint;
  }>;
  export type AddressSetEvent = ContractEvent<{
    nftIndex: bigint;
    name: HexString;
    newAddress: Address;
  }>;
  export type CapitalisationSetEvent = ContractEvent<{
    nftIndex: bigint;
    name: HexString;
    newCapitalisation: HexString;
  }>;
  export type NameDeletedEvent = ContractEvent<{
    nftIndex: bigint;
    name: HexString;
    deleter: Address;
  }>;
  export type ReverseAddressSetEvent = ContractEvent<{
    address: Address;
    newName: HexString;
  }>;
  export type ReverseAddressDeletedEvent = ContractEvent<{
    address: Address;
    name: HexString;
  }>;
  export type CropCreatedEvent = ContractEvent<{
    nftIndex: bigint;
    amount: bigint;
    creator: Address;
    expires: bigint;
  }>;
  export type CropDeletedEvent = ContractEvent<{
    nftIndex: bigint;
    deleter: Address;
  }>;

  export interface CallMethodTable {
    getNameByAddress: {
      params: CallContractParams<{ address: Address }>;
      result: CallContractResult<HexString>;
    };
    containsNameByAddress: {
      params: CallContractParams<{ address: Address }>;
      result: CallContractResult<boolean>;
    };
    setAddressName: {
      params: CallContractParams<{ name: HexString }>;
      result: CallContractResult<null>;
    };
    removeAddress: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<null>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> =
    Callss["length"] extends 1
      ? MultiCallResults<Callss[0]>
      : { [index in keyof Callss]: MultiCallResults<Callss[index]> };

  export interface SignExecuteMethodTable {
    getNameByAddress: {
      params: SignExecuteContractMethodParams<{ address: Address }>;
      result: SignExecuteScriptTxResult;
    };
    containsNameByAddress: {
      params: SignExecuteContractMethodParams<{ address: Address }>;
      result: SignExecuteScriptTxResult;
    };
    setAddressName: {
      params: SignExecuteContractMethodParams<{ name: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    removeAddress: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<ReverseNameResolverInstance, {}> {
  encodeFields() {
    return encodeContractFields({}, this.contract.fieldsSig, AllStructs);
  }

  eventIndex = {
    NameCreated: 0,
    NameRenewed: 1,
    AddressSet: 2,
    CapitalisationSet: 3,
    NameDeleted: 4,
    ReverseAddressSet: 5,
    ReverseAddressDeleted: 6,
    CropCreated: 7,
    CropDeleted: 8,
  };
  consts = {
    ErrorCodes: {
      OnlyParentAllowed: BigInt("0"),
      NFTNotFound: BigInt("1"),
      NFTNotPartOfCollection: BigInt("2"),
      OnlyNftOwnerAllowed: BigInt("3"),
      NameHasNotExpired: BigInt("4"),
      CannotRenewName: BigInt("5"),
      TokenAlreadyGenerated: BigInt("6"),
      ReverseAddressNotFound: BigInt("7"),
      OnlyNftOwnerOrHolderAllowed: BigInt("8"),
      IncorrectFarmInputAmount: BigInt("9"),
      CropHasNotExpired: BigInt("10"),
      FarmInputAmountNotConsumed: BigInt("11"),
      FarmAlreadyGenerated: BigInt("12"),
    },
    Keys: { Names: "01", Token: "02", Farm: "03" },
  };

  at(address: string): ReverseNameResolverInstance {
    return new ReverseNameResolverInstance(address);
  }

  tests = {
    getNameByAddress: async (
      params: Omit<
        TestContractParams<
          never,
          { address: Address },
          { addressNames?: Map<Address, HexString> }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<HexString, { addressNames?: Map<Address, HexString> }>
    > => {
      return testMethod(
        this,
        "getNameByAddress",
        params,
        getContractByCodeHash
      );
    },
    containsNameByAddress: async (
      params: Omit<
        TestContractParams<
          never,
          { address: Address },
          { addressNames?: Map<Address, HexString> }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<boolean, { addressNames?: Map<Address, HexString> }>
    > => {
      return testMethod(
        this,
        "containsNameByAddress",
        params,
        getContractByCodeHash
      );
    },
    setAddressName: async (
      params: Omit<
        TestContractParams<
          never,
          { name: HexString },
          { addressNames?: Map<Address, HexString> }
        >,
        "initialFields"
      >
    ): Promise<
      TestContractResult<null, { addressNames?: Map<Address, HexString> }>
    > => {
      return testMethod(this, "setAddressName", params, getContractByCodeHash);
    },
    removeAddress: async (
      params?: Omit<
        TestContractParams<
          never,
          never,
          { addressNames?: Map<Address, HexString> }
        >,
        "testArgs" | "initialFields"
      >
    ): Promise<
      TestContractResult<null, { addressNames?: Map<Address, HexString> }>
    > => {
      return testMethod(
        this,
        "removeAddress",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };
}

// Use this object to test and deploy the contract
export const ReverseNameResolver = new Factory(
  Contract.fromJson(
    ReverseNameResolverContractJson,
    "=14-2+b6=1-3+129=141-1+5=107-1+c=40+7a7e0214696e73657274206174206d617020706174683a2000=37-1+4=146+7a7e021472656d6f7665206174206d617020706174683a2000=20",
    "57983c35b982d4623e6ac3dd4406f25e4c4e3f20715733488625a08d47f22fd5",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class ReverseNameResolverInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  maps = {
    addressNames: new RalphMap<Address, HexString>(
      ReverseNameResolver.contract,
      this.contractId,
      "addressNames"
    ),
  };

  async fetchState(): Promise<ReverseNameResolverTypes.State> {
    return fetchContractState(ReverseNameResolver, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeNameCreatedEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.NameCreatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "NameCreated",
      fromCount
    );
  }

  subscribeNameRenewedEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.NameRenewedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "NameRenewed",
      fromCount
    );
  }

  subscribeAddressSetEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.AddressSetEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "AddressSet",
      fromCount
    );
  }

  subscribeCapitalisationSetEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.CapitalisationSetEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "CapitalisationSet",
      fromCount
    );
  }

  subscribeNameDeletedEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.NameDeletedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "NameDeleted",
      fromCount
    );
  }

  subscribeReverseAddressSetEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.ReverseAddressSetEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "ReverseAddressSet",
      fromCount
    );
  }

  subscribeReverseAddressDeletedEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.ReverseAddressDeletedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "ReverseAddressDeleted",
      fromCount
    );
  }

  subscribeCropCreatedEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.CropCreatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "CropCreated",
      fromCount
    );
  }

  subscribeCropDeletedEvent(
    options: EventSubscribeOptions<ReverseNameResolverTypes.CropDeletedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      ReverseNameResolver.contract,
      this,
      options,
      "CropDeleted",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | ReverseNameResolverTypes.NameCreatedEvent
      | ReverseNameResolverTypes.NameRenewedEvent
      | ReverseNameResolverTypes.AddressSetEvent
      | ReverseNameResolverTypes.CapitalisationSetEvent
      | ReverseNameResolverTypes.NameDeletedEvent
      | ReverseNameResolverTypes.ReverseAddressSetEvent
      | ReverseNameResolverTypes.ReverseAddressDeletedEvent
      | ReverseNameResolverTypes.CropCreatedEvent
      | ReverseNameResolverTypes.CropDeletedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      ReverseNameResolver.contract,
      this,
      options,
      fromCount
    );
  }

  view = {
    getNameByAddress: async (
      params: ReverseNameResolverTypes.CallMethodParams<"getNameByAddress">
    ): Promise<
      ReverseNameResolverTypes.CallMethodResult<"getNameByAddress">
    > => {
      return callMethod(
        ReverseNameResolver,
        this,
        "getNameByAddress",
        params,
        getContractByCodeHash
      );
    },
    containsNameByAddress: async (
      params: ReverseNameResolverTypes.CallMethodParams<"containsNameByAddress">
    ): Promise<
      ReverseNameResolverTypes.CallMethodResult<"containsNameByAddress">
    > => {
      return callMethod(
        ReverseNameResolver,
        this,
        "containsNameByAddress",
        params,
        getContractByCodeHash
      );
    },
    setAddressName: async (
      params: ReverseNameResolverTypes.CallMethodParams<"setAddressName">
    ): Promise<ReverseNameResolverTypes.CallMethodResult<"setAddressName">> => {
      return callMethod(
        ReverseNameResolver,
        this,
        "setAddressName",
        params,
        getContractByCodeHash
      );
    },
    removeAddress: async (
      params?: ReverseNameResolverTypes.CallMethodParams<"removeAddress">
    ): Promise<ReverseNameResolverTypes.CallMethodResult<"removeAddress">> => {
      return callMethod(
        ReverseNameResolver,
        this,
        "removeAddress",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getNameByAddress: async (
      params: ReverseNameResolverTypes.SignExecuteMethodParams<"getNameByAddress">
    ): Promise<
      ReverseNameResolverTypes.SignExecuteMethodResult<"getNameByAddress">
    > => {
      return signExecuteMethod(
        ReverseNameResolver,
        this,
        "getNameByAddress",
        params
      );
    },
    containsNameByAddress: async (
      params: ReverseNameResolverTypes.SignExecuteMethodParams<"containsNameByAddress">
    ): Promise<
      ReverseNameResolverTypes.SignExecuteMethodResult<"containsNameByAddress">
    > => {
      return signExecuteMethod(
        ReverseNameResolver,
        this,
        "containsNameByAddress",
        params
      );
    },
    setAddressName: async (
      params: ReverseNameResolverTypes.SignExecuteMethodParams<"setAddressName">
    ): Promise<
      ReverseNameResolverTypes.SignExecuteMethodResult<"setAddressName">
    > => {
      return signExecuteMethod(
        ReverseNameResolver,
        this,
        "setAddressName",
        params
      );
    },
    removeAddress: async (
      params: ReverseNameResolverTypes.SignExecuteMethodParams<"removeAddress">
    ): Promise<
      ReverseNameResolverTypes.SignExecuteMethodResult<"removeAddress">
    > => {
      return signExecuteMethod(
        ReverseNameResolver,
        this,
        "removeAddress",
        params
      );
    },
  };

  async multicall<Callss extends ReverseNameResolverTypes.MultiCallParams[]>(
    ...callss: Callss
  ): Promise<ReverseNameResolverTypes.MulticallReturnType<Callss>> {
    return (await multicallMethods(
      ReverseNameResolver,
      this,
      callss,
      getContractByCodeHash
    )) as ReverseNameResolverTypes.MulticallReturnType<Callss>;
  }
}

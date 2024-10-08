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
import { default as CropContractJson } from "../farm/Crop.ral.json";
import { getContractByCodeHash } from "./contracts";
import { Trait, AllStructs } from "./types";

// Custom types for the contract
export namespace CropTypes {
  export type Fields = {
    collectionId: HexString;
    nftIndex: bigint;
    name: HexString;
    alphAmount: bigint;
    expires: bigint;
  };

  export type State = ContractState<Fields>;

  export type MetadataUpdatedEvent = ContractEvent<{}>;

  export interface CallMethodTable {
    getTokenUri: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getCollectionIndex: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[HexString, bigint]>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDescription: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getImage: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getTraitCount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTraitAtIndex: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<Trait>;
    };
    getNFTIndex: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getExpires: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getAlphAmount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    setExpires: {
      params: CallContractParams<{ newExpires: bigint }>;
      result: CallContractResult<null>;
    };
    delete: {
      params: CallContractParams<{ refundAddress: Address }>;
      result: CallContractResult<null>;
    };
    getTraits: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[Trait, Trait]>;
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
    getTokenUri: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getCollectionIndex: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getName: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getDescription: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getImage: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getTraitCount: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getTraitAtIndex: {
      params: SignExecuteContractMethodParams<{ index: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    getNFTIndex: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getExpires: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getAlphAmount: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    setExpires: {
      params: SignExecuteContractMethodParams<{ newExpires: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    delete: {
      params: SignExecuteContractMethodParams<{ refundAddress: Address }>;
      result: SignExecuteScriptTxResult;
    };
    getTraits: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<CropInstance, CropTypes.Fields> {
  encodeFields(fields: CropTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { MetadataUpdated: 0 };
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

  at(address: string): CropInstance {
    return new CropInstance(address);
  }

  tests = {
    getTokenUri: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getTokenUri", params, getContractByCodeHash);
    },
    getCollectionIndex: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<[HexString, bigint]>> => {
      return testMethod(
        this,
        "getCollectionIndex",
        params,
        getContractByCodeHash
      );
    },
    getName: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getName", params, getContractByCodeHash);
    },
    getDescription: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getDescription", params, getContractByCodeHash);
    },
    getImage: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getImage", params, getContractByCodeHash);
    },
    getTraitCount: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getTraitCount", params, getContractByCodeHash);
    },
    getTraitAtIndex: async (
      params: TestContractParamsWithoutMaps<CropTypes.Fields, { index: bigint }>
    ): Promise<TestContractResultWithoutMaps<Trait>> => {
      return testMethod(this, "getTraitAtIndex", params, getContractByCodeHash);
    },
    getNFTIndex: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getNFTIndex", params, getContractByCodeHash);
    },
    getExpires: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getExpires", params, getContractByCodeHash);
    },
    getAlphAmount: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getAlphAmount", params, getContractByCodeHash);
    },
    setExpires: async (
      params: TestContractParamsWithoutMaps<
        CropTypes.Fields,
        { newExpires: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "setExpires", params, getContractByCodeHash);
    },
    delete: async (
      params: TestContractParamsWithoutMaps<
        CropTypes.Fields,
        { refundAddress: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "delete", params, getContractByCodeHash);
    },
    getTraits: async (
      params: Omit<
        TestContractParamsWithoutMaps<CropTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<[Trait, Trait]>> => {
      return testMethod(this, "getTraits", params, getContractByCodeHash);
    },
  };
}

// Use this object to test and deploy the contract
export const Crop = new Factory(
  Contract.fromJson(
    CropContractJson,
    "",
    "1b2f163495ed25072e283e298f15097b0299fd16e910722521cda99deeb877a0",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class CropInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<CropTypes.State> {
    return fetchContractState(Crop, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMetadataUpdatedEvent(
    options: EventSubscribeOptions<CropTypes.MetadataUpdatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Crop.contract,
      this,
      options,
      "MetadataUpdated",
      fromCount
    );
  }

  view = {
    getTokenUri: async (
      params?: CropTypes.CallMethodParams<"getTokenUri">
    ): Promise<CropTypes.CallMethodResult<"getTokenUri">> => {
      return callMethod(
        Crop,
        this,
        "getTokenUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getCollectionIndex: async (
      params?: CropTypes.CallMethodParams<"getCollectionIndex">
    ): Promise<CropTypes.CallMethodResult<"getCollectionIndex">> => {
      return callMethod(
        Crop,
        this,
        "getCollectionIndex",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: CropTypes.CallMethodParams<"getName">
    ): Promise<CropTypes.CallMethodResult<"getName">> => {
      return callMethod(
        Crop,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDescription: async (
      params?: CropTypes.CallMethodParams<"getDescription">
    ): Promise<CropTypes.CallMethodResult<"getDescription">> => {
      return callMethod(
        Crop,
        this,
        "getDescription",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getImage: async (
      params?: CropTypes.CallMethodParams<"getImage">
    ): Promise<CropTypes.CallMethodResult<"getImage">> => {
      return callMethod(
        Crop,
        this,
        "getImage",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTraitCount: async (
      params?: CropTypes.CallMethodParams<"getTraitCount">
    ): Promise<CropTypes.CallMethodResult<"getTraitCount">> => {
      return callMethod(
        Crop,
        this,
        "getTraitCount",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTraitAtIndex: async (
      params: CropTypes.CallMethodParams<"getTraitAtIndex">
    ): Promise<CropTypes.CallMethodResult<"getTraitAtIndex">> => {
      return callMethod(
        Crop,
        this,
        "getTraitAtIndex",
        params,
        getContractByCodeHash
      );
    },
    getNFTIndex: async (
      params?: CropTypes.CallMethodParams<"getNFTIndex">
    ): Promise<CropTypes.CallMethodResult<"getNFTIndex">> => {
      return callMethod(
        Crop,
        this,
        "getNFTIndex",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getExpires: async (
      params?: CropTypes.CallMethodParams<"getExpires">
    ): Promise<CropTypes.CallMethodResult<"getExpires">> => {
      return callMethod(
        Crop,
        this,
        "getExpires",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getAlphAmount: async (
      params?: CropTypes.CallMethodParams<"getAlphAmount">
    ): Promise<CropTypes.CallMethodResult<"getAlphAmount">> => {
      return callMethod(
        Crop,
        this,
        "getAlphAmount",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    setExpires: async (
      params: CropTypes.CallMethodParams<"setExpires">
    ): Promise<CropTypes.CallMethodResult<"setExpires">> => {
      return callMethod(
        Crop,
        this,
        "setExpires",
        params,
        getContractByCodeHash
      );
    },
    delete: async (
      params: CropTypes.CallMethodParams<"delete">
    ): Promise<CropTypes.CallMethodResult<"delete">> => {
      return callMethod(Crop, this, "delete", params, getContractByCodeHash);
    },
    getTraits: async (
      params?: CropTypes.CallMethodParams<"getTraits">
    ): Promise<CropTypes.CallMethodResult<"getTraits">> => {
      return callMethod(
        Crop,
        this,
        "getTraits",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getTokenUri: async (
      params: CropTypes.SignExecuteMethodParams<"getTokenUri">
    ): Promise<CropTypes.SignExecuteMethodResult<"getTokenUri">> => {
      return signExecuteMethod(Crop, this, "getTokenUri", params);
    },
    getCollectionIndex: async (
      params: CropTypes.SignExecuteMethodParams<"getCollectionIndex">
    ): Promise<CropTypes.SignExecuteMethodResult<"getCollectionIndex">> => {
      return signExecuteMethod(Crop, this, "getCollectionIndex", params);
    },
    getName: async (
      params: CropTypes.SignExecuteMethodParams<"getName">
    ): Promise<CropTypes.SignExecuteMethodResult<"getName">> => {
      return signExecuteMethod(Crop, this, "getName", params);
    },
    getDescription: async (
      params: CropTypes.SignExecuteMethodParams<"getDescription">
    ): Promise<CropTypes.SignExecuteMethodResult<"getDescription">> => {
      return signExecuteMethod(Crop, this, "getDescription", params);
    },
    getImage: async (
      params: CropTypes.SignExecuteMethodParams<"getImage">
    ): Promise<CropTypes.SignExecuteMethodResult<"getImage">> => {
      return signExecuteMethod(Crop, this, "getImage", params);
    },
    getTraitCount: async (
      params: CropTypes.SignExecuteMethodParams<"getTraitCount">
    ): Promise<CropTypes.SignExecuteMethodResult<"getTraitCount">> => {
      return signExecuteMethod(Crop, this, "getTraitCount", params);
    },
    getTraitAtIndex: async (
      params: CropTypes.SignExecuteMethodParams<"getTraitAtIndex">
    ): Promise<CropTypes.SignExecuteMethodResult<"getTraitAtIndex">> => {
      return signExecuteMethod(Crop, this, "getTraitAtIndex", params);
    },
    getNFTIndex: async (
      params: CropTypes.SignExecuteMethodParams<"getNFTIndex">
    ): Promise<CropTypes.SignExecuteMethodResult<"getNFTIndex">> => {
      return signExecuteMethod(Crop, this, "getNFTIndex", params);
    },
    getExpires: async (
      params: CropTypes.SignExecuteMethodParams<"getExpires">
    ): Promise<CropTypes.SignExecuteMethodResult<"getExpires">> => {
      return signExecuteMethod(Crop, this, "getExpires", params);
    },
    getAlphAmount: async (
      params: CropTypes.SignExecuteMethodParams<"getAlphAmount">
    ): Promise<CropTypes.SignExecuteMethodResult<"getAlphAmount">> => {
      return signExecuteMethod(Crop, this, "getAlphAmount", params);
    },
    setExpires: async (
      params: CropTypes.SignExecuteMethodParams<"setExpires">
    ): Promise<CropTypes.SignExecuteMethodResult<"setExpires">> => {
      return signExecuteMethod(Crop, this, "setExpires", params);
    },
    delete: async (
      params: CropTypes.SignExecuteMethodParams<"delete">
    ): Promise<CropTypes.SignExecuteMethodResult<"delete">> => {
      return signExecuteMethod(Crop, this, "delete", params);
    },
    getTraits: async (
      params: CropTypes.SignExecuteMethodParams<"getTraits">
    ): Promise<CropTypes.SignExecuteMethodResult<"getTraits">> => {
      return signExecuteMethod(Crop, this, "getTraits", params);
    },
  };

  async multicall<Callss extends CropTypes.MultiCallParams[]>(
    ...callss: Callss
  ): Promise<CropTypes.MulticallReturnType<Callss>> {
    return (await multicallMethods(
      Crop,
      this,
      callss,
      getContractByCodeHash
    )) as CropTypes.MulticallReturnType<Callss>;
  }
}

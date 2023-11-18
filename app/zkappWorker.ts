import { Mina, PublicKey, fetchAccount, UInt32, Field, Poseidon } from "o1js";
import * as math from 'mathjs';
import { nnClassifier } from "@/contracts/src/modelGen";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { NNClassifier } from "@/contracts/src/NNClassifier";
import { floatToFixedQ1616 } from "@/contracts/src/helper";

const state = {
  NNClassifier: null as null | typeof NNClassifier,
  zkapp: null as null | NNClassifier,
  transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    console.log("Berkeley Instance Created");
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { NNClassifier } = await import("@/contracts/build/src/NNClassifier");
    state.NNClassifier = NNClassifier;
  },
  compileContract: async (args: {}) => {
    await state.NNClassifier!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.NNClassifier!(publicKey);
  },
  getResult: async (args: { }) => {
    const result = await state.zkapp!.result.get();
    return JSON.stringify(result);
  },

  runZkml: async (args: {in: number[]}) => {
    console.log(args.in)
    const inputMatrix = math.matrix(args.in);

    const [output, maxIndex, probability] = nnClassifier(inputMatrix);
    const outputArray = output.valueOf() as number[];
 
    const outputField = outputArray.map((x) => Field(floatToFixedQ1616(x)));
    const outputHash = Poseidon.hash(outputField);



    const input = args.in.map((x) => Field(floatToFixedQ1616(x)));
    const transaction = await Mina.transaction(() => {
      state.zkapp!.createMLProof(
        input[0],
        input[1],
        input[2],
        input[3],
        input[4],
        input[5],
        input[6],
        input[7],
        input[8],
        input[9],
        input[10],
        input[11],
        input[12],
        input[13],
        input[14],
        input[15],
        input[16],
        input[17],
        input[18],
        input[19],
        input[20],
        input[21],
        input[22],
        input[23],
        input[24],
        input[25],
        input[26],
        input[27],
        input[28],
        input[29],
        input[30],
        input[31],
        input[32],
        input[33],
        input[34],
        input[35],
        input[36],
        input[37],
        input[38],
        input[39],
        input[40],
        input[41],
        input[42],
        input[43],
        input[44],
        input[45],
        input[46],
        input[47],
        input[48],
        input[49],
        input[50],
        input[51],
        input[52],
        input[53],
        input[54],
        input[55],
        input[56],
        input[57],
        input[58],
        input[59],
        input[60],
        input[61],
        input[62],
        input[63],
        input[64],
        input[65],
        input[66],
        input[67],
        input[68],
        input[69],
        input[70],
        input[71],
        input[72],
        input[73],
        input[74],
        input[75],
        input[76],
        input[77],
        input[78],
        input[79],
        input[80],
        input[81],
        input[82],
        input[83],
        input[84],
        input[85],
        input[86],
        input[87],
        input[88],
        input[89],
        input[90],
        input[91],
        input[92],
        input[93],
        input[94],
        input[95],
        input[96],
        input[97],
        input[98],
        input[99],
        input[100],
        input[101],
        input[102],
        input[103],
        input[104],
        input[105],
        input[106],
        input[107],
        input[108],
        input[109],
        input[110],
        input[111],
        input[112],
        input[113],
        input[114],
        input[115],
        input[116],
        input[117],
        input[118],
        input[119],
        input[120],
        input[121],
        input[122],
        input[123],
        input[124],
        input[125],
        input[126],
        input[127],
        input[128],
        input[129],
        input[130],
        input[131],
        input[132],
        input[133],
        input[134],
        input[135],
        input[136],
        input[137],
        input[138],
        input[139],
        input[140],
        input[141],
        input[142],
        input[143],
        input[144],
        input[145],
        input[146],
        input[147],
        input[148],
        input[149],
        input[150],
        input[151],
        input[152],
        input[153],
        input[154],
        input[155],
        input[156],
        input[157],
        input[158],
        input[159],
        input[160],
        input[161],
        input[162],
        input[163],
        input[164],
        input[165],
        input[166],
        input[167],
        input[168],
        input[169],
        input[170],
        input[171],
        input[172],
        input[173],
        input[174],
        input[175],
        input[176],
        input[177],
        input[178],
        input[179],
        input[180],
        input[181],
        input[182],
        input[183],
        input[184],
        input[185],
        input[186],
        input[187],
        input[188],
        input[189],
        input[190],
        input[191],
        input[192],
        input[193],
        input[194],
        input[195],
        outputHash
      );
    });
    state.transaction = transaction;
    return [outputArray, maxIndex, probability];
  },
  // getBallot: async (args: {}) => {
  //   const currentBallot = await state.zkapp!.ballot.get();
  //   return JSON.stringify(currentBallot);
  // },
  // cast: async (args: { candidate: number }) => {
  //   const transaction = await Mina.transaction(() => {
  //     state.zkapp!.cast(UInt32.from(args.candidate));
  //   });
  //   state.transaction = transaction;
  // },
  proveTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== "undefined") {
  addEventListener(
    "message",
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  );
}

console.log("Web Worker Successfully Initialized.");

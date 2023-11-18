import {
  Field,
  Scalar,
  SmartContract,
  state,
  State,
  method,
  Provable,
  MerkleTree,
  MerkleWitness,
  Struct,
} from 'o1js';
import { model, floatToFixedQ1616, fixedQ1616ToFloat } from './helper.js';
import { nnClassifier } from './modelGen.js';
import * as mathjs from 'mathjs';

export const inputSize = 8; // Total Number of Inputs 2**8 = 256 > 196

export class InputListMerkleWitness extends MerkleWitness(inputSize + 1) {}

export class inputDataStruct extends Struct({
  inputListWitness: InputListMerkleWitness,
  votersMerkleTreeRoot: Field,
}) {}

export class NNClassifier extends SmartContract {
  @state(Field) result = State<Field>();
  @state(Field) probability = State<Field>();
  @state(Field) inputsMerkleRoot = State<Field>();

  init() {
    super.init();
    this.result.set(Field(0));
    this.probability.set(Field(0));
  }

  @method update(
    in1: Field,
    in2: Field,
    in3: Field,
    in4: Field,
    in5: Field,
    in6: Field,
    in7: Field,
    in8: Field,
    in9: Field,
    in10: Field,
    in11: Field,
    in12: Field,
    in13: Field,
    in14: Field,
    in15: Field,
    in16: Field,
    in17: Field,
    in18: Field,
    in19: Field,
    in20: Field,
    in21: Field,
    in22: Field,
    in23: Field,
    in24: Field,
    in25: Field,
    in26: Field,
    in27: Field,
    in28: Field,
    in29: Field,
    in30: Field,
    in31: Field,
    in32: Field,
    in33: Field,
    in34: Field,
    in35: Field,
    in36: Field,
    in37: Field,
    in38: Field,
    in39: Field,
    in40: Field,
    in41: Field,
    in42: Field,
    in43: Field,
    in44: Field,
    in45: Field,
    in46: Field,
    in47: Field,
    in48: Field,
    in49: Field,
    in50: Field,
    in51: Field,
    in52: Field,
    in53: Field,
    in54: Field,
    in55: Field,
    in56: Field,
    in57: Field,
    in58: Field,
    in59: Field,
    in60: Field,
    in61: Field,
    in62: Field,
    in63: Field,
    in64: Field,
    in65: Field,
    in66: Field,
    in67: Field,
    in68: Field,
    in69: Field,
    in70: Field,
    in71: Field,
    in72: Field,
    in73: Field,
    in74: Field,
    in75: Field,
    in76: Field,
    in77: Field,
    in78: Field,
    in79: Field,
    in80: Field,
    in81: Field,
    in82: Field,
    in83: Field,
    in84: Field,
    in85: Field,
    in86: Field,
    in87: Field,
    in88: Field,
    in89: Field,
    in90: Field,
    in91: Field,
    in92: Field,
    in93: Field,
    in94: Field,
    in95: Field,
    in96: Field,
    in97: Field,
    in98: Field,
    in99: Field,
    in100: Field,
    in101: Field,
    in102: Field,
    in103: Field,
    in104: Field,
    in105: Field,
    in106: Field,
    in107: Field,
    in108: Field,
    in109: Field,
    in110: Field,
    in111: Field,
    in112: Field,
    in113: Field,
    in114: Field,
    in115: Field,
    in116: Field,
    in117: Field,
    in118: Field,
    in119: Field,
    in120: Field,
    in121: Field,
    in122: Field,
    in123: Field,
    in124: Field,
    in125: Field,
    in126: Field,
    in127: Field,
    in128: Field,
    in129: Field,
    in130: Field,
    in131: Field,
    in132: Field,
    in133: Field,
    in134: Field,
    in135: Field,
    in136: Field,
    in137: Field,
    in138: Field,
    in139: Field,
    in140: Field,
    in141: Field,
    in142: Field,
    in143: Field,
    in144: Field,
    in145: Field,
    in146: Field,
    in147: Field,
    in148: Field,
    in149: Field,
    in150: Field,
    in151: Field,
    in152: Field,
    in153: Field,
    in154: Field,
    in155: Field,
    in156: Field,
    in157: Field,
    in158: Field,
    in159: Field,
    in160: Field,
    in161: Field,
    in162: Field,
    in163: Field,
    in164: Field,
    in165: Field,
    in166: Field,
    in167: Field,
    in168: Field,
    in169: Field,
    in170: Field,
    in171: Field,
    in172: Field,
    in173: Field,
    in174: Field,
    in175: Field,
    in176: Field,
    in177: Field,
    in178: Field,
    in179: Field,
    in180: Field,
    in181: Field,
    in182: Field,
    in183: Field,
    in184: Field,
    in185: Field,
    in186: Field,
    in187: Field,
    in188: Field,
    in189: Field,
    in190: Field,
    in191: Field,
    in192: Field,
    in193: Field,
    in194: Field,
    in195: Field,
    in196: Field
  ) {
    const currentState1 = this.result.getAndAssertEquals();
    const currentState2 = this.probability.getAndAssertEquals();

    // const inputBigInt = secretInput.toBigInt();
    // Provable.log(inputBigInt.toString());
    Provable.asProver(() => {
      const inputBigInts = [
        in1.toBigInt(),
        in2.toBigInt(),
        in3.toBigInt(),
        in4.toBigInt(),
        in5.toBigInt(),
        in6.toBigInt(),
        in7.toBigInt(),
        in8.toBigInt(),
        in9.toBigInt(),
        in10.toBigInt(),
        in11.toBigInt(),
        in12.toBigInt(),
        in13.toBigInt(),
        in14.toBigInt(),
        in15.toBigInt(),
        in16.toBigInt(),
        in17.toBigInt(),
        in18.toBigInt(),
        in19.toBigInt(),
        in20.toBigInt(),
        in21.toBigInt(),
        in22.toBigInt(),
        in23.toBigInt(),
        in24.toBigInt(),
        in25.toBigInt(),
        in26.toBigInt(),
        in27.toBigInt(),
        in28.toBigInt(),
        in29.toBigInt(),
        in30.toBigInt(),
        in31.toBigInt(),
        in32.toBigInt(),
        in33.toBigInt(),
        in34.toBigInt(),
        in35.toBigInt(),
        in36.toBigInt(),
        in37.toBigInt(),
        in38.toBigInt(),
        in39.toBigInt(),
        in40.toBigInt(),
        in41.toBigInt(),
        in42.toBigInt(),
        in43.toBigInt(),
        in44.toBigInt(),
        in45.toBigInt(),
        in46.toBigInt(),
        in47.toBigInt(),
        in48.toBigInt(),
        in49.toBigInt(),
        in50.toBigInt(),
        in51.toBigInt(),
        in52.toBigInt(),
        in53.toBigInt(),
        in54.toBigInt(),
        in55.toBigInt(),
        in56.toBigInt(),
        in57.toBigInt(),
        in58.toBigInt(),
        in59.toBigInt(),
        in60.toBigInt(),
        in61.toBigInt(),
        in62.toBigInt(),
        in63.toBigInt(),
        in64.toBigInt(),
        in65.toBigInt(),
        in66.toBigInt(),
        in67.toBigInt(),
        in68.toBigInt(),
        in69.toBigInt(),
        in70.toBigInt(),
        in71.toBigInt(),
        in72.toBigInt(),
        in73.toBigInt(),
        in74.toBigInt(),
        in75.toBigInt(),
        in76.toBigInt(),
        in77.toBigInt(),
        in78.toBigInt(),
        in79.toBigInt(),
        in80.toBigInt(),
        in81.toBigInt(),
        in82.toBigInt(),
        in83.toBigInt(),
        in84.toBigInt(),
        in85.toBigInt(),
        in86.toBigInt(),
        in87.toBigInt(),
        in88.toBigInt(),
        in89.toBigInt(),
        in90.toBigInt(),
        in91.toBigInt(),
        in92.toBigInt(),
        in93.toBigInt(),
        in94.toBigInt(),
        in95.toBigInt(),
        in96.toBigInt(),
        in97.toBigInt(),
        in98.toBigInt(),
        in99.toBigInt(),
        in100.toBigInt(),
        in101.toBigInt(),
        in102.toBigInt(),
        in103.toBigInt(),
        in104.toBigInt(),
        in105.toBigInt(),
        in106.toBigInt(),
        in107.toBigInt(),
        in108.toBigInt(),
        in109.toBigInt(),
        in110.toBigInt(),
        in111.toBigInt(),
        in112.toBigInt(),
        in113.toBigInt(),
        in114.toBigInt(),
        in115.toBigInt(),
        in116.toBigInt(),
        in117.toBigInt(),
        in118.toBigInt(),
        in119.toBigInt(),
        in120.toBigInt(),
        in121.toBigInt(),
        in122.toBigInt(),
        in123.toBigInt(),
        in124.toBigInt(),
        in125.toBigInt(),
        in126.toBigInt(),
        in127.toBigInt(),
        in128.toBigInt(),
        in129.toBigInt(),
        in130.toBigInt(),
        in131.toBigInt(),
        in132.toBigInt(),
        in133.toBigInt(),
        in134.toBigInt(),
        in135.toBigInt(),
        in136.toBigInt(),
        in137.toBigInt(),
        in138.toBigInt(),
        in139.toBigInt(),
        in140.toBigInt(),
        in141.toBigInt(),
        in142.toBigInt(),
        in143.toBigInt(),
        in144.toBigInt(),
        in145.toBigInt(),
        in146.toBigInt(),
        in147.toBigInt(),
        in148.toBigInt(),
        in149.toBigInt(),
        in150.toBigInt(),
        in151.toBigInt(),
        in152.toBigInt(),
        in153.toBigInt(),
        in154.toBigInt(),
        in155.toBigInt(),
        in156.toBigInt(),
        in157.toBigInt(),
        in158.toBigInt(),
        in159.toBigInt(),
        in160.toBigInt(),
        in161.toBigInt(),
        in162.toBigInt(),
        in163.toBigInt(),
        in164.toBigInt(),
        in165.toBigInt(),
        in166.toBigInt(),
        in167.toBigInt(),
        in168.toBigInt(),
        in169.toBigInt(),
        in170.toBigInt(),
        in171.toBigInt(),
        in172.toBigInt(),
        in173.toBigInt(),
        in174.toBigInt(),
        in175.toBigInt(),
        in176.toBigInt(),
        in177.toBigInt(),
        in178.toBigInt(),
        in179.toBigInt(),
        in180.toBigInt(),
        in181.toBigInt(),
        in182.toBigInt(),
        in183.toBigInt(),
        in184.toBigInt(),
        in185.toBigInt(),
        in186.toBigInt(),
        in187.toBigInt(),
        in188.toBigInt(),
        in189.toBigInt(),
        in190.toBigInt(),
        in191.toBigInt(),
        in192.toBigInt(),
        in193.toBigInt(),
        in194.toBigInt(),
        in195.toBigInt(),
        in196.toBigInt(),
      ];

      // const inputBigInts = secretInput.map((x) => x.toBigInt());
      const inputFloats = inputBigInts.map((x) =>
        fixedQ1616ToFloat(Number(x.toString()))
      );
      // Provable.log(inputFloats[0].toString());
      const inputMatrix = mathjs.matrix(inputFloats);
      const [output, maxIndex, probability] = nnClassifier(inputMatrix);
      Provable.log(output.toString());

      let maxIndexFP;
      let probabilityFP;
      if (typeof maxIndex === 'number' && typeof probability === 'number') {
        maxIndexFP = floatToFixedQ1616(maxIndex);
        probabilityFP = floatToFixedQ1616(probability);
        console.log('dsdas');
      }

      if (maxIndexFP && probabilityFP) {
        const maxIndexFPBigInt = BigInt(maxIndexFP);
        const maxIndexFPField = Field(maxIndexFPBigInt);
        this.result.set(maxIndexFPField);

        const probabilityFPBigInt = BigInt(probabilityFP);
        const probabilityFPField = Field(probabilityFPBigInt);
        this.probability.set(probabilityFPField);
        console.log('dsdas');
      }

      //   const res1FP = floatToFixedQ1616(output);
      //   const res1FPBigInt = BigInt(res1FP);
      //   const res1FPField = Field(res1FPBigInt);
      //   const newState = currentState1.add(res1FPField);
      //   this.res1.set(newState);
    });

    // const newState = currentState.add(2);
    // this.res.set(newState);
  }
}
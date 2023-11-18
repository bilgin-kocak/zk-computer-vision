// import { LinearRegression } from './LinearRegression.js';
import { NNClassifier } from './NNClassifier.js';
import { Field, Mina, PrivateKey, AccountUpdate, MerkleTree } from 'o1js';
import { floatToFixedQ1616, fixedQ1616ToFloat } from './helper.js';

const useProof = false;
const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } =
  Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } =
  Local.testAccounts[1];

// ----------------------------------------------------
// Create a public/private key pair. The public key is your address and where you deploy the zkApp to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();
// create an instance of LinearRegression - and deploy it to zkAppAddress
const zkAppInstance = new NNClassifier(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
});
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();
// get the initial state of LinearRegression after deployment
const num0 = zkAppInstance.result.get();
let outputHash = zkAppInstance.outputHash.get();
console.log('state after init:', num0.toString());
console.log('outputHash after init:', outputHash.toString());

// ----------------------------------------------------

const inputVector = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0.00392157, 0.00392157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0.05490196, 0.09411765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8627451,
  0.84705883, 1, 0.9411765, 0.9647059, 0.9607843, 0.92941177, 0.44705883, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0.02352941, 0.10588235, 0.10196079, 0.67058825,
  0.42352942, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00784314, 0.07450981, 1,
  0.00784314, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8117647, 0.28235295,
  0.00392157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00392157, 0.07843138, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0.95686275, 0.28627452, 0.01176471, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0.01176471, 0.47058824, 0.73333335, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0.00784314, 0.10980392, 1, 0.02352941, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0.7019608, 1, 0.00784314, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0,
];

const input = inputVector.map((x) => Field(floatToFixedQ1616(x)));

console.log('input:', input);

console.log(
  'trial:',
  floatToFixedQ1616(0.00392157),
  Field(floatToFixedQ1616(0.00392157))
);

// const inputMerkleTree = new MerkleTree(inputSize + 1); // has 256 leaves
// inputMerkleTree.fill(input);

const txn1 = await Mina.transaction(senderAccount, () => {
  // array [1,2,3]
  zkAppInstance.feedforward(
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
    input[195]
  );
});
await txn1.prove();
await txn1.sign([senderKey]).send();
const num1 = zkAppInstance.result.get();
const probability = zkAppInstance.probability.get();
outputHash = zkAppInstance.outputHash.get();

console.log('state after txn1:', num1.toString());
console.log('probability:', probability.toString());
console.log('outputHash after txn1:', outputHash.toString());

// Convert to float
console.log('state in float ', fixedQ1616ToFloat(Number(num1.toString())));
console.log(
  'probability in float ',
  fixedQ1616ToFloat(Number(probability.toString()))
);

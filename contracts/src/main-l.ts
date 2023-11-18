// import { LinearRegression } from './LinearRegression.js';
import { LinearRegression } from './LinearRegression.js';
import { Field, Mina, PrivateKey, AccountUpdate } from 'o1js';
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
const zkAppInstance = new LinearRegression(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
});
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();
// get the initial state of LinearRegression after deployment
const num0 = zkAppInstance.res1.get();
console.log('state after init:', num0.toString());

// ----------------------------------------------------

// const inputVector = [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0.00392157, 0.00392157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0.05490196, 0.09411765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8627451,
//   0.84705883, 1, 0.9411765, 0.9647059, 0.9607843, 0.92941177, 0.44705883, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0.02352941, 0.10588235, 0.10196079, 0.67058825,
//   0.42352942, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00784314, 0.07450981, 1,
//   0.00784314, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8117647, 0.28235295,
//   0.00392157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00392157, 0.07843138, 1, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0.95686275, 0.28627452, 0.01176471, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0.01176471, 0.47058824, 0.73333335, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0.00784314, 0.10980392, 1, 0.02352941, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0.7019608, 1, 0.00784314, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0,
// ];

// const input = inputVector.map((x) => Field(floatToFixedQ1616(x)));

// console.log('input:', input);

const txn1 = await Mina.transaction(senderAccount, () => {
  // array [1,2,3]
  zkAppInstance.update(Field(1), Field(1), Field(1));
});
await txn1.prove();
await txn1.sign([senderKey]).send();
const num1 = zkAppInstance.res1.get();

console.log('state after txn1:', num1.toString());

// Convert to float
console.log('state in float ', fixedQ1616ToFloat(Number(num1.toString())));

// ----------------------------------------------------

// try {
//   const txn2 = await Mina.transaction(senderAccount, () => {
//     zkAppInstance.update(Field(75));
//   });
//   await txn2.prove();
//   await txn2.sign([senderKey]).send();
// } catch (ex: any) {
//   console.log(ex.message);
// }
// const num2 = zkAppInstance.res.get();
// console.log('state after txn2:', num2.toString());

// // ----------------------------------------------------

// const txn3 = await Mina.transaction(senderAccount, () => {
//   zkAppInstance.update(Field(81));
// });
// await txn3.prove();
// await txn3.sign([senderKey]).send();
// const num3 = zkAppInstance.res.get();
// console.log('state after txn3:', num3.toString());

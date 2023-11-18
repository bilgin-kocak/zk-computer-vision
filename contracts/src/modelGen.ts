import * as math from 'mathjs';
import * as fs from 'fs';
import { fc1 } from './nn-model/fc1.js';
import { fc2 } from './nn-model/fc2.js';

// Define a type for your layer data for better type checking
type LayerData = {
  weights: number[][];
  biases: number[];
  activation: string;
};

// Function to apply ReLU activation
function relu(x: math.Matrix): math.Matrix {
  return math.map(x, (value: number) => Math.max(0, value)) as math.Matrix;
}

// Function to apply Softmax activation
function softmax(x: math.Matrix): math.Matrix {
  // First, ensure each element in the matrix is exponentiated individually,
  // which is necessary for the softmax function.
  // 'math.map' is used to apply a function to all elements of a matrix or array.
  const exps = math.map(x, (value: number) => math.exp(value)) as math.Matrix;

  // The sum of exponentials; here 'math.sum' will return a scalar sum of all elements.
  const sumOfExps = math.sum(exps);

  // Divide each element by the sum of all exponentials to get the softmax probabilities.
  // The result should be a matrix with the same dimensions as the input.
  return math.divide(exps, sumOfExps) as math.Matrix;
}

// Function to perform forward pass
function forwardPass(input: math.Matrix, layers: LayerData[]): math.Matrix {
  // Perform forward pass
  // First layer
  let output = fc1(input);

  // Activation
  output = relu(output);

  // Second layer
  output = fc2(output);

  // Activation
  output = relu(output);
  return output;

  // return layers.reduce((input: math.Matrix, layer) => {
  //   // Wx + b
  //   let output = math.add(
  //     math.multiply(input, layer.weights),
  //     layer.biases
  //   ) as math.Matrix;

  //   // Activation
  //   switch (layer.activation) {
  //     case 'relu':
  //       return relu(output);
  //     case 'softmax':
  //       return softmax(output);
  //     default:
  //       throw new Error(`Unsupported activation function: ${layer.activation}`);
  //   }
  // }, input);
}

export function nnClassifier(input: math.Matrix) {
  const data = fs.readFileSync(
    './src/nn-model/model_weights_biases.json',
    'utf8'
  );

  // Parse the JSON data
  const layers: LayerData[] = JSON.parse(data);

  // Perform forward pass
  let output = forwardPass(input, layers);

  // Return the index of the highest probability

  const outputArray = output.valueOf() as number[];

  let max = outputArray[0];
  let sum = 0;
  let maxIndex = 0;
  for (let i = 1; i < outputArray.length; i++) {
    if (outputArray[i] > max) {
      maxIndex = i;
      max = outputArray[i];
      sum += outputArray[i];
    }
  }

  console.log('sum:', sum);
  console.log('max:', max);
  console.log('maxIndex:', maxIndex);

  return [output, maxIndex, max / sum];
}

async function main() {
  const data = fs.readFileSync(
    './src/nn-model/model_weights_biases.json',
    'utf8'
  );

  // console.log('Data:', data);

  // Parse the JSON data
  const layers: LayerData[] = JSON.parse(data);

  // Sample input vector (you need to replace this with actual input)
  let inputVector = math.matrix([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0.00392157, 0.00392157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0.05490196, 0.09411765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8627451,
    0.84705883, 1, 0.9411765, 0.9647059, 0.9607843, 0.92941177, 0.44705883, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0.02352941, 0.10588235, 0.10196079, 0.67058825,
    0.42352942, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00784314, 0.07450981, 1,
    0.00784314, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8117647, 0.28235295,
    0.00392157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00392157, 0.07843138, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0.95686275, 0.28627452, 0.01176471, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0.01176471, 0.47058824, 0.73333335, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0.00784314, 0.10980392, 1, 0.02352941, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0.7019608, 1, 0.00784314, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ]);

  // Perform forward pass
  let output = forwardPass(inputVector, layers);
  console.log('Output:', output);
}

// main();

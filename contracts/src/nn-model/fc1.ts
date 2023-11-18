import * as mathjs from 'mathjs';
import { weights } from './layer1weights.js';
import { biases } from './layer1biases.js';

export const fc1 = (x: mathjs.Matrix) => {
  return mathjs.add(mathjs.multiply(x, weights), biases);
};

import * as mathjs from 'mathjs';
import { weights } from './layer2weights.js';
import { biases } from './layer2biases.js';

export const fc2 = (x: mathjs.Matrix) => {
  return mathjs.add(mathjs.multiply(x, weights), biases);
};

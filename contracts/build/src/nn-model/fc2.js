import * as mathjs from 'mathjs';
import { weights } from './layer2weights.js';
import { biases } from './layer2biases.js';
export const fc2 = (x) => {
    return mathjs.add(mathjs.multiply(x, weights), biases);
};
//# sourceMappingURL=fc2.js.map
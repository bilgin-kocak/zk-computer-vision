import * as mathjs from 'mathjs';
type Matrix = mathjs.Matrix;
export declare function model(w: Matrix, b: Matrix, x: Matrix): Matrix;
export declare function floatToFixedQ1616(num: number): number;
export declare function fixedQ1616ToFloat(num: number): number;
export {};

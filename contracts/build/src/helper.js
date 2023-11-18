import * as mathjs from 'mathjs';
export function model(w, b, x) {
    return mathjs.add(mathjs.multiply(w, x), b);
}
// Constants for Q16.16 calculations
const FIXED_POINT_FRACTION_BITS = 32;
const FIXED_POINT_SCALE_FACTOR = 4294967296; // 2^16
// Convert float to Q16.16 fixed point
export function floatToFixedQ1616(num) {
    return Math.round(num * FIXED_POINT_SCALE_FACTOR);
}
// Convert Q16.16 fixed point to float
export function fixedQ1616ToFloat(num) {
    return num / FIXED_POINT_SCALE_FACTOR;
}
function main() {
    const x = mathjs.matrix([1, 2, 3]);
    const b = mathjs.matrix([1, 1, 1]);
    const w = mathjs.matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]);
    const y = model(w, b, x);
    console.log(y);
    const a = y.get([0]);
    console.log(a);
    // Example usage
    const floatNumber = 123.456789;
    const fixedPointNumber = floatToFixedQ1616(floatNumber);
    const backToFloat = fixedQ1616ToFloat(fixedPointNumber);
    console.log('Float to Fixed Q16.16:', fixedPointNumber); // The fixed-point representation
    console.log('Fixed Q16.16 to Float:', backToFloat); // Convert back to float to check
}
// main();
//# sourceMappingURL=helper.js.map
import { Field, SmartContract, State } from 'o1js';
export declare class LinearRegression extends SmartContract {
    res1: State<import("o1js/dist/node/lib/field.js").Field>;
    res2: State<import("o1js/dist/node/lib/field.js").Field>;
    res3: State<import("o1js/dist/node/lib/field.js").Field>;
    init(): void;
    update(secretInput1: Field, secretInput2: Field, secretInput3: Field): void;
}

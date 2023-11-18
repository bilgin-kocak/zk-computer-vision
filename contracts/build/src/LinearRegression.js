var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, SmartContract, state, State, method, Provable } from 'o1js';
import { model, floatToFixedQ1616, fixedQ1616ToFloat } from './helper.js';
import * as mathjs from 'mathjs';
export class LinearRegression extends SmartContract {
    constructor() {
        super(...arguments);
        this.res1 = State();
        this.res2 = State();
        this.res3 = State();
    }
    init() {
        super.init();
        this.res1.set(Field(1));
        this.res2.set(Field(1));
        this.res3.set(Field(1));
    }
    update(secretInput1, secretInput2, secretInput3) {
        const currentState1 = this.res1.getAndAssertEquals();
        const currentState2 = this.res2.getAndAssertEquals();
        const currentState3 = this.res3.getAndAssertEquals();
        // const inputBigInts = [
        //   secretInput1.toBigInt(),
        //   secretInput2.toBigInt(),
        //   secretInput3.toBigInt(),
        // ];
        // const newInputBigInts = inputBigInts.map((x) => x + 1n);
        // const inputBigInt = secretInput.toBigInt();
        // Provable.log(inputBigInt.toString());
        Provable.asProver(() => {
            const inputBigInts = [
                secretInput1.toBigInt(),
                secretInput2.toBigInt(),
                secretInput3.toBigInt(),
            ];
            const inputFloats = inputBigInts.map((x) => fixedQ1616ToFloat(Number(x.toString())));
            Provable.log(inputFloats[0].toString());
            Provable.log(inputFloats[1].toString());
            Provable.log(inputFloats[2].toString());
            const x = mathjs.matrix(inputFloats);
            const b = mathjs.matrix([1, 1, 1]);
            const w = mathjs.matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            const y = model(w, b, x);
            const a = y.get([0]);
            Provable.log(a);
            Provable.log(y.get([1]));
            Provable.log(y.get([2]));
            const res1FP = floatToFixedQ1616(y.get([0]));
            const res2FP = floatToFixedQ1616(y.get([1]));
            const res3FP = floatToFixedQ1616(y.get([2]));
            const res1FPBigInt = BigInt(res1FP);
            const res1FPField = Field(res1FPBigInt);
            const newState = currentState1.add(res1FPField);
            this.res1.set(newState);
            const res2FPBigInt = BigInt(res2FP);
            const res2FPField = Field(res2FPBigInt);
            const newState2 = currentState2.add(res2FPField);
            this.res2.set(newState2);
            const res3FPBigInt = BigInt(res3FP);
            const res3FPField = Field(res3FPBigInt);
            const newState3 = currentState3.add(res3FPField);
            this.res3.set(newState3);
        });
        // const newState = currentState.add(2);
        // this.res.set(newState);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], LinearRegression.prototype, "res1", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], LinearRegression.prototype, "res2", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], LinearRegression.prototype, "res3", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field,
        Field,
        Field]),
    __metadata("design:returntype", void 0)
], LinearRegression.prototype, "update", null);
//# sourceMappingURL=LinearRegression.js.map
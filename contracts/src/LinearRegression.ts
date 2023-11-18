import { Field, SmartContract, state, State, method, Provable } from 'o1js';
import { model, floatToFixedQ1616, fixedQ1616ToFloat } from './helper.js';
import * as mathjs from 'mathjs';

export class LinearRegression extends SmartContract {
  @state(Field) res1 = State<Field>();
  @state(Field) res2 = State<Field>();

  @state(Field) res3 = State<Field>();

  init() {
    super.init();
    this.res1.set(Field(1));
    this.res2.set(Field(1));
    this.res3.set(Field(1));
  }

  @method update(
    secretInput1: Field,
    secretInput2: Field,
    secretInput3: Field
  ) {
    const currentState1 = this.res1.getAndAssertEquals();
    const currentState2 = this.res2.getAndAssertEquals();
    const currentState3 = this.res3.getAndAssertEquals();

    // const inputBigInt = secretInput.toBigInt();
    // Provable.log(inputBigInt.toString());
    Provable.asProver(() => {
      const inputBigInts = [
        secretInput1.toBigInt(),
        secretInput2.toBigInt(),
        secretInput3.toBigInt(),
      ];
      const inputFloats = inputBigInts.map((x) =>
        fixedQ1616ToFloat(Number(x.toString()))
      );
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

"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { wait } from "@/lib/client-side/utils";
import type ZkappWorkerClient from "../zkappWorkerClient";
import { Button } from "@/components/button/Button";
import { Alert } from "@/components/alert/Alert";
import Images from "./candidates/candidates";
import Link from "next/link";
import { useLocalStorage } from "@/hooks";
import inputs  from "@/lib/client-side/inputs.json";

console.log('inputs', inputs);

let transactionFee = 0.1;

export default function Content() {
  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });
  const [image, setImage] = useState(-1);
  const [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentBallot: null as null | any,
    publicKey: null as null | any,
    zkappPublicKey: null as null | any,
    connecting: false,
    calculating: false,
    calculated: false,
  });
  const [transactionlink, setTransactionLink] = useState("");
  const [mnistClassifierResults, setMnistClassifierResults] = useLocalStorage(
    "mnistClassifierResults",
    {
      candidates: Array(8).fill(0) as number[],
    }
  );

  useEffect(() => {
    (async () => {
      try {
        if (state.hasBeenSetup && !state.accountExists) {
          let accountExists = false;
          while (!accountExists) {
            console.log("Checking if fee payer account exists...");
            const res = await state.zkappWorkerClient!.fetchAccount({
              publicKey: state.publicKey!,
            });
            accountExists = res.error == null;
            await wait(5000);
          }
          setState((prev) => ({ ...prev, accountExists: true }));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [state.hasBeenSetup]);

  const onSelectImage = async () => {
    try {
      setState((prev) => ({ ...prev, calculating: true }));

      console.log("Creating a transaction...");

      await state.zkappWorkerClient!.fetchAccount({
        publicKey: state.publicKey!,
      });

      console.log("Creating zkML image...");
      const image_ = inputs[image];

      console.log("image", image_);



      await state.zkappWorkerClient!.runZkml(image_);

      console.log("Creating proof...");
      await state.zkappWorkerClient!.proveTransaction();

      console.log("Requesting send transaction...");
      const transactionJSON =
        await state.zkappWorkerClient!.getTransactionJSON();

      console.log("Getting transaction JSON...");
      const { hash } = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
          fee: transactionFee,
          memo: "",
        },
      });

      const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
      console.log(`View transaction at ${transactionLink}`);
      setTransactionLink(transactionLink);
      setState((prev) => ({ ...prev, calculated: true }));
    } catch (error) {
      console.error(error);
    }
    setState((prev) => ({ ...prev, calculating: false }));
  };

  const onConnect = async () => {
    try {
      if (!state.hasBeenSetup) {
        setState((prev) => ({
          ...prev,
          connecting: true,
        }));
        const { Mina, PublicKey, UInt32 } = await import("o1js");
        const { NNClassifier } = await import("@/contracts/build/src/");
        const ZkappWorkerClient = (await import("@/app/zkappWorkerClient"))
          .default;
        const Berkeley = Mina.Network(
          "https://proxy.berkeley.minaexplorer.com/graphql"
        );
        Mina.setActiveInstance(Berkeley);
        const zkApp = new NNClassifier(
          PublicKey.fromBase58("B62qkvu5auhiL2JZnUtafpSyWJ7AW5gxrHyVzNXqxNPMkzPW1RbV2Zg")
        );
        // const ballot = await zkApp.ballot.fetch();
        // if (ballot) {
        //   setMnistClassifierResults({
        //     candidates: ballot.candidates.map((x: typeof UInt32) =>
        //       Number(x.toString())
        //     ),
        //   });
        // }

        console.log("Loading web worker...");
        const zkappWorkerClient = new ZkappWorkerClient();
        await wait(5000);

        console.log("Done loading web worker");
        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;
        if (mina == null) {
          setState({ ...state, hasWallet: false });
          return;
        }
        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);
        console.log("using key", publicKey.toBase58());

        console.log("Checking if fee payer account exists...");

        const res = await zkappWorkerClient.fetchAccount({
          publicKey: publicKey!,
        });

        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();
        console.log("Compiling zkApp...");

        await zkappWorkerClient.compileContract();
        console.log("zkApp compiled");

        const zkappPublicKeyImported =
          process.env.NEXT_PUBLIC_ZK_APP_PUBLIC_KEY!;

        /*const zkappPublicKeyImported = (
            await import("@/contracts/keys/berkeley.json")
          ).publicKey;*/

        const zkappPublicKey = PublicKey.fromBase58("B62qkvu5auhiL2JZnUtafpSyWJ7AW5gxrHyVzNXqxNPMkzPW1RbV2Zg");
        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log("Getting zkApp state...");

        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
        const currentResult = await zkappWorkerClient.getResult();
        console.log(`Current result in zkApp state: ${currentResult}`);

        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: "An error occurred", error: true });
    }
    setState((prev) => ({
      ...prev,
      connecting: false,
    }));
  };

  return (
    <div className={styles.container}>
      <Alert
        message={alert.message}
        visible={!!alert.message}
        onClose={() => {
          setAlert({ message: "", error: false });
        }}
        isError={alert.error}
      />
      <Images
        onSelectImage={(num) => {
          setImage(num);
        }}
      />
      <div className={styles.buttons}>
        {!state.hasBeenSetup && !state.calculated && (
          <Button
            onClick={onConnect}
            text="Connect"
            loading={state.connecting}
            loadingText="Connecting..."
          />
        )}
        {!state.connecting &&
          state.hasBeenSetup &&
          state.hasWallet &&
          !state.calculated && (
            <Button
              onClick={onSelectImage}
              text="Run ZKML"
              theme="primary"
              loading={state.calculating}
              loadingText="Calculating..."
              disabled={image < 0}
            />
          )}
        {state.calculated && (
          <>
            <Button href="/results" theme="primary" text="Show results" />
            <Button
              href={transactionlink}
              theme="transparent"
              text="View transaction"
              openLinkInNewTab={true}
            />
          </>
        )}
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import SendEthForm from "./shared/components/SendEthForm";
import SendMultipleEthForm from "./shared/components/SendMultipleEth";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { address } = useAccount();

  return (
    <main className={styles.main}>
      {!address ? (
        <Button onClick={() => connect({ connector: injected() })}>
          Connect
        </Button>
      ) : (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      )}
      <SendEthForm />
      <SendMultipleEthForm />
    </main>
  );
}

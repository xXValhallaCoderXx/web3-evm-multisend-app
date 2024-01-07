"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const { connect } = useConnect();
  // const { address } = useAccount();
 
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button onClick={() => connect({ connector: injected() })}>
          Connect
        </button>
      </div>
    </main>
  );
}

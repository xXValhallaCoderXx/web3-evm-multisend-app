"use client";
import { useState, useEffect } from 'react'
import { Button } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import SendEthForm from "./shared/components/SendEthForm";
import SendMultipleEthForm from "./shared/components/SendMultipleEth";
import MainLayout from "./shared/components/layouts/MainLayout";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { address } = useAccount();

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleOnClick = () => {
    if (address) {
      disconnect()
    }
    () => connect({ connector: injected() })
  }

  if (!isClient) {
    return null
  }
  return (
    <MainLayout >
      <Button onClick={handleOnClick}>{address ? "DIsconnect" : "COnnect"}</Button>

      <SendEthForm />
      <SendMultipleEthForm />
    </MainLayout>
  );
}

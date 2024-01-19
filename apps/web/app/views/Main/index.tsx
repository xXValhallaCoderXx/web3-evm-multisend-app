"use client";
import { Button } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import SendEthForm from "../../shared/components/SendEthForm";
import SendMultipleEthForm from "../../shared/components/SendMultipleEth";
import MainLayout from "../../shared/components/layouts/MainLayout";

export default function MainPage() {
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { address } = useAccount();

  const handleOnClick = () => {
    if(address){
      disconnect()
    }
    () => connect({ connector: injected() })
  }
  return (
    <MainLayout >
      <Button onClick={handleOnClick}>{address ? "Disconnect" : "Connect"}</Button>

      <SendEthForm />
      <SendMultipleEthForm />
    </MainLayout>
  );
}

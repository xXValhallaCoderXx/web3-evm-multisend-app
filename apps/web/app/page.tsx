"use client";
import { useState, useEffect } from 'react'

import SendEthForm from "./shared/components/SendEthForm";
import SendMultipleEthForm from "./shared/components/SendMultipleEth";
import MainLayout from "./shared/components/layouts/MainLayout";

export default function Home() {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])



  if (!isClient) {
    return <div>Loading</div>
  }
  return (
    <MainLayout >


      <SendEthForm />
      <SendMultipleEthForm />
    </MainLayout>
  );
}

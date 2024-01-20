"use client";
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Stack, Radio, RadioGroup } from '@chakra-ui/react';
import SendEthForm from "./shared/components/SendEthForm";
import SendMultipleEthForm from "./shared/components/SendMultipleEth";
import MainLayout from "./shared/components/layouts/MainLayout";

export default function Home() {
  const [paymentType, setPaymentType] = useState("native")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  const handleOnChangePaymentType = (_e: any) => {

    setPaymentType(_e?.target?.name)
  }

  if (!isClient) {
    return <div>Loading</div>
  }
  return (
    <MainLayout >
      <Flex mt={2} justifyContent="center" >
        <Flex w={1200} flexDirection="row" alignContent="space-between" justifyContent="space-between" >
          <Box>
            <Text fontSize="lg" fontWeight={600}>Payment Type</Text>
            <Stack mt={2}>
              <Radio onChange={handleOnChangePaymentType} isChecked={paymentType === "native"} size='md' name='native' >
                Batch Send Native Currency
              </Radio>
              <Radio onChange={handleOnChangePaymentType} isChecked={paymentType === "token"} size='md' name='token' >
                Batch Multiple Token
              </Radio>
            </Stack>
            <Box mt={4}>
              <Text fontSize="lg" fontWeight={600}>Transaction Details</Text>
              <Text fontSize="2xl">0.00 ETH</Text>
              <Text fontSize="sm" color="gray" mt={-1}>$0.00</Text>
            </Box>
          </Box>
          <Box>
            <SendEthForm />
            <SendMultipleEthForm />
          </Box>
        </Flex>
      </Flex>
    </MainLayout>
  );
}

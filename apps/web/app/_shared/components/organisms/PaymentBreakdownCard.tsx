import { Card, Flex, CardBody, Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { useBalance, useAccount } from "wagmi";

const PaymentBreakdownCard = () => {
  const { isConnected, address } = useAccount();
  const totalAmount = useAppSelector((state) => state.transaction.total);
  const { data, isLoading } = useBalance({
    address,
    query: { enabled: isConnected },
  });
  console.log("ETH Blanace", data);
  return (
    <Card bgColor="#201B43" height="100%" w="100%">
      <CardBody>
        <Box>
          <Text
            color="white"
            fontSize="lg"
            letterSpacing={0.8}
            fontWeight={600}
          >
            Wallet Balance
          </Text>
          <Flex alignItems="flex-end" gap={2} pl={4}>
            <Text color="white" fontWeight={600} fontSize="md">
              {isLoading
                ? "0.00"
                : parseFloat(data?.formatted ?? "0").toFixed(4)}
            </Text>
            <Text color="white" fontSize="xs" pb={0.5}>
              ETH
            </Text>
          </Flex>
        </Box>
        <Text
          color="white"
          fontSize="lg"
          letterSpacing={0.8}
          mt={4}
          fontWeight={600}
        >
          Transaction Details
        </Text>

        <Flex flexDirection="column" pl={4}>
          <Text color="white" fontWeight={600}>
            Total
          </Text>
          <Flex mt={-1} mb={-2} alignItems="flex-end" gap={2}>
            <Text color="white" fontWeight={600} fontSize="2xl">
              {totalAmount}
            </Text>
            <Text pb={0.5} color="white" fontSize="lg">
              ETH
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="sm" color="gray">
              $ 0.00 USD
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" mt={4} pl={4}>
          <Text color="white" fontSize="small" fontWeight={600}>
            Remaining Balance
          </Text>
          <Flex mt={-1} mb={-1} alignItems="flex-end" gap={2}>
            <Text color="white" fontWeight={600} fontSize="xl">
              {totalAmount}
            </Text>
            <Text pb={0.5} color="white" fontSize="sm">
              ETH
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="xs" color="gray">
              $ 0.00 USD
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default PaymentBreakdownCard;

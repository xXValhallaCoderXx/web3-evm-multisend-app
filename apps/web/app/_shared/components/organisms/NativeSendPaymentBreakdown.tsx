import { FC } from "react";
import { Card, Flex, CardBody, Box, Text, Skeleton } from "@chakra-ui/react";
import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { useBalance, useAccount } from "wagmi";

interface INativeSendPaymentBreakdownProps {
  nativeTokenPrice: string;
  isLoading?: boolean;
}

const NativeSendPaymentBreakdown: FC<INativeSendPaymentBreakdownProps> = ({
  nativeTokenPrice,
  isLoading: isLoadingPrice,
}) => {
  const { isConnected, address } = useAccount();
  const totalAmount = useAppSelector((state) => state.transaction.total);
  const { data, isLoading } = useBalance({
    address,
    scopeKey: "wallet-balance",

    query: { enabled: isConnected },
  });

  return (
    <Card
      bgColor="secondary.700"
      borderColor="secondary.500"
      borderWidth={2}
      height="100%"
      w="100%"
    >
      <CardBody>
        <Box>
          <Text
            color="secondary.200"
            letterSpacing={0.9}
            fontSize="lg"
            fontWeight={600}
          >
            Wallet Balance
          </Text>
          <Flex alignItems="flex-end" gap={2} pl={2}>
            <Text color="white" fontWeight={600} fontSize="md">
              {isLoading
                ? "0.00"
                : parseFloat(data?.formatted ?? "0").toFixed(4)}
            </Text>
            <Text color="white" fontSize="xs" pb={0.5}>
              ETH
            </Text>
          </Flex>
          <Flex pl={2}>
            <Skeleton isLoaded={!isLoadingPrice} height={3}>
              <Text fontSize={10} mt={-1} color="timberwolf.300">
                ${" "}
                {(
                  parseFloat(data?.formatted ?? "0") *
                  parseFloat(nativeTokenPrice)
                ).toLocaleString()}{" "}
                USD
              </Text>
            </Skeleton>
          </Flex>
        </Box>
        <Text
          color="secondary.200"
          letterSpacing={0.9}
          fontSize="lg"
          fontWeight={600}
          mt={2}
        >
          Transaction Total
        </Text>

        <Flex flexDirection="column" pl={2}>
          <Flex mt={-1} mb={-2} alignItems="flex-end" gap={2}>
            <Text color="white" fontWeight={600} fontSize="2xl">
              {totalAmount}
            </Text>
            <Text pb={0.5} color="white" fontSize="lg">
              ETH
            </Text>
          </Flex>
          <Flex mt={0.5}>
            <Skeleton isLoaded={!isLoadingPrice} height={3}>
              <Text fontSize={10} color="timberwolf.300">
                ${" "}
                {(totalAmount * parseFloat(nativeTokenPrice)).toLocaleString()}{" "}
                USD
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
        <Flex flexDirection="column" mt={4} pl={2}>
          <Text color="white" fontSize="small" fontWeight={600}>
            Remaining Balance
          </Text>
          <Flex mb={-1} alignItems="flex-end" gap={2}>
            <Text color="white" fontWeight={600} fontSize="sm">
              {(
                parseFloat(data?.formatted ?? "0") -
                parseFloat(String(totalAmount))
              ).toFixed(4)}
            </Text>
            <Text pb={0.5} color="white" fontSize={10}>
              ETH
            </Text>
          </Flex>
          <Flex>
            <Skeleton isLoaded={!isLoadingPrice} height={3}>
              <Text fontSize={10} color="timberwolf.300">
                ${" "}
                {(
                  (parseFloat(data?.formatted ?? "0") -
                    parseFloat(String(totalAmount))) *
                  parseFloat(nativeTokenPrice)
                ).toLocaleString()}{" "}
                USD
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default NativeSendPaymentBreakdown;

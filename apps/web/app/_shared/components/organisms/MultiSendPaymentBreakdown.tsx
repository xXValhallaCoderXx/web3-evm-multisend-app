import { Card, Flex, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/shared/hooks/redux-hooks";

const MultiSendPaymentBreakdownCard = () => {
  const totalAmount = useAppSelector((state) => state.transaction.total);
  return (
    <Card bgColor="#201B43" height="100%" w="100%">
      <CardBody>
        <Text color="white" fontSize="lg" letterSpacing={0.8} fontWeight={600}>
          Transaction Details
        </Text>
        <Flex alignItems="flex-end" gap={2}>
          <Text color="white" fontWeight={600} fontSize="2xl">
            {totalAmount}
          </Text>
          <Text pb={0.5} color="white" fontSize="lg">
            ETH
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="sm" color="gray" mt={-1}>
            $ 0.00 USD
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default MultiSendPaymentBreakdownCard;

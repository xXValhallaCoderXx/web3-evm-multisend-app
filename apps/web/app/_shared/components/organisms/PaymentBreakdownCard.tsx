import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/shared/hooks/redux-hooks";

const PaymentBreakdownCard = () => {
  const totalAmount = useAppSelector((state) => state.transaction.total);
  return (
    <Card>
      <CardBody>
        <Text fontSize="lg" fontWeight={600}>
          Transaction Details
        </Text>
        <Text fontSize="2xl">{totalAmount} ETH</Text>
        <Text fontSize="sm" color="gray" mt={-1}>
          $0.00
        </Text>
      </CardBody>
    </Card>
  );
};
export default PaymentBreakdownCard;

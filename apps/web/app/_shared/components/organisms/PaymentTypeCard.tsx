import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";
import { setPaymentType } from "@/shared/slice/transaction-slice";
import { Card, Radio, CardBody, Stack, Text } from "@chakra-ui/react";

const PaymentTypeCard = () => {
  const paymentType = useAppSelector((state) => state.transaction.paymentType);
  const dispatch = useAppDispatch();

  const handleOnChangePaymentType = (_e: any) => {
    dispatch(setPaymentType(_e.target.name));
  };
  return (
    <Card>
      <CardBody>
        <Text fontSize="lg" fontWeight={600}>
          Payment Type
        </Text>
        <Stack mt={2}>
          <Radio
            onChange={handleOnChangePaymentType}
            isChecked={paymentType === "native"}
            size="md"
            name="native"
          >
            Batch Send Native Currency
          </Radio>
          <Radio
            onChange={handleOnChangePaymentType}
            isChecked={paymentType === "token"}
            size="md"
            name="token"
          >
            Batch Multiple Token
          </Radio>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PaymentTypeCard;

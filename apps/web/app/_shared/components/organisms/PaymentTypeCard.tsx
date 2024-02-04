import { FC } from "react";
import { Card, Radio, CardBody, Stack, Text } from "@chakra-ui/react";

interface IPaymentTypeCard {
  value: string;
  onChange?: (_value: string) => void;
}

const PaymentTypeCard: FC<IPaymentTypeCard> = ({ value, onChange }) => {
  const handleOnChangePaymentType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange && onChange(e.target.name);
  };
  return (
    <Card w="100%">
      <CardBody>
        <Text fontSize="lg" fontWeight={600}>
          Payment Type
        </Text>
        <Stack mt={2}>
          <Radio
            onChange={handleOnChangePaymentType}
            isChecked={value === "/multisend/native"}
            size="md"
            name="native"
          >
            Batch Send Native Currency
          </Radio>
          <Radio
            onChange={handleOnChangePaymentType}
            isChecked={value === "/multisend/token"}
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

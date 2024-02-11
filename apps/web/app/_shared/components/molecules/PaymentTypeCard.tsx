import { FC } from "react";
import { Card, Radio, CardBody, Stack, Text, Tooltip } from "@chakra-ui/react";

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
    <Card bgColor="#201B43" borderColor="secondary" borderWidth={1} w="100%">
      <CardBody>
        <Text color="white" letterSpacing={0.9} fontSize="lg" fontWeight={600}>
          Payment Type
        </Text>
        <Stack mt={2}>
          <Radio
            onChange={handleOnChangePaymentType}
            isChecked={value === "/multisend/native"}
            size="md"
            name="native"
            colorScheme="secondary"
          >
            <Text fontSize="sm" color="white">
              Batch Send Native Currency
            </Text>
          </Radio>

          <Radio
            onChange={handleOnChangePaymentType}
            isChecked={value === "/multisend/token"}
            isDisabled
            size="md"
            name="token"
            colorScheme="primary"
          >
            <Tooltip hasArrow label="Coming soon!">
              <Text fontSize="sm" color="white">
                Batch Multiple Token
              </Text>
            </Tooltip>
          </Radio>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PaymentTypeCard;

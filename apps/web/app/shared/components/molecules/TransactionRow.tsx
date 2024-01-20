import { Box, Flex } from "@chakra-ui/react";
import {
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

interface ITransactionRowProps {
  field: any;
  register: any;
  index: any;
  onClickRemoveRow: (_index: number) => void;
  onClickCopyRow: (_index: number) => void;
}

const TransactionRow: FC<ITransactionRowProps> = ({
  field,
  register,
  index,
  onClickCopyRow,
  onClickRemoveRow,
}) => {
  const onClickDelete = () => onClickRemoveRow(index);
  const onClickCopy = () => onClickCopyRow(index);
  return (
    <Flex key={1} gap={4}>
      <Flex gap={8}>
        <FormControl isInvalid={false}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id={`${field.id}-address`}
            placeholder="Enter address..."
            size="sm"
            {...register(`recipients[${index}].address`, {
              required: true,
            })}
          />
          <FormErrorMessage>adasda</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={false}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id={`${field.id}-amount`}
            placeholder="Enter amount..."
            size="sm"
            {...register(`recipients[${index}].amount`, {
              required: true,
              maxLength: 30,
            })}
          />
          <FormErrorMessage>adasda</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex gap={2} alignItems="end">
        <Button size="sm" onClick={onClickDelete}>
          Delete
        </Button>
        <Button size="sm" onClick={onClickCopy}>
          Copy
        </Button>
      </Flex>
    </Flex>
  );
};

export default TransactionRow;

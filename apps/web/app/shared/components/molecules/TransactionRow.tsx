import { Box, Flex } from "@chakra-ui/react";
import {
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FC } from "react";
import { isAddress } from "viem";
import { DeleteIcon, CopyIcon } from "@chakra-ui/icons";

interface ITransactionRowProps {
  field: any;
  register: any;
  index: any;
  errors: any;
  onClickRemoveRow: (_index: number) => void;
  onClickCopyRow: (_index: number) => void;
}

const validationRules = {
  address: {
    validate: (value: string) => {
      if (!isAddress(value)) {
        return "Invalid wallet address.";
      }
    },
  },
  amount: {
    required: "Amount is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "Amount must be a number",
    },
  },
};
const TransactionRow: FC<ITransactionRowProps> = ({
  field,
  register,
  index,
  errors,
  onClickCopyRow,
  onClickRemoveRow,
}) => {
  const onClickDelete = () => onClickRemoveRow(index);
  const onClickCopy = () => onClickCopyRow(index);
  return (
    <Flex gap={4} mt={4}>
      <Flex flex={1} gap={4}>
        <FormControl h={20} isInvalid={errors?.address?.message}>
          <FormLabel mb={0} fontSize="small" htmlFor="address">
            Address
          </FormLabel>
          <Input
            id={`${field.id}-address`}
            placeholder="Enter address..."
            size="sm"
            {...register(
              `recipients[${index}].address`,
              validationRules.address
            )}
          />

          <FormErrorMessage fontSize="x-small">
            {errors?.address?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl h={20} isInvalid={errors?.amount?.message}>
          <FormLabel mb={0} fontSize="small" htmlFor="amount">
            Amount
          </FormLabel>
          <Input
            id={`${field.id}-amount`}
            placeholder="Enter amount..."
            size="sm"
            {...register(`recipients[${index}].amount`, validationRules.amount)}
          />

          <FormErrorMessage fontSize="x-small">
            {errors?.amount?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex alignItems="center" mb={2} gap={2}>
        <IconButton
          aria-label="delete-row"
          icon={<DeleteIcon />}
          onClick={onClickDelete}
        />
        <IconButton
          aria-label="copy-row"
          icon={<CopyIcon />}
          onClick={onClickCopy}
        />
      </Flex>
    </Flex>
  );
};

export default TransactionRow;

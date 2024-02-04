import { Flex } from "@chakra-ui/react";
import {
  Select,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FC } from "react";
import { isAddress } from "viem";
import { DeleteIcon, CopyIcon } from "@chakra-ui/icons";
import { TOKEN_CONTRACTS } from "@/shared/constants/token-contracts";

interface ITransactionRowProps {
  field: any;
  chainId: number;
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
  token: {
    required: "Token is required",
  },
};
const TransactionRow: FC<ITransactionRowProps> = ({
  field,
  register,
  index,
  chainId,
  errors,
  onClickCopyRow,
  onClickRemoveRow,
}) => {
  const defaultTokens = TOKEN_CONTRACTS[chainId];

  const onClickDelete = () => onClickRemoveRow(index);
  const onClickCopy = () => onClickCopyRow(index);
  return (
    <Flex gap={2}>
      <Flex flexGrow={1}>
        <FormControl ml={1} h={20} isInvalid={errors?.address?.message}>
          <FormLabel mb={0} color="white" fontSize="small" htmlFor="address">
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
      </Flex>
      <Flex>
        {"token" in field && (
          <FormControl h={20} isInvalid={errors?.token?.message}>
            <FormLabel color="white" mb={0} fontSize="small" htmlFor="token">
              Token
            </FormLabel>
            <Select
              size="sm"
              {...register(`recipients[${index}].token`, validationRules.token)}
              placeholder="Select option"
            >
              {defaultTokens.map((token: any) => {
                return (
                  <option key={token.address} value={token.address}>
                    {token.symbol}
                  </option>
                );
              })}
            </Select>

            <FormErrorMessage fontSize="x-small">
              {errors?.token?.message}
            </FormErrorMessage>
          </FormControl>
        )}
      </Flex>
      <Flex>
        <FormControl h={20} isInvalid={errors?.amount?.message}>
          <FormLabel color="white" mb={0} fontSize="small" htmlFor="amount">
            Amount
          </FormLabel>
          <Input
            id={`${field.id}-amount`}
            placeholder="0.00"
            size="sm"
            maxW={100}
            {...register(`recipients[${index}].amount`, validationRules.amount)}
          />

          <FormErrorMessage fontSize="x-small">
            {errors?.amount?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt={5} gap={2}>
        <IconButton
          size="sm"
          colorScheme="secondary"
          aria-label="delete-row"
          icon={<DeleteIcon />}
          onClick={onClickDelete}
        />
        <IconButton
          size="sm"
          colorScheme="secondary"
          aria-label="copy-row"
          icon={<CopyIcon />}
          onClick={onClickCopy}
        />
      </Flex>
    </Flex>
  );
};

export default TransactionRow;

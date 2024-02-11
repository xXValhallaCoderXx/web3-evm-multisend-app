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
  totalItems?: number;
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
  totalItems,
  onClickCopyRow,
  onClickRemoveRow,
}) => {
  const defaultTokens = TOKEN_CONTRACTS[chainId ?? 1];

  const onClickDelete = () => onClickRemoveRow(index);
  const onClickCopy = () => onClickCopyRow(index);

  // _placeholder={{ opacity: 1, color: "gray.300" }}
  // focusBorderColor="purple.400"
  // fontStyle={{ color: "white" }}
  // variant="outline"
  // color="white"
  return (
    <Flex gap={2}>
      <Flex flexGrow={1}>
        <FormControl ml={1} h={20} isInvalid={errors?.address?.message}>
          <FormLabel mb={0} color="white" fontSize="small" htmlFor="address">
            Addresss
          </FormLabel>
          <Input
            id={`${field.id}-address`}
            placeholder="Enter address..."
            colorScheme="primary"
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
              color="white"
              sx={{
                "> option": {
                  background: "black",
                  color: "white",
                },
              }}
              {...register(`recipients[${index}].token`, validationRules.token)}
              placeholder="Select token"
            >
              {defaultTokens?.map((token: any) => {
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
            color="white"
            focusBorderColor="purple.400"
            _placeholder={{ opacity: 1, color: "gray.300" }}
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
          isDisabled={index === 0 && (totalItems ?? 1) === 1}
          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
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

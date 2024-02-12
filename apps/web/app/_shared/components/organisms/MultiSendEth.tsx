"use client";
import { parseEther } from "viem";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/shared/hooks/redux-hooks";
import { setTotal } from "@/shared/slice/transaction-slice";
import {
  Text,
  Button,
  Flex,
  Tooltip,
  useToast,
  Card,
  Box,
  CardBody,
} from "@chakra-ui/react";
import TransactionRow from "@/components/molecules/TransactionRow";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useAccount,
} from "wagmi";
import MultiSendContract from "@/shared/abi/MultiSend.json";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";

const MultiSendEthForm = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useAccount();
  const dispatch = useAppDispatch();
  const chainId = useChainId();
  const toast = useToast();
  const {
    writeContract,
    isPending, // Pending state while waiting for wallet to confirm / reject
    isSuccess: isWriteSuccess,
    data,
    error: writeError,
    failureReason: writeErrorFailureReason,
    isError: isWriteError,
  } = useWriteContract();

  const {
    isLoading: isTxLoading, // Is confirming
    isSuccess: isTxSuccess, // Is successful
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const {
    register,
    control,
    watch,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      recipients: [{ address: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
  });
  useEffect(() => {
    if (isWriteError) {
      console.log("writeError", writeError);
      toast({
        title: "Error",
        description:
          // @ts-ignore
          writeErrorFailureReason?.shortMessage ??
          "An unknow error occured, this has been logged",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isWriteError, isWriteSuccess]);

  useEffect(() => {
    if (isTxSuccess) {
      queryClient.invalidateQueries();
      toast({
        title: "Transaction executed",
        description: "Transaction completed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isTxSuccess]);

  useEffect(() => {
    const totalAmount = watch("recipients")?.reduce((accumulator, item) => {
      return accumulator + Number(item.amount) ?? 0;
    }, 0);
    dispatch(setTotal(totalAmount));
  }, [watch()]);

  const onSubmit = async (data: any) => {
    console.log(data);
    if (data?.recipients?.length && data?.recipients?.length > 0) {
      const recipients: any = [];
      const amounts: any = [];
      let totalAmount: any = null;
      data.recipients.forEach((recipient: any) => {
        recipients.push(recipient.address);
        amounts.push(parseEther(recipient.amount));
        totalAmount += parseFloat(recipient.amount);
      });

      writeContract({
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        abi: MultiSendContract.abi,
        functionName: "multiSendEth",
        args: [recipients, amounts],
        value: parseEther(String(totalAmount)),
      });
    } else {
      window.alert("Should not be here");
    }
  };

  const handleOnClickDelete = (_index: any) => {
    const recipients = getValues("recipients");
    if (recipients.length > 1) {
      remove(_index);
    }
  };
  return (
    <Card
      bgColor="secondary.700"
      borderColor="secondary.500"
      borderWidth={2}
      w="full"
    >
      <CardBody>
        <LoadingOverlay isLoading={isPending || isTxLoading} />

        <Flex
          alignItems="flex-end"
          justifyContent="space-between"
          gap={6}
          mb={2}
        >
          <Text
            fontSize="2xl"
            color="secondary.200"
            letterSpacing={0.8}
            fontWeight={600}
          >
            Batch Send ETH Payments
          </Text>
          <Text fontSize="xs" color="secondary.200" mb={2}>
            Recpients: {fields.length}
          </Text>
        </Flex>

        <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDir="column" height="75%" maxHeight="75%" overflowY="auto">
            {fields.map((field, index) => (
              <TransactionRow
                key={index}
                chainId={chainId}
                errors={errors?.recipients?.[index]}
                index={index}
                field={field}
                register={register}
                onClickCopyRow={() => append({ address: "", amount: "" })}
                onClickRemoveRow={handleOnClickDelete}
                totalItems={fields.length}
              />
            ))}
          </Flex>

          <Flex justifyContent="flex-end" mt={6}>
            <Tooltip hasArrow isDisabled={isConnected} label="Connect wallet">
              <Button
                isDisabled={!isConnected || isTxLoading}
                isLoading={isTxLoading || isPending}
                colorScheme="secondary"
                size="sm"
                type="submit"
              >
                Submit
              </Button>
            </Tooltip>
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
};
export default MultiSendEthForm;

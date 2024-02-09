"use client";
import { parseEther } from "viem";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/redux-hooks";
import { setTotal } from "@/shared/slice/transaction-slice";
import {
  Text,
  Button,
  Flex,
  Tooltip,
  useToast,
  Card,
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
  const { isConnected } = useAccount();
  const dispatch = useAppDispatch();
  const chainId = useChainId();
  const toast = useToast();
  const {
    writeContract,
    isPending,
    isSuccess: isWriteSuccess,
    data,
    error: writeError,
    failureReason: writeErrorFailureReason,
    isError: isWriteError,
  } = useWriteContract();
  const {
    isError,
    isLoading,
    isSuccess: isTxSuccess,
    isPending: isTxPending,
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
    } else if (isWriteSuccess) {
      toast({
        title: "Action Success",
        // @ts-ignore
        description: "Transaction sent",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      reset();
    }
  }, [isWriteError, isWriteSuccess]);

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
    <Card bgColor="#201B43" w="full">
      <CardBody>
        <LoadingOverlay isLoading={isPending} />
        <Text mb={2} fontSize="2xl" color="white" fontWeight={600}>
          Batch Send ETH Payments
        </Text>

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
                isDisabled={!isConnected}
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

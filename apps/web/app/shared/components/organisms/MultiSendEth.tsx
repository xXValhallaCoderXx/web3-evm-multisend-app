"use client";
import { parseEther } from "viem";
import { useEffect } from "react";
import { Text, Button, Flex, Box, useToast } from "@chakra-ui/react";
import TransactionRow from "@/components/molecules/TransactionRow";
import { useForm, useFieldArray } from "react-hook-form";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MultiSendContract from "@/shared/abi/MultiSend.json";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";

const MultiSendEthForm = () => {
  const toast = useToast();
  const {
    writeContract,
    isPending,
    isSuccess,
    data,
    error: writeError,
    failureReason: writeErrorFailureReason,
    isError: isWriteError,
    ...restWrite
  } = useWriteContract();
  const {
    isError,
    isLoading,
    isSuccess: isTxSuccess,
    isPending: isTxPending,
    ...restTx
  } = useWaitForTransactionReceipt({
    hash: data,
  });
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipients: [{ address: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
  });
  console.log("isWriteError: ", isWriteError);
  useEffect(() => {
    if (isWriteError) {
      console.log("TOAST ERROR: ", writeError);
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
  }, [isWriteError]);

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
  console.log("REST WRITE: ", isPending);
  console.log("REST TX: ", restTx);
  return (
    <div>
      <LoadingOverlay isLoading={isPending} />
      <Text fontSize="2xl" fontWeight={600}>
        Batch Send ETH Payments
      </Text>
      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <TransactionRow
              key={index}
              index={index}
              field={field}
              register={register}
              onClickCopyRow={() => append({ address: "", amount: "" })}
              onClickRemoveRow={remove}
            />
          ))}

          <Flex justifyContent="flex-end" mt={4}>
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
};
export default MultiSendEthForm;

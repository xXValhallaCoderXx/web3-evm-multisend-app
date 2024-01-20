"use client";
import { parseEther } from "viem";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/redux-hooks";
import { setTotal } from "@/shared/slice/transaction-slice";
import { Text, Button, Flex, Box, useToast } from "@chakra-ui/react";
import TransactionRow from "@/components/molecules/TransactionRow";
import { useForm, useFieldArray } from "react-hook-form";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MultiSendContract from "@/shared/abi/MultiSend.json";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";

const MultiSendEthForm = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    writeContract,
    isPending,
    isSuccess: isWriteSuccess,
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

  console.log("REST WRITE: ", restWrite);
  console.log("REST TX: ", restTx);
  console.log("IS TX PENDING: ", isTxPending);
  console.log("IS TX SUCCESS: ", isTxSuccess);
  console.log("IS TX ERROR: ", isError);
  console.log("IS WRITE PENDING: ", isPending);
  console.log("IS WRITE ERROR: ", isWriteError);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
  });
  useEffect(() => {
    if (isWriteError) {
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
    }
  }, [isWriteError, isWriteSuccess]);

  useEffect(() => {
    const totalAmount = watch("recipients")?.reduce((accumulator, item) => {
      return accumulator + Number(item.amount);
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
      console.log("amounts: ", amounts);
      console.log("recipients: ", recipients);
      console.log("totalAmount: ", totalAmount);
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

  return (
    <Box maxH="100vh">
      <LoadingOverlay isLoading={isPending} />
      <Text fontSize="2xl" fontWeight={600}>
        Batch Send ETH Payments
      </Text>
      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box maxH={450} p={4} overflowY="auto">
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
          </Box>

          <Flex justifyContent="flex-end" mt={4}>
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
export default MultiSendEthForm;

"use client";
import { parseEther } from "viem";
import { Text, Button, Flex, Box } from "@chakra-ui/react";
import TransactionRow from "@/components/molecules/TransactionRow";
import { useForm, useFieldArray } from "react-hook-form";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MultiSendContract from "@/shared/abi/MultiSend.json";

const MultiSendEthForm = () => {
  const { writeContract, isPending, isSuccess, data } = useWriteContract();
  const {
    isError,
    isLoading,
    isSuccess: isTxSuccess,
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

  const onSubmit = async (data: any) => {
    console.log(data);

    const recipients: any = [];
    const amounts: any = [];
    let totalAmount: any = null;
    data.transactions.forEach((transaction: any) => {
      recipients.push(transaction.address);
      amounts.push(parseEther(transaction.amount));
      totalAmount += parseFloat(transaction.amount);
    });

    // writeContract({
    //   address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    //   abi: MultiSendContract.abi,
    //   functionName: "multiSendEth",
    //   args: [recipients, amounts],
    //   value: parseEther(String(totalAmount)),
    // });
  };

  return (
    <div>
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

import { useForm, useFieldArray } from "react-hook-form";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MultiSendContract from "../../shared/abi/MultiSend.json";

const SendMultipleEthForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transactions: [{ address: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const { writeContract, isPending, isSuccess, data } = useWriteContract();
  const {
    isError,
    isLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

    const recipients: any = [];
    const amounts: any = [];
    let totalAmount: any = null
    data.transactions.forEach((transaction: any) => {
      recipients.push(transaction.address);
      amounts.push(parseEther(transaction.amount));
      totalAmount += parseFloat(transaction.amount )
    });
  
    writeContract({
      address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
      abi: MultiSendContract.abi,
      functionName: "multiSendEth",
      args: [recipients, amounts],
      value: parseEther(String(totalAmount)),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="form-group">
            <label htmlFor={`address-${index}`}>Address</label>
            <input
              type="text"
              className="form-control"
              {...register(`transactions.${index}.address`, { required: true })}
            />
            {errors.transactions?.[index]?.address && (
              <span>This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor={`amount-${index}`}>Amount</label>
            <input
              type="text"
              className="form-control"
              {...register(`transactions.${index}.amount`, { required: true })}
            />
            {errors.transactions?.[index]?.amount && (
              <span>This field is required</span>
            )}
          </div>
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ address: "", amount: "" })}>
        Add Transaction
      </button>
      <button type="submit" className="btn btn-primary">
        Send
      </button>
      <div>
        {(isPending || isLoading) && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              {isPending ? "Pending" : "Loading"}...
            </span>
          </div>
        )}
        {isTxSuccess && <div>Success!</div>}
      </div>
    </form>
  );
};

export default SendMultipleEthForm;

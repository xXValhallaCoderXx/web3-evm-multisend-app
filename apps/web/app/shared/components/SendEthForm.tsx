"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MultiSendContract from "../../shared/abi/MultiSend.json";

const SendEthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { writeContract, isPending, isSuccess, data } = useWriteContract();

  const {
    isError,
    isLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const onSubmit = async (data: any) => {
    // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    writeContract({
      abi: MultiSendContract.abi,
      address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
      functionName: "sendEther",
      value: parseEther(data?.amount || ""),
      args: [data?.address, parseEther("1")],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          {...register("address", { required: true })}
        />
        {errors.address && <span>This field is required</span>}
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          className="form-control"
          id="amount"
          {...register("amount", { required: true })}
        />
        {errors.amount && <span>This field is required</span>}
      </div>
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

export default SendEthForm;

import { Text, Button, Flex, Card, CardBody } from "@chakra-ui/react";
import { useChainId } from "wagmi";
import { useForm, useFieldArray } from "react-hook-form";
import TransactionRow from "@/components/molecules/TransactionRow";

const MultiSendToken = () => {
  const chainId = useChainId();
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
      recipients: [{ address: "", amount: "", token: null }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
  });

  const onSubmit = async (data: any) => {
    console.log("SUBMIT", data);
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
        {/* <LoadingOverlay isLoading={isPending} /> */}
        <Text mb={2} fontSize="2xl" color="white" fontWeight={600}>
          Batch Send Token Payments
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
                onClickCopyRow={() =>
                  append({ address: "", amount: "", token: null })
                }
                onClickRemoveRow={handleOnClickDelete}
              />
            ))}
          </Flex>

          <Flex justifyContent="flex-end" mt={6}>
            <Button colorScheme="secondary" size="sm" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
};

export default MultiSendToken;

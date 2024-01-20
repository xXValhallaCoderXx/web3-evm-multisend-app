import { Text, Input, Button } from "@chakra-ui/react"

const TransactionRow = () => {
    return <div key={1}>
        <div className="form-group">
            <Text >Address</Text>
            {/* <Input
                type="text"
                className="form-control"
                {...register(`transactions.${index}.address`, { required: true })}
            />
            {errors.transactions?.[index]?.address && (
                <span>This field is required</span>
            )} */}
        </div>
        <div className="form-group">
            <Text >Amount</Text>
            {/* <Input
                type="text"
                className="form-control"
                {...register(`transactions.${index}.amount`, { required: true })}
            />
            {errors.transactions?.[index]?.amount && (
                <span>This field is required</span>
            )} */}
        </div>
        {/* <Button type="button" onClick={() => remove(index)}>
            Remove
        </Button> */}
    </div>
}

export default TransactionRow
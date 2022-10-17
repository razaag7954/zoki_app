import { useDispatch } from "react-redux";
import { setLoading } from "redux/actions";

import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

export default function AmountForm({ amount, setAmount, setCheckout }) {
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setLoading())
        setCheckout(true)
    }

    return (
        <form onSubmit={submitHandler}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField
                        className='mt-4 w-100'
                        label="Topup Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </GridItem>
            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Button disabled={!amount} type='submit' className='mt-4 w-100' color="success" round>
                        Proceed
                    </Button>
                </GridItem>
            </GridContainer>
        </form>
    )
}
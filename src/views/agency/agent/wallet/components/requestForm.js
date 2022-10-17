import { useState } from 'react'
import { useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';
import { setLoading, unsetLoading } from "redux/actions";
import { requestTopup } from 'crud';

import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

export default function RequestForm({ id }) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setLoading())
        requestTopup(id, {
            description,
            amount
        })
            .then(res => {
                console.log(res.data)
                enqueueSnackbar('Topup Request Sent.', { variant: 'success' })
                setDescription('')
                setAmount('')
                dispatch(unsetLoading())
            })
            .catch(error => {
                console.log(error)
                enqueueSnackbar('Unable to send topup request.', { variant: 'error' })
                dispatch(unsetLoading())
            })
    }

    return (
        <form onSubmit={submitHandler}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField
                        className='mt-4 w-100'
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </GridItem>
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
                    <Button disabled={!amount && !description} type='submit' className='mt-4 w-100' color="success" round>
                        Request Topup
                    </Button>
                </GridItem>
            </GridContainer>
        </form>
    )
}
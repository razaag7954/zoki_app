import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Button from "components/CustomButtons/Button.js";

export default function CheckoutForm({ url }) {
    const { enqueueSnackbar } = useSnackbar();

    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // const clientSecret = new URLSearchParams(window.location.search).get(
        //     "payment_intent_client_secret"
        // );

        // if (!clientSecret) {
        //     return;
        // }

        // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        //     switch (paymentIntent.status) {
        //         case "succeeded":
        //             enqueueSnackbar("Payment succeeded!", { variant: 'success' })
        //             break;
        //         case "processing":
        //             enqueueSnackbar("Your payment is processing.", { variant: 'info' })
        //             break;
        //         case "requires_payment_method":
        //             enqueueSnackbar("Your payment was not successful, please try again.", { variant: 'error' })
        //             break;
        //         default:
        //             enqueueSnackbar("Something went wrong.", { variant: 'error' })
        //             break;
        //     }
        // });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: url
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            enqueueSnackbar(error.message, { variant: 'error' })
        } else {
            enqueueSnackbar("An unexpected error occured.", { variant: 'error' })
        }
        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Button disabled={isLoading || !stripe || !elements} id="submit" className='mt-4 w-100' color="success" round type='submit'>
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </Button>
            {/* Show any error or success messages */}
            {/* {message && <div id="payment-message">{message}</div>} */}
        </form>
    );
}
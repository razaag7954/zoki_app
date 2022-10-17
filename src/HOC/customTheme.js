import React, { useEffect } from 'react';
import Backdrop from 'components/Backdrop';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux';
import { unsetLoading } from 'redux/actions';

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#9c8e35',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#000000',
        },
    },
    // overrides: {
    //     // Style sheet name ⚛️
    //     MuiCardHeader: {
    //         // Name of the rule
    //         title: {
    //             // Some CSS
    //             // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //             // borderRadius: 3,
    //             // border: 0,
    //             // color: 'black',
    //             // height: 48,
    //             padding: '100 100px',
    //             // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //         },
    //     },
    // },
});

export default function CustomTheme({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(unsetLoading())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Backdrop>
                    {children}
                </Backdrop>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
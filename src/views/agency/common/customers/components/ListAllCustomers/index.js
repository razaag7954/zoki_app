import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { getAllCustomers } from 'crud'
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip'
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tr: {
        '&:hover': {
            backgroundColor: "#efefef",
            cursor: 'pointer'
        },
    }
}));

export default function ListAllCustomers({ reload, setReload, setRender }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState("")
    const [listCustomers, setListCustomers] = useState([])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPage, setTotalPage] = useState(1)
    const [totalRecord, setTotalRecord] = useState(0)

    useEffect(() => {
        fetchData();
    }, [reload])

    const fetchData = () => {
        const params = {
            search: { query: search },
            sort: "name",
            page,
            pageSize: rowsPerPage
        }
        dispatch(setLoading())
        getAllCustomers(params)
            .then(res => {
                // console.log(res.data.data.customers)
                setListCustomers(res.data.data.customers)
                setTotalPage(res.data.data.totalPages)
                setTotalRecord(res.data.data.totalRecords)
                dispatch(unsetLoading())
            })
            .catch(error => {
                if (error.response.status === 401) {
                    history.push('/401')
                } else {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    enqueueSnackbar('Unable to fetch data.', { variant: 'error' })
                }
                dispatch(unsetLoading())
            })
    }

    const handleSearch = () => {
        fetchData();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
        setReload(prev => prev + 1)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(1);
        setReload(prev => prev + 1)
    };

    return (
        <div>
            <div className='d-flex w-100 mb-1 justify-content-between align-items-center'>
                <h5 className='p-0 m-0'>All Customers</h5>
                <div className='d-flex justify-content-end'>
                    <input
                        className='w-100 p-1'
                        placeholder='Search Here'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch} className='btn ml-1 p-2' style={{ minWidth: 100, fontWeight: 500, width: "10%", color: 'white', backgroundColor: 'black' }}>
                        Search
                    </button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead style={{ backgroundColor: 'black' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Name</TableCell>
                            <TableCell style={{ color: 'white' }} align="right">Mobile</TableCell>
                            <TableCell style={{ color: 'white' }} align="right">Email</TableCell>
                            <TableCell style={{ color: 'white' }} align="right">Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCustomers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className='text-center' component="th" scope="row">
                                    No Record Found.
                                </TableCell>
                            </TableRow>) : (
                            listCustomers.map((customer) => (
                                <TableRow className={classes.tr} onClick={() => setRender(customer._id)} key={customer._id}>
                                    <TableCell component="th" scope="row">
                                        <ListItem className='pl-0'>
                                            <ListItemAvatar>
                                                <Avatar alt={customer.firstName} src={customer.dp} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={customer.middleName ? `${customer.firstName} ${customer.middleName} ${customer.lastName}` : `${customer.firstName} ${customer.lastName}`}
                                            // secondary={customer.systemRole}
                                            />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip color="primary" size="small" label={customer.contactInfo.mobile} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip color="secondary" size="small" label={customer.contactInfo.email} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip size="small" label={
                                            <Moment format="DD/MM/YYYY">{customer.createdAt}</Moment>
                                        } />
                                    </TableCell>
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalRecord}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
            />
        </div >
    );
}

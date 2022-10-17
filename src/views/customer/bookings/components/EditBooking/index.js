import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { useSnackbar } from 'notistack';
import { getSpecificBooking } from 'crud'
import EditFlight from './components/editFlight'
import EditHotel from './components/editHotel'
import EditPackage from './components/editPackage'

export default function EditBooking({ setReload, setRender, id, type }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({})

  useEffect(() => {
    dispatch(setLoading())
    getSpecificBooking(id)
      .then(res => {
        console.log(res.data.data.booking)
        setData(res.data.data.booking)
        dispatch(unsetLoading())
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to get booking data.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }, [id])

  return (
    <>
      {
        type === 'AIR' ? (
          <EditFlight setReload={setReload} setRender={setRender} data={data} />
        ) : type === 'HOTEL' ? (
          <EditHotel setReload={setReload} setRender={setRender} data={data} />
        ) : type === 'CAR' ? (
          <EditFlight setReload={setReload} setRender={setRender} data={data} />
        ) : type === 'TRAVEL_PACKAGE' ? (
          <EditPackage setReload={setReload} setRender={setRender} data={data} />
        ) : null
      }
    </>
  )
}
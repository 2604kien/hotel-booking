import React from 'react'
import "../../css/AllBooking.css"
import {useSelector, useDispatch} from 'react-redux';
import { getAllBooking } from '../../reducers/bookingReducer';
import BookingTableCard from './BookingTableCard';
export default function AllBooking(){
    const dispatch=useDispatch()
    const token=useSelector(state=> state.auth.token);
    const allBookingData=useSelector(state=>state.booking.entities);
    const element=allBookingData && allBookingData.length>0?allBookingData.map(el=><BookingTableCard key={el.id} data={el}/>):<></>
    React.useEffect(()=>{
        dispatch(getAllBooking(token));
    },[token, dispatch]);
    console.log(allBookingData);

    return(
        <div className='all--booking'>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Total Price</th>
                        <th>User Full Name</th>
                        <th>Room Number</th>
                        <th>Is Paid</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {element}
                </tbody>
            </table>
        </div>
    )
}
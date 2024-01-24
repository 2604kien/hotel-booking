import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookingById } from "../../reducers/bookingReducer";
import { useParams } from "react-router-dom";
export default function ViewBooking(){
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const currBooking=useSelector(state=>state.booking.currBooking);
    const {id}=useParams();
    React.useEffect(()=>{
        dispatch(getBookingById({id: id, token:token }));
    },[token, id, dispatch]);
    console.log(currBooking);
    return(
        <div className="view--booking">
           <h1>Booking for room {currBooking.room.roomNumber}</h1>
           <div className="view--booking--grid">
            <h3>Id:</h3> <h3>{currBooking.id}</h3>
            <h3>Check In:</h3><h3>{currBooking.checkIn.split('T')[0].split('-').reverse().join('-')}</h3>
            <h3>Check Out:</h3><h3>{currBooking.checkOut.split('T')[0].split('-').reverse().join('-')}</h3>
            <h3>Total Price:</h3> <h3>{currBooking.price}</h3>
            <h3>User Full Name:</h3><h3>{currBooking.user.fullName}</h3>
            <h3>Room Number:</h3><h3>{currBooking.room.roomNumber}</h3>
            <h3>User Email:</h3><h3>{currBooking.user.email}</h3>
            <h3>User Phone Number:</h3> <h3>{currBooking.user.mobilePhone}</h3>
           </div>
        </div>
    )
}
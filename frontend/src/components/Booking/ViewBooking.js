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
    return(
        <div className="view--booking">
           <h1>Booking for room {currBooking.room?currBooking.room.roomNumber:null}</h1>
           <div className="view--booking--grid">
            <h3>Id:</h3> <h3>{currBooking.id?currBooking.id:null}</h3>
            <h3>Check In:</h3><h3>{currBooking.checkIn?currBooking.checkIn.split('T')[0].split('-').reverse().join('-'):null}</h3>
            <h3>Check Out:</h3><h3>{currBooking.checkOut?currBooking.checkOut.split('T')[0].split('-').reverse().join('-'):null}</h3>
            <h3>Total Price:</h3> <h3>{currBooking.price?currBooking.price:null}</h3>
            <h3>User Full Name:</h3><h3>{currBooking.user?currBooking.user.fullName:null}</h3>
            <h3>Room Number:</h3><h3>{currBooking.room?currBooking.room.roomNumber:null}</h3>
            <h3>User Email:</h3><h3>{currBooking.user?currBooking.user.email:null}</h3>
            <h3>User Phone Number:</h3> <h3>{currBooking.user?currBooking.user.mobilePhone:null}</h3>
           </div>
        </div>
    )
}
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking } from "../../reducers/bookingReducer";
import { useNavigate } from "react-router-dom";
export default function BookingTableCard(props){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const handleDelete=async ()=>{
        await dispatch(deleteBooking({id: props.data.id, token:token}));
        window.location.reload();
    }
    return(
        <tr>
            <td>{props.data.id?props.data.id:null}</td>
            <td>{props.data.checkIn?props.data.checkIn.split('T')[0].split('-').reverse().join('-'):null}</td>
            <td>{props.data.checkOut?props.data.checkOut.split('T')[0].split('-').reverse().join('-'):null}</td>
            <td>${props.data.price?props.data.price:null}</td>
            <td>{props.data.user?props.data.user.fullName:null}</td>
            <td>{props.data.room?props.data.room.roomNumber:null}</td>
            <td><input type="checkbox" checked={props.data.isPaid} readOnly/></td>
            <td style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                gap:"5px"
            }}>
                <button className="small--btn" onClick={()=>navigate(`/booking/${props.data.id}`)}>View</button>
                <button className="small--btn" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    )
}
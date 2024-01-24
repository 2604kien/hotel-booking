import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking } from "../../reducers/bookingReducer";
export default function BookingTableCard(props){
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const handleDelete=async ()=>{
        await dispatch(deleteBooking({id: props.data.id, token:token}));
        window.location.reload();
    }
    return(
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.checkIn.split('T')[0]}</td>
            <td>{props.data.checkOut.split('T')[0]}</td>
            <td>{props.data.price}</td>
            <td>{props.data.user.fullName}</td>
            <td>{props.data.room.roomNumber}</td>
            <td><input type="checkbox" checked={props.data.isPaid} readOnly/></td>
            <td style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                gap:"5px"
            }}>
                <button className="small--btn">View</button>
                <button className="small--btn" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    )
}
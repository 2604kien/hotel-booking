import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../reducers/roomReducer";
export default function RoomTableCard(props){
    const token=useSelector(state=> state.auth.token)
    const dispatch=useDispatch();
    const handleDelete=async ()=>{
        await dispatch(deleteRoom({id: props.data.id, token:token}));
        window.location.reload();
    }
    return (
        <tr>
            <td>{props.data.roomNumber}</td>
            <td>{props.data.roomDetail}</td>
            <td>{props.data.imagesNames}</td>
            <td>{props.data.category.name}</td>
            <td><div>
                <button onClick={handleDelete} className="small--btn">Delete</button>
            </div></td>
        </tr>
    )
}
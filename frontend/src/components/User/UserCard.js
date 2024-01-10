import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
export default function UserCard(props){
    const token=useSelector(state=>state.auth.token);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleDelete=async ()=>{
       await dispatch(deleteUser({id: props.data.id, token:token}));
       window.location.reload();
    }
    return (
        <tr>
            <td>{props.data.fullName}</td>
            <td>{props.data.username}</td>
            <td>{props.data.email}</td>
            <td>{props.data.mobilePhone}</td>
            <td>{props.data.roles.join(', ')}</td>
            <td><div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                <button onClick={()=>navigate(`/user/edit/${props.data.id}`)} className="small--btn">Edit</button>
                <button onClick={handleDelete} className="small--btn">Delete</button>
            </div></td>
        </tr>
    )
}
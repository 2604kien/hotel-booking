import React from "react";
import "../../css/ViewRoom.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoomById } from "../../reducers/roomReducer";
export default function ViewRoom(){
    const {id}=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=useSelector(state=>state.auth.token);
    React.useEffect(()=>{
        dispatch(getRoomById({id:id, token:token}));
    },[dispatch, token, id]);
    return(
        <div className="view--room">
            <h1>This is view room page</h1>
        </div>
    )
}
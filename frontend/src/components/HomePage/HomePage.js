import "../../css/HomePage.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoom } from "../../reducers/roomReducer";
import RoomCard from "./RoomCard";

export default function HomePage(){
    const roomData=useSelector(state=>state.room.entities);
    const element=roomData.length>0 && Array.isArray(roomData)?roomData.map(el=><RoomCard key={el.id} data={el}/>):(<></>)
    const dispatch=useDispatch();
    React.useEffect(()=>{
        dispatch(getAllRoom());
    },[])
    return(
        <div className="home--page">
            <div className="grid--room">
                {element}
            </div>
        </div>
    )
}
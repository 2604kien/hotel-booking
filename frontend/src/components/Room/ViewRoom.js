import React from "react";
import "../../css/ViewRoom.css"
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoomById } from "../../reducers/roomReducer";
import { server } from "../../config/serverURL";
import BookingCard from "../Booking/BookingCard";
export default function ViewRoom(){
    const {id}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=useSelector(state=>state.auth.token);
    const roomData=useSelector(state=>state.room.currRoom);
    const element=roomData?roomData.imageNames.map(el=><img key={Math.random()*1000} style={{overflow:"hidden", borderRadius:"15px", transition:"all 0.5s ease", width:"100%"}} src={`${server}/images/room/${el}`}/>):<></>
    React.useEffect(()=>{
        dispatch(getRoomById({id:id, token:token}));
    },[dispatch, token, id]);
    return(
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div className="view--room">       
                    <img style={{overflow:"hidden", borderRadius:"15px", transition:"all 0.5s ease", width:"100%"}} src={roomData?`${server}/images/room/${roomData.imageNames[0]}`:""}/>
                   <div className="alt--image--info">
                       {roomData.imageNames && roomData.imageNames.length>1? (<div className="image--grid">
                            {element}
                       </div>):(<div>
                            <h4>No more images provided</h4>
                       </div>)}
                    </div>                  
            </div>
            <div className="detail--payment">
                    <div className="displayFlexCenter" style={{alignItems:"flex-start", height:"100%", paddingBottom:"50px", borderRadius:"15px"}}>
                        <h1>Room {roomData?(roomData.roomNumber + " | "+roomData.category.name):""}</h1>
                        <hr style={{color:"black", width:"100%"}}/>
                        <p>{roomData.roomDetail}</p>
                        <p>{roomData.category?roomData.category.description:""}</p>
                    </div>
                    <BookingCard price={roomData.price}/>
            </div>
        </div>
    )
}
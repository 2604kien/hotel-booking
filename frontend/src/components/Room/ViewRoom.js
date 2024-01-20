import React from "react";
import "../../css/ViewRoom.css"
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import temp from "../../images/Standard.png"
import { getRoomById } from "../../reducers/roomReducer";
import arrow from "../../images/next.png"
import { server } from "../../config/serverURL";
export default function ViewRoom(){
    const {id}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=useSelector(state=>state.auth.token);
    const roomData=useSelector(state=>state.room.currRoom);
    const [currIMG, setCurrIMG]=React.useState(0);
 
    console.log(roomData)
    React.useEffect(()=>{
        dispatch(getRoomById({id:id, token:token}));
    },[dispatch, token, id]);
    return(
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div className="view--room">       
                    <img style={{overflow:"hidden", borderRadius:"15px", transition:"all 0.5s ease"}} src={roomData?`${server}/images/room/${roomData.imageNames[currIMG]}`:temp}/>
                   <div>
                   <h4>Room Number: <span style={{fontWeight:"400"}}>{roomData.roomNumber}</span></h4>
                    {roomData.category && <h4>Category: <span style={{fontWeight:"400"}}>{roomData.category.name}</span></h4>}
                    <h4>Detail: <span style={{fontWeight:"400"}}>{roomData.roomDetail}</span></h4>
                   </div>
            </div>
        </div>
    )
}
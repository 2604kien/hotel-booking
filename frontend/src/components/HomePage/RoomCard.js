import React from "react";
import "../../css/RoomCard.css";
import { useNavigate } from "react-router-dom";
import arrow from "../../images/next.png"
import { server } from "../../config/serverURL";
export default function RoomCard(props){
    const navigate=useNavigate();
    const [currIMG, setCurrIMG]=React.useState(0);
    const handleIncr=()=>{
        if(currIMG<props.data.imageNames.length-1) setCurrIMG(prev=>prev+1);
        else if(currIMG===props.data.imageNames.length-1) setCurrIMG(0);
    }
    const handleDecre=()=>{
        if(currIMG<=0) setCurrIMG(props.data.imageNames.length-1);
        else setCurrIMG(prev=> prev-1);
    }
    const element=props.data.isDisplay?(
        <div className="roomCard" >
            {props.data.imageNames.length>1&&<div className="arrow">
                <img onClick={handleDecre} src={arrow} style={{transform:"scale(-1)", position:"absolute", left:"10px"}} />
                <img onClick={handleIncr} src={arrow} style={{position:"absolute", right:"30px"}}/>

            </div>}
            <div onClick={()=>navigate(`/room/view/${props.data.id}`)}>
            <img style={{width:"100%", overflow:"hidden", borderRadius:"15px", transition:"all 0.5s ease"}} src={server+`images/room/${props.data.imageNames[currIMG]}`}/>
            <h4>Room Number: <span style={{fontWeight:"400"}}>{props.data.roomNumber}</span></h4>
            {props.data.category && <h4>Category: <span style={{fontWeight:"400"}}>{props.data.category.name}</span></h4>}
            <h4>Detail: <span style={{fontWeight:"400"}}>{props.data.roomDetail}</span></h4>
            </div>
        </div>
    ):(<></>);
    return element;
}
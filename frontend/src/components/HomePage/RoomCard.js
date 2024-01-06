import React from "react";
import "../../css/RoomCard.css";
import tempPhoto from "../../images/Standard.png";
export default function RoomCard(props){
    return(
        <div className="roomCard">
            <img style={{width:"100%", overflow:"hidden", borderRadius:"15px"}} src={tempPhoto}/>
            <h4>Room Number: <span style={{fontWeight:"400"}}>{props.data.roomNumber}</span></h4>
            {props.data.category && <h4>Category: <span style={{fontWeight:"400"}}>{props.data.category.name}</span></h4>}
            <h4>Detail: <span style={{fontWeight:"400"}}>{props.data.roomDetail}</span></h4>
        </div>
    );
}
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomTableCard from "./RoomTableCard";
import { admin } from "../../config/role";
import Error404 from "../Error404";
import { getAllRoom } from "../../reducers/roomReducer";
export default function AllRoom(){
    const roles=useSelector(state=>state.auth.roles);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const roomData=useSelector(state=> state.room.clone);
    const element=roomData&& roomData.length>0?roomData.map(el=> <RoomTableCard key={el.id} data={el}/>):<></>
    const data= roles.includes(admin)?(<div className="add--category">
                    
                    <div style={{
                        width:"60vw",
                        display:"flex",
                        justifyContent:"flex-end",
                        marginTop:"50px",
                    }}>
                        <button onClick={()=>navigate('/room/add')} className="small--btn">Add New Room</button>
                    </div>
                    <h1>All Room</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Room Number</th>
                                    <th>Room Detail</th>
                                    <th>Room Photo Name</th>
                                    <th>Room Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {element}
                            </tbody>
                        </table>
                </div>):<Error404/>
    React.useEffect(()=>{
        dispatch(getAllRoom());
    },[dispatch]);
    return data;
}
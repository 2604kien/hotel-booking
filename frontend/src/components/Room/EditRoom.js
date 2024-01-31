import React from "react";
import "../../css/EditRoom.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomById, updateRoomById } from "../../reducers/roomReducer";
import { getAllCategory } from "../../reducers/categoryReducer";
export default function EditRoom(){
    const {id}=useParams();
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const allCategory=useSelector(state=>state.category.entities);
    const element= allCategory &&Array.isArray(allCategory)?allCategory.map(category=><option key={category.id} value={category.id}>{category.name}</option>):(<></>);
    const roomData=useSelector(state=>state.room.currRoom);
    const [room, setRoom]=React.useState({
        roomNumber:"",
        price:"",
        roomDetail:"",
        category:{
            id:""
        }
        
    });
    React.useEffect(()=>{
        dispatch(getRoomById({id, token}));
        dispatch(getAllCategory());
    },[id, dispatch,token]);
    React.useEffect(()=>{
        if (roomData) {
            setRoom(roomData);
          }
    }, [roomData]);
    const handleChange=(e)=>{
        const {name, value}=e.target;
        if(name==="id"){
            setRoom(prev=>{
                return {
                    ...prev,
                    category:{
                        id: value
                    }
                }
            })
        }
        setRoom(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await dispatch(updateRoomById({id, token, data:room}));
        window.location.reload();
    }
    return(
        <div className="add--category">
            <h1>Edit Room</h1>
            <form className="add--category--form" onSubmit={handleSubmit}>
                <label htmlFor="room--number">Room Number:</label>
                <input onChange={handleChange} id="room--number" name="roomNumber" value={room.roomNumber} type="number" placeholder="Enter room number..." required/>
                <label htmlFor="room--number">Room Price/night:</label>
                <input onChange={handleChange} id="room--number" name="price" value={room.price} type="number" placeholder="Enter room price..." required/>
                <label htmlFor="select--category">Category:</label>
                <select id="select--category" onChange={handleChange} value={room.category.id} name="id" >
                    <option>--Select--</option>
                    {element}
                </select>
               
                <label htmlFor="room--detail">Room Detail:</label>
                <textarea onChange={handleChange} name="roomDetail" value={room.roomDetail} id="room--detail" required></textarea>

                
                <div style={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <button>Submit</button>
                </div>
                
            </form>
        </div>
    )
}
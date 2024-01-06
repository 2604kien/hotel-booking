import React from "react";
import "../../css/Category.css";
import {useDispatch, useSelector} from "react-redux";
import { createNewRoom } from "../../reducers/roomReducer";
export default function AddRoom(){
    const allCategory=useSelector(state=>state.category.entities);
    const dispatch=useDispatch();
    const element= allCategory &&Array.isArray(allCategory)?allCategory.map(category=><option key={category.id} value={category.id}>{category.name}</option>):(<></>)
    const [formData, setFormData]=React.useState({
        roomNumber:"",
        roomDetail:"",
        category:{
            id:""
        }
    })
    const handleChange=(e)=>{
        const {name, value}=e.target;
        if(name==="id"){
            setFormData(prev=>{
                return {
                    ...prev,
                    category:{
                        id: value
                    }
                }
            })
        }
        setFormData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createNewRoom(formData)).then(()=>{

        })
        
    }
    return(
        <div className="add--category">
            <h1>Add New Room</h1>
            <form className="add--category--form" onSubmit={handleSubmit}>
                <label htmlFor="room--number">Room Number:</label>
                <input onChange={handleChange} id="room--number" name="roomNumber" value={formData.roomNumber} type="number" placeholder="Enter room number..."/>
                <label htmlFor="select--category">Category:</label>
                <select id="select--category" onChange={handleChange} value={formData.category.id} name="id" >
                    {element}
                </select>
                <label htmlFor="room--detail">Room Detail:</label>
                <textarea onChange={handleChange} name="roomDetail" value={formData.roomDetail} id="room--detail"></textarea>
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
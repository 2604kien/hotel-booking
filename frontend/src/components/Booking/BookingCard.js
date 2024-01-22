import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
export default function BookingCard(props){
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const userId=token && JSON.parse(window.atob(token.split('.')[1])).UserInfo.id;
    const roomId=useParams().id;
    const [formData, setFormData]=React.useState({
        checkIn:"",
        checkOut:"",
        userId:"",
        roomId:Number(roomId)
    })
    React.useEffect(()=>{
        if(token) setFormData(prev=>{
            return{
                ...prev,
                userId:userId
            }
        })
    },[token])
    const handleChange=(event)=>{
        const {name, value}=event.target;
        console.log(formData)
        setFormData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const days=Math.ceil((moment.utc(formData.checkOut).unix()-moment.utc(formData.checkIn).unix())/ ( 60 * 60 * 24));
    const element=days>=1?"Total: $"+days*props.price+" AUD":"Please enter valid check-in, check-out date.";
    const handleSubmit=()=>{
        if(days&&formData.checkIn&&formData.checkOut){
            dispatch()
        }
        else{
            alert('Please enter valid check-in, check-out date.');
        }
    }
    return(
        <div className="booking--card">
            <h2>{element}</h2>
            <form style={{display: "grid", gridTemplateColumns:"49% 49%", gap:"2%"}}>
                <div className="displayFlexCenter">
                    <label htmlFor="checkIn">Check In</label>
                    <input onChange={handleChange} value={formData.checkIn}  min={new Date().toISOString().split('T')[0]} type="date" id="checkIn" name="checkIn"/>
                </div>
                <div className="displayFlexCenter">
                    <label htmlFor="checkOut">Check Out</label>
                    <input onChange={handleChange} value={formData.checkOut} min={formData.checkIn} type="date" id="checkOut" name="checkOut"/>
                </div>
            </form>
            <div className="displayFlexCenter" style={{alignItems:"center"}}>
                <button onClick={handleSubmit} style={{width:"150px"}}>Reserve</button>
                {days>0&&<h3 style={{textDecoration:"underline"}}>Price: <span style={{fontWeight:"400"}}>${props.price} AUD/day x {days} day(s)</span></h3>}
            </div>
            
        </div>
    )
}
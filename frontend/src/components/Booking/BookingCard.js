import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { addBooking } from "../../reducers/bookingReducer";
export default function BookingCard(props){
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const userId=token && JSON.parse(window.atob(token.split('.')[1])).UserInfo.id;
    const roomId=useParams().id;
    const [formData, setFormData]=React.useState({
        checkIn:"",
        checkOut:"",
        price:"",
        user:{
            id:""
        },
        room:{
            id:Number(roomId)
        }
    })
    const days=Math.ceil((moment.utc(formData.checkOut).unix()-moment.utc(formData.checkIn).unix())/ ( 60 * 60 * 24))===0?1:Math.ceil((moment.utc(formData.checkOut).unix()-moment.utc(formData.checkIn).unix())/ ( 60 * 60 * 24));
    const element=days>=1?"Total room price: $"+days*props.price+" AUD":"Please enter valid dates to calculate total room price.";
    React.useEffect(()=>{
        if(token) setFormData(prev=>{
            return{
                ...prev,
                user:{
                    id:userId
                }
            }
        })
    },[token, userId])
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
   console.log(days*props.price);
    const handleSubmit=async ()=>{
        if(days&&formData.checkIn&&formData.checkOut){
            await dispatch(addBooking({data:formData, token:token, price: days*props.price}));
            alert('Your booking is succeeded.');
        }
        else{
            alert('Please enter valid check-in, check-out date.');
        }
    }
    return(
        <div className="booking--card">
            <h2 style={{textAlign:"center"}}>{element}</h2>
            <form style={{display: "grid", gridTemplateColumns:"49% 49%", gap:"2%", border:"1px solid black",padding:"10px", borderRadius:"15px", borderColor:"#666"}}>
                <div className="displayFlexCenter" style={{borderRight:"1px solid black"}}>
                    <label style={{ fontWeight:"600", fontSize:"0.8rem", marginBottom:"5px"}} htmlFor="checkIn">CHECK-IN</label>
                    <input style={{width:"80%", textIndent:"2px", outline:"none", fontSize:"1rem"}} onChange={handleChange} value={formData.checkIn} min={new Date().toISOString().split('T')[0]} type="date" id="checkIn" name="checkIn"/>
                </div>
                <div className="displayFlexCenter" style={{paddingLeft:"20px"}}>
                    <label  style={{ fontWeight:"600", fontSize:"0.8rem",  marginBottom:"5px"}} htmlFor="checkOut">CHECK-OUT</label>
                    <input style={{width:"80%", textIndent:"2px", outline:"none", fontSize:"1rem"}} onChange={handleChange} value={formData.checkOut} min={formData.checkIn?formData.checkIn:new Date().toISOString().split('T')[0]} type="date" id="checkOut" name="checkOut"/>
                </div>
            </form>
            <div className="displayFlexCenter" style={{alignItems:"center", margin:"10px"}}>
                <button onClick={handleSubmit} className="reserve--button">Make Booking</button>
                {days>0&&<h3 style={{textDecoration:"underline"}}>Price: <span style={{fontWeight:"400"}}>${props.price} AUD/day x {days} day(s)</span></h3>}
            </div>
            <p style={{textAlign:"center", fontStyle:"italic"}}>Enter dates to check the total trip price, including additional fees and any taxes.</p>
        </div>
    )
}
import { Outlet } from "react-router-dom"
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "../../css/Navbar.css";
import { getAllCategory } from "../../reducers/categoryReducer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../../images/hotel.png"
import { filterRoom, getAllRoom } from "../../reducers/roomReducer";
export default function Navbar(){
    const navigate=useNavigate();
    const {id}=useParams();
    const roomItems=useSelector(state=>state.room.clone);
    const [searchData,setSerchData]=React.useState("");
    const filterData=roomItems && Array.isArray(roomItems)?roomItems.filter(room=>Object.values(room).filter(el=>JSON.stringify(el).toLowerCase().includes(searchData)||JSON.stringify(el).toUpperCase().includes(searchData)).length>0):[]
    const categoryItems=useSelector(state=>state.category.entities);
    const dispatch=useDispatch();
    const element=categoryItems && Array.isArray(categoryItems)?categoryItems.map(el=><li style={{
        backgroundColor:(Number(id)===el.id)?"rgba(224, 82, 82, 0.5)":"white",
        color:(Number(id)===el.id)?"white":"rgba(224, 82, 82, 0.5)"
    }} onClick={()=>navigate(`category/${el.id}`)} className="nav--category" key={el.id}>{el.name}</li>):(<></>)
    React.useEffect(()=>{
        dispatch(getAllCategory());
    },[dispatch])
    const handleChange=async (e)=>{
        const {value}=e.target
        setSerchData(value);
        
    }
    React.useEffect(()=>{
        navigate('/');
        dispatch(filterRoom(filterData));
    },[JSON.stringify(searchData)])
    return (
        <>
        <div className="nav--bar">
            <ul className="top--nav">
                <li onClick={()=>navigate('/')} style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"10px"
                }}><img src={logo} style={{width:"50px"}}/> ROYAL</li>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"20px"
                }}>
                    <input style={{
                        fontSize:"1.2rem",
                        textIndent:"5px",
                        border:"none",
                        boxShadow:"0 0 5px rgba(0,0,0,0.5)",
                        borderRadius:"15px",
                        padding:"5px",
                        outline:"none",
                        width:"400px"
                    }} type="text" value={searchData} onChange={handleChange} placeholder="Search..."/>
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"20px"
                }}>
                    <li>Login</li>
                    <li onClick={()=>navigate('/register')}>Register</li>
                </div>
            </ul>
            <ul className="bottom--nav">
                {element}
            </ul>
        </div>
        <Outlet/>
        </>
    )
}
import { Outlet } from "react-router-dom"
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "../../css/Navbar.css";
import { getAllCategory } from "../../reducers/categoryReducer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../../images/hotel.png"
import { filterRoom} from "../../reducers/roomReducer";
import { logout, refresh, resetMessage } from "../../reducers/authReducer";
export default function Navbar(){
    const navigate=useNavigate();
    const {id}=useParams();
    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
    const roles=useSelector(state=>state.auth.roles);
    const roomItems=useSelector(state=>state.room.clone);
    const [searchData,setSerchData]=React.useState("");
    const filterData=roomItems && Array.isArray(roomItems)?roomItems.filter(room=>Object.values(room).filter(el=>JSON.stringify(el).toLowerCase().includes(searchData.toLowerCase())).length>0):[]
    const categoryItems=useSelector(state=>state.category.entities);
    const dispatch=useDispatch();
    const element=categoryItems && Array.isArray(categoryItems)?categoryItems.map(el=><li style={{
        backgroundColor:(Number(id)===el.id)?"rgba(224, 82, 82, 0.5)":"white",
        color:(Number(id)===el.id)?"white":"rgba(224, 82, 82, 0.5)"
    }} onClick={()=>navigate(`category/${el.id}`)} className="nav--category" key={el.id}>{el.name}</li>):(<></>)
    const token=useSelector(state=>state.auth.token)
    React.useEffect(()=>{
        dispatch(getAllCategory());
        const tokenExpirationThreshold = 3; 
        let { exp } = token.length>0?JSON.parse(window.atob(token.split('.')[1])):"";
        setInterval(()=>{
                if (exp - Date.now() / 1000 < tokenExpirationThreshold) {
                  // Dispatch the refreshAccessToken action
                  
                 dispatch(refresh());
                 exp = {};
                }
            
        }, 13*60*1000)
    },[dispatch, token]);
    const handleChange=async (e)=>{
        const {value}=e.target
        setSerchData(value);
    }
    const handleLogout=async ()=>{
        await dispatch(logout());
        navigate('/login');
    }
    React.useEffect(()=>{
        dispatch(refresh());
        if(searchData.length>0)
        {
            navigate('/');
            dispatch(filterRoom(filterData));
        }
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
                }}><img src={logo} style={{width:"50px"}}/> <p>ROYAL</p></li>
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
                <div >
                    {isAuthenticated ?<div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"20px",
                    fontSize:"1.5rem",
                    cursor:"pointer"  
                }}>
                    {roles.includes("Admin")?<>
                        <li >Category</li>                        
                        <li >Room</li>
                        <li >Booking</li>
                        <li >User</li>
                        <li onClick={handleLogout}>Logout</li>
                    </>:<li onClick={handleLogout}>Logout</li>}
                </div>:<div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"20px",
                    fontSize:"1.5rem",
                    cursor:"pointer" 
                }}>
                    <li onClick={()=>navigate('/login')}>Login</li>
                    <li onClick={()=>navigate('/register')}>Register</li>
                </div>}
                    
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
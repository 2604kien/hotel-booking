import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "../../css/Navbar.css";
import { getAllCategory } from "../../reducers/categoryReducer";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import logo from "../../images/hotel.png"
import { filterRoom} from "../../reducers/roomReducer";
import { logout, refresh} from "../../reducers/authReducer";
import {admin} from "../../config/role"
import { getUserById } from "../../reducers/userReducer";
export default function Navbar(){
    const navigate=useNavigate();
    const {id}=useParams();
    const {pathname}=useLocation();
    console.log(pathname);
    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
    const roles=useSelector(state=>state.auth.roles);
    const roomItems=useSelector(state=>state.room.clone);
    const [searchData,setSerchData]=React.useState("");
    const filterData=roomItems && Array.isArray(roomItems)?roomItems.filter(room=>Object.values(room).filter(el=>JSON.stringify(el).toLowerCase().includes(searchData.toLowerCase())).length>0):[]
    const categoryItems=useSelector(state=>state.category.entities);
    const dispatch=useDispatch();
    const [isDrop, setIsDrop]=React.useState(false);
    const element=categoryItems && Array.isArray(categoryItems)?categoryItems.map(el=><li style={{
        backgroundColor:(Number(id)===el.id)&&pathname.includes("category")?"rgba(224, 82, 82, 0.5)":"white",
        color:(Number(id)===el.id)&&pathname.includes("category")?"white":"rgba(224, 82, 82, 0.5)"
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
    const navElement=(isAuthenticated ?<div className={isDrop && roles.includes(admin)?"column--menu open--admin":isDrop && !roles.includes(admin)?"column--menu open--user":"column--menu"} style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"1.5rem",
        cursor:"pointer",
        border:"1px solid black",
        background:"white",
        top:"100px",
        padding:"20px",
        borderRadius:"15px",
        width:"200px",
        right:"300px"
    }}>
        {roles.includes(admin)?<>
            <li onClick={()=>navigate('/category')}>Category</li>                        
            <li onClick={()=>navigate('/room')}>Room</li>
            <li onClick={()=>navigate('booking/all')}>Booking</li>
            <li onClick={()=>navigate('/user')}>User</li>
            <li onClick={handleLogout}>Logout</li>
        </>:<li onClick={handleLogout}>Logout</li>}
    </div>:<div  className={isDrop?"column--menu open":"column--menu"} style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"1.5rem",
        cursor:"pointer",
        border:"1px solid black",
        background:"white",
        top:"100px",
        padding:"20px",
        borderRadius:"15px",
        width:"200px",
        right:"300px"
    }}>
        <li onClick={()=>navigate('/login')}>Login</li>
        <li onClick={()=>navigate('/register')}>Register</li>
    </div>)
    React.useEffect(()=>{
        dispatch(refresh());
        dispatch(getUserById());
        if(searchData.length>0)
        {
            navigate('/');
            dispatch(filterRoom(filterData));
        }
    },[JSON.stringify(searchData), dispatch, navigate, searchData.length]);
    const handleDropdown=(e)=>{
        
        setIsDrop(prev=>!prev);
    }
    return (
        <div className="nav--bar">
          
            <ul className="top--nav">
                <li onClick={()=>navigate('/')} style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"10px"
                }}><img src={logo} style={{width:"50px"}} alt="royal hotel icon"/> <p>ROYAL</p></li>
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
                <div></div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-end", gap:"20px", position:"absolute", top:47, right:"10%"}}>
                <div >
                    <label className="burger" htmlFor="burger" >
                        <input type="checkbox" id="burger" onClick={handleDropdown}/>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="list" style={{ visibility:isDrop?"visible":"hidden"}}>
                   {navElement}
                </div>
                </div>
            </ul>
            <ul className="bottom--nav">
                {element}
            </ul>
        </div>
    )
}
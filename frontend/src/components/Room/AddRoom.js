import React from "react";
import "../../css/Category.css";
import {useDispatch, useSelector} from "react-redux";
import { createNewRoom } from "../../reducers/roomReducer";

export default function AddRoom(){
    const allCategory=useSelector(state=>state.category.entities);
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const element= allCategory &&Array.isArray(allCategory)?allCategory.map(category=><option key={category.id} value={category.id}>{category.name}</option>):(<></>);
    const [currFile, setCurrFile]=React.useState(null);
    const [fileArray, setFileArray]=React.useState([]);
    const [buttonClick, setButtonClick]=React.useState("false");
    const element2=fileArray.map(el=><div key={Math.random()*1000} style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        gap:"10px"
    }}>
        <p>{el.name}</p>
        <button onClick={(e)=>{
            e.preventDefault();
            setFileArray(prev=>{
                prev=prev.filter(file=>file.name!==el.name);
                
                return prev;
            })
            setFormData(prev=>{
                prev.imageNames=prev.imageNames.filter(i=>i!==el.name);
                return prev
            })
        }} style={{width:"30px", height:'30px'}}>X</button>
    </div>)
    const [formData, setFormData]=React.useState({
        roomNumber:"",
        price:"",
        roomDetail:"",
        category:{
            id:0
        },
        imageNames:[]
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
        
        dispatch(createNewRoom({data: formData, files:fileArray, token:token}))
        
    }
    const handleFile=(e)=>{
        setCurrFile(e.target.files[0])
       
    }
    const addFileToArrayList=(e)=>{
        e.preventDefault()
        setButtonClick(prev=>prev+"1");
        setFileArray(prev=>{
                prev.push(currFile);
            return prev;
        })
        setFormData(prev=>{
            prev.imageNames.push(currFile.name)
            return prev;
        })
    }
    
    return(
        <div className="add--category">
            <h1>Add New Room</h1>
            <form className="add--category--form" onSubmit={handleSubmit}>
                <label htmlFor="room--number">Room Number:</label>
                <input onChange={handleChange} id="room--number" name="roomNumber" value={formData.roomNumber} type="number" placeholder="Enter room number..." required/>
                <label htmlFor="room--number">Room Price/night:</label>
                <input onChange={handleChange} id="room--number" name="price" value={formData.price} type="number" placeholder="Enter room price..." required/>
                <label htmlFor="select--category">Category:</label>
                <select id="select--category" onChange={handleChange} value={formData.category.id} name="id" >
                    <option>--Select--</option>
                    {element}
                </select>
                <label htmlFor="file--upload">Upload Images:</label>
                <div>
                <input onChange={handleFile} type="file" id="file--upload" required/>
                <button style={{
                    width:"100px",
                    fontSize:"1rem",
                }}
                onClick={addFileToArrayList}
                >Upload</button>
                </div>
                <label htmlFor="room--detail">Room Detail:</label>
                <textarea onChange={handleChange} name="roomDetail" value={formData.roomDetail} id="room--detail" required></textarea>
                <div>
                    {element2}    
                </div>
                
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
import React from "react";
import "../../css/EditCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneCategory } from "../../reducers/categoryReducer";
import { useParams } from "react-router-dom";
export default function EditCategory(){
    const dispatch=useDispatch();
    const currCategory=useSelector(state=>state.category.currCategory);
    const [formData, setFormData]=React.useState({
        name:"",
        description:"",
        id:"",
        roomList:[]
    })
    const {id}=useParams();
    console.log(currCategory);
    React.useEffect(()=>{
        dispatch(getOneCategory(id));
    },[id, dispatch])
    React.useEffect(()=>{
        setFormData(currCategory);
    }, [currCategory])
    const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    
    return(
        <div className="add--category">
        <h1>Edit Category</h1>
        <form className="add--category--form" >
           
            <label htmlFor="name">Category Name:</label>
            <input onChange={handleChange} id="name" name="name" value={formData.name} required/>
            <label htmlFor="description">Category description:</label>
            <textarea onChange={handleChange} id="description" name="description" value={formData.description} required/>
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
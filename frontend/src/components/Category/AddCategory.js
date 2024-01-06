import React from "react";
import "../../css/Category.css";
import {useDispatch, useSelector} from "react-redux";
import { createNewCategory } from "../../reducers/categoryReducer";

export default function AddCategory(){
    const message=useSelector(state=>state.category.message);
    const dispatch=useDispatch();
    const [formData, setFormData]=React.useState({
        name:"",
        description:""
    })
    const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createNewCategory(formData)).then(()=>{
            alert('Added new Category successfully');
            window.location.reload();
        })
    }
    return(
        <div className="add--category">
            <h1>Add New Category</h1>
            <form className="add--category--form" onSubmit={handleSubmit}>
                <label htmlFor="category--name">Category Name:</label>
                <input onChange={handleChange} value={formData.name} name='name' type="text" placeholder="Please enter category name..." id="category--name"/>
                <label htmlFor="category--description">Category Description:</label>
                <textarea onChange={handleChange} id="category--description" value={formData.description} name='description' placeholder="Please enter description about rooms in this category..."></textarea>
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
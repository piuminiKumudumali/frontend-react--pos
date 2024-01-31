import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Category=()=>{

    const[categories,setCategories]=useState([]);
    const[id,setId]=useState(0);
    const[selectedRow,setSelectedRow]=useState(null);

    const[name,setName]=useState(null);

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    const getCategories=async()=>{
        const response=await axios.get("http://localhost:5054/categories");
        setCategories(response.data);
    }
    useEffect(()=>{
         getCategories();
         clearForm();
    },[])

    const handleRowClick=(category)=>{
        setSelectedRow(category);
        setId(category.id);
        setName(category.name);
    }
    const handleFormClearButton=(event)=>{
        event.preventDefault();
        clearForm();
    }
    const clearForm=()=>{
        setId("ID");
        setName("category name");
    }
    const handleCategoryInput=(event)=>{
        setName(event.target.value);
    }
    const handleId=(event)=>{
        setId(event.target.value);
    }
    

    const handleAdd=async(event)=>{
        event.preventDefault();
        const data={
            "name": name
        }
        const response=await axios.post("http://localhost:5054/categories",data);
        getCategories(response.data);
        clearForm();
    }

    const handleUpdate=async(event)=>{
        event.preventDefault();
        const data={
            "name": name
        }
        const response=await axios.put(`http://localhost:5054/categories/${id}`,data);
        getCategories(response.data);
        clearForm();
    }

    const handleDelete=async(event)=>{
        event.preventDefault();
        const response=await axios.delete(`http://localhost:5054/categories/${id}`);
        getCategories(response.data);
        clearForm();
    }

    return(
        <>
         <div>
            <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                <img src="https://thumb.ac-illust.com/b7/b76f2410f23065a6095caf9ee0498936_t.jpeg" alt="Bootstrap" width="30" height="30"/>
                    <a className="navbar-brand"><Link to={'/'}>Home</Link></a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{marginLeft:"25px"}}>
                            <Link to={'/users1'}>Manage-User</Link>
                        </li>
                        <li className="nav-item"style={{marginLeft:"50px"}}>
                            <Link to={'/items1'}>Manage-Item</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            Manage-Category
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            <Link to={'/stock'}>Manage-stock</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"300px"}}>
                            <Link to={'/cart'}>Add To Cart</Link>
                            <img src="https://www.iconpacks.net/icons/2/free-add-to-cart-icon-3046-thumb.png" alt="Bootstrap" width="20" height="20" li/>
                        </li>
                        <li className="nav-item" style={{marginLeft: "300px"}}>
                            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                    </div>
                </div> 
                </nav>
            </div>

            <div style={{marginTop:"15px",marginLeft:"50px",marginBottom:"50px"}}>
                <h1>Manage-Category</h1>
            </div>

            <div>
                <div className="col-md-10" style={{marginLeft:"60px"}}> 
                    <table className="table table-stripped table-bordered">
                        <thead className="table-bordered">
                                <th>ID</th>
                                <th>Category</th>
                        </thead>
                        <tbody className="table-success">
                            <tr>
                                <td>
                                    <input type="text" className="form-control" placeholder="ID" value={id} 
                                    onChange={handleId}
                                    readOnly 
                                    />
                                </td>
                                 <td>
                                    <input type="text" className="form-control" placeholder="Enter Category"
                                       value={name} onChange={handleCategoryInput}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div> 
            <div className="container-fluid" style={{display:"flex",marginLeft:"500px"}}>
                 
                    <button className="btn btn-light" style={{marginLeft:"25px"}} onClick={handleFormClearButton}>Clear Form</button>
                
                 
                    <button className="btn btn-success" type="submit" onClick={handleAdd} style={{marginLeft:"100px"}}>Add Category</button>
                 
                    <button className="btn btn-primary" style={{marginLeft:"25px"}} onClick={handleUpdate}>Update Category</button>
                 
                <button className="btn btn-danger" style={{marginLeft:"25px"}} onClick={handleDelete}>Delete Category</button>
                 
            </div>
            </div>

            <div>
                <div className="container" style={{marginLeft:"50px",marginTop:"70px"}}> 
                    <table className="table table-primary table-hover table-bordered">
                        <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                </tr>
                        </thead>
                        <tbody>
                            {
                                categories&&categories.map((category,index)=>{
                                    return <tr key={index} onDoubleClick={()=>handleRowClick(category)}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


         </div>
        </>
    )
}
export default Category;
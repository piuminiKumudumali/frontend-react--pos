import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
 

const Items=()=>{
    const[items,setItems]=useState([]);
    const[reocrd,setRecord]=useState([]);
    const[categories,setCategories]=useState(null);
     

     
    const[id,setId]=useState(0);
    const[name,setName]=useState(null);
    const[details,setDetails]=useState(null);
    const[price,setPrice]=useState(0);
    const[categoryId,setCategoryId]=useState(0);

    const[selectedItem,setSelectedItem]=useState(null);

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }
     
    const getItems=async()=>{
        const response=await axios.get("http://localhost:5054/items");
        setItems(response.data);
    }
    const getCategories=async()=>{
        const response=await axios.get("http://localhost:5054/categories");
        setCategories(response.data);
        clearForms();
    }

    useEffect(()=>{
        getItems();
        getCategories();
        clearForms();
    },[])

    
    const handleDetails=(event)=>{
        setDetails(event.target.value);
    }
    const handlePrice=(event)=>{
        setPrice(event.target.value);
    }
    const handleCategory=(event)=>{
        setCategoryId(event.target.value);
    }
    const handleId=(event)=>{
        setId(event.target.value);
    }
    const handleFormClearButton=()=>{
         clearForms();
    }
    

    const clearForms=()=>{
            setId("ID")
            setName("item name");
            setDetails("unit details");
            setPrice("unit price");
            setCategoryId(0);
    }

    const handleClick=(item)=>{
        setSelectedItem(item);
        setId(item.itemId); 
        setName(item.itemName);
        setDetails(item.unit);
        setPrice(item.unitPrice);
        setCategoryId(item.itemCategory.id);
    }

    const handleAdd=async(event)=>{
        event.preventDefault();
        const data={
                "name": name,
                "unit":details,
                "price": price,
                "categoryId":categoryId
        }
        const response=await axios.post("http://localhost:5054/items",data);
        getItems(response.data);
        clearForms();
    }

    const handleUpdate= async(event) => {
        event.preventDefault();
        const data = {
            "name": name,
            "unit": details,
            "price": price,
            "categoryId": categoryId
        }
        const response=await axios.put(`http://localhost:5054/items/${id}`, data);
        getItems(response.data) ;
        clearForms();
    }
    
    const handleDelete=async(event)=>{
        event.preventDefault();
        const response=await axios.delete(`http://localhost:5054/items/${id}`);
        getItems(response.data);
        clearForms();
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
                            <Link to={'/users'}>Manage-User</Link>
                        </li>
                        <li className="nav-item"style={{marginLeft:"50px"}}>
                            Manage-Item
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            <Link to={'/categories'}>Manage-Category</Link>
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
             
             <div> 
 
            <div style={{marginTop:"15px",marginLeft:"50px",marginBottom:"50px"}}>
                <h1>Manage-Item</h1>
            </div>

            <div className="col-md-10" style={{marginLeft:"100px"}}> 
                <table className="table table-stripped table-bordered">
                    <thead className="table-bordered">
                            <th>ID</th>
                            <th>ItemName</th>
                            <th>DetailsPerUnit</th>
                            <th>UnitPrice(Rs)</th>
                            <th>CategoryID</th>
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
                                <input type="text" className="form-control" placeholder="Item name" value={name}
                                    onChange={(event)=>
                                    {
                                      setName(event.target.value);  
                                    }}
                                />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Details per unit"
                                    value={details}
                                    onChange={handleDetails}
                                />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Price per unit"
                                    value={price}
                                    onChange={handlePrice}
                                />
                            </td>
                            <td>
                                <select required onChange={handleCategory} value={categoryId}>
                                    <option>Select category</option>
                                    {categories&& categories.map((category)=>(
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}

                                </select>
                                 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container-fluid" style={{display:"flex",marginLeft:"500px"}}>
                 
                 <button className="btn btn-light" style={{marginLeft:"25px"}} onClick={handleFormClearButton}>Clear Form</button>
             
                 <button className="btn btn-success" type="submit" onClick={handleAdd} style={{marginLeft:"200px"}}>Add Item</button>
              
                 <button className="btn btn-primary" style={{marginLeft:"25px"}} onClick={handleUpdate}>Update Item</button>
              
                <button className="btn btn-danger" style={{marginLeft:"25px"}} onClick={handleDelete}>Delete Item</button>
              
             </div>

            <div className="container" style={{marginLeft:"100px",marginTop:"50px"}}> 
                <table className="table table-primary table-hover table-bordered">
                    <thead>
                            <tr>
                                 <th>ID</th>
                                 <th>ItemName</th>
                                 <th>DetailsPerUnit</th>
                                 <th>UnitPrice(Rs)</th>
                                 <th>CategoryID</th>
                            </tr>
                    </thead>
                     <tbody>
                        {
                            items.map((item,index)=>{
                                return <tr key={index} onDoubleClick={()=>handleClick(item)}>
                                    <td>{item.itemId}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.itemCategory.id}</td>
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
export default Items;
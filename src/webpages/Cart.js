
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart=()=>{
    const[items,setItems]=useState([]);
    const[categories,setCategories]=useState([]);

    const[selectedCategory,setSelectedCategory]=useState(null);
    const[itemsByCategory,setItemsByCategory]=useState([]);

    const[total,setTotal]=useState(0);
    const[tax,setTax]=useState(0);
    const[orderItems,setOrderItems]=useState([]);


    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    const getItems=async()=>{
        const response=await axios.get('http://localhost:5054/items');
        setItems(response.data);
    }
    const getCategories=async()=>{
        const response=await axios.get('http://localhost:5054/categories');
        setCategories(response.data);
    }
    
    useState(()=>{
        getItems();
        getCategories();
    },[])

    const handleLoadCategoryItems=async(category)=>{
        setSelectedCategory(category);
        const response=await axios.get(`http://localhost:5054/categories/${category.id}/items`);
        setItemsByCategory(response.data);
    }

    const handleOrder=()=>{

    }
    

    return(
        <>
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
                            <Link to={'/items'}>Manage-Item</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            <Link to={'/categories'}>Manage-Category</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            <Link to={'/stock'}>Manage-stock</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"300px"}}>
                            Add To Cart
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
            <div className="container-fluid" style={{marginTop:"20px"}}>
                    <h1>Add To Cart</h1>
                <div className="row" style={{border:"5px"}}>

                        <div className="col-md-6">

                            <div style={{marginTop:"20px",marginBottom:"10px"}}>  
                                <h2>Select items by category</h2>
                            </div>

                            <div >
                                {
                                    categories&&categories.map((category)=>(
                                        <button className={`btn ${selectedCategory === category ? 'btn-danger' : 'btn-primary'}`} onClick={()=>handleLoadCategoryItems(category)} style={{marginRight:"10px"}}>{category.name}</button>
                                    ))
                                }
                            </div>
                             
                            <div style={{marginTop:"20px",marginBottom:"10px"}}>  
                                <h2>Items</h2>
                            </div>
                            <div>
                                <ol>
                                        {itemsByCategory&& itemsByCategory.map((item)=>(
                                            <div className="item-box px-2 py-2"> 
                                                    {item.itemName}-   {item.unitPrice}
                                                    <button className="btn btn-sm btn-primary" style={{marginLeft:"20px"}} onClick={()=>{
                                                        setOrderItems([...orderItems,item]);
                    
                                                    }}> Add to cart</button>
                                            </div>
                                        ))}
                                </ol>
                            </div>
                            
   

                        </div>

                        <div className="col-md-6">
                            <div> 
                                <h2>Order</h2>
                            </div>

                            <div>
                                 <table className="table table-stripped">
                                    <thead>
                                        <th>Item ID</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                    </thead>
                                    <tbody>
                                        {
                                            orderItems&&orderItems.map((item)=>(
                                                <tr>
                                                    <td>{item.itemId}</td>
                                                    <td>{item.itemName}</td>
                                                    <td>{item.unitPrice}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <thead>
                                            <tr>
                                                <th colSpan={2}>
                                                    Total
                                                </th>
                                                <th>
                                                    {total}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>
                                                    Tax
                                                </th>
                                                <th>
                                                    {tax}
                                                </th>
                                            </tr>
                                    </thead>
                                </table>
                                <button className= "btn btn-primary" onClick={handleOrder}>Complete Order</button>
                            </div>
                        </div>

                </div>
            </div>
        </>
    )

}
export default Cart;
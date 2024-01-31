import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Stock=()=>{
    const[stock,setStock]=useState([]);

    const[stockId,setStockId]=useState(0);
    const[itemId,setItemId]=useState(0);
    const[quantityOnHand,setQuantityOnHand]=useState(0);

    const[selectedRow,setSelectedRow]=useState(null);

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    useEffect (()=>{
        getStock();
        clearForm();
    },[])

    const getStock=async()=>{
        const response=await axios.get("http://localhost:5054/stock");
        setStock(response.data);
    }

    const handleStockId=(event)=>{
        setStockId(event.target.value);
    }
    const handleItemId=(event)=>{
        setItemId(event.target.value);
    }
    const handleQuantityOnHand=(event)=>{
        setQuantityOnHand(event.target.value);
    }

    const handleClick=(stockItem)=>{
        setSelectedRow(stockItem);
        setStockId(stockItem.stockId);
        setItemId(stockItem.item.itemId);
        setQuantityOnHand(stockItem.quantityOnHand);
    }

    const handleFormClearButton=()=>{
        clearForm();
    }
    const clearForm=()=>{
        setStockId("stock id");
        setItemId("item id");
        setQuantityOnHand("enter quantity on hand");
    }


    const handleUpdate=async(event)=>{
        event.preventDefault();
        const data={
            "quantityOnHand":quantityOnHand
        }
        const response=await axios.put(`http://localhost:5054/stock/${stockId}`,data);
        getStock(response.data);
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
                            <Link to={'/users'}>Manage-User</Link>
                        </li>
                        <li className="nav-item"style={{marginLeft:"50px"}}>
                            <Link to={'/items'}>Manage-Item</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            <Link to={'/categories'}>Manage-Category</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft:"50px"}}>
                            Manage-stock
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
                <h1>Manage-Stock</h1>
            </div>

            <div className="col-md-10" style={{marginLeft:"100px"}}> 
                <table className="table table-stripped table-bordered">
                    <thead className="table-bordered">
                            <th>Stock_Id</th>
                            <th>Item_Id</th>
                            <th>Quantity_On_Hand</th>
                             
                    </thead>
                     <tbody className="table-success">
                        <tr>
                            <td>
                                 <input type="text" className="form-control" placeholder="Stock_Id" value={stockId}
                                    onChange={handleStockId}
                                    readOnly
                                 />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Item_Id" value={itemId}
                                    onChange={handleItemId}
                                    readOnly
                                />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Quantity on hand"
                                    value={quantityOnHand}
                                    onChange={handleQuantityOnHand}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container-fluid" style={{display:"flex",marginLeft:"500px"}}>
                <button className="btn btn-light" style={{marginLeft:"70px"}} onClick={handleFormClearButton}>Clear Form</button>
                <button className="btn btn-primary" style={{marginLeft:"400px"}} onClick={handleUpdate}>Update Stock</button>
            </div>

            <div className="container" style={{marginLeft:"100px",marginTop:"50px"}}> 
                <table className="table table-primary table-hover table-bordered">
                    <thead>
                            <tr>
                                 <th>Stock_Id</th>
                                 <th>Item_Id</th>
                                 <th>Quantity_On_Hand</th>
                            </tr>
                    </thead>
                     <tbody>
                        {
                            stock.map((stockItem,index)=>{
                                return <tr key={index} onDoubleClick={()=>handleClick(stockItem)}>
                                    <td>{stockItem.stockId}</td>
                                    <td>{stockItem.item.itemId}</td>
                                    <td>{stockItem.quantityOnHand}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>   
        </>
    )
}
export default Stock;
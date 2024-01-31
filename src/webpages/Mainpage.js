import { Link, useNavigate } from "react-router-dom";

const Mainpage=()=>{

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }
    
    return(
        <>
            <div style={{ backgroundColor: "#808088"}}> 

        <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                <img src="https://thumb.ac-illust.com/b7/b76f2410f23065a6095caf9ee0498936_t.jpeg" alt="Bootstrap" width="30" height="30"/>
                    <a className="navbar-brand">Home</a>
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

            <div className="row row-cols-2 row-cols-md-2 g-2" style={{marginTop:"100px",marginLeft:"250px"}}>

             <div className="col">
                <div className="card mb-3" style={{maxWidth: "300px"}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/219/219969.png" 
                                    className="img-fluid rounded-start" 
                                    alt="card"
                                    />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Manage User</h5>
                                    <button className="btn btn-primary"><Link to={"/users"}>Go</Link></button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

                <div className="col">
                <div className="card mb-3" style={{maxWidth: "300px"}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/6725/6725427.png" 
                                    className="img-fluid rounded-start" 
                                    alt="card"/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Manage Item</h5>
                                    <button className="btn btn-primary" type="submit"><Link to={"/items"}>Go</Link></button>
                                </div>
                            </div>
                        </div>
                </div>
             </div>

            <div className="col">
                <div className="card mb-3" style={{maxWidth: "300px"}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src="https://icon-library.com/images/category-icon-png/category-icon-png-4.jpg" 
                                    className="img-fluid rounded-start" 
                                    alt="card"/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Manage Category</h5>
                                    <button className="btn btn-primary"><Link to={"/categories"}>Go</Link></button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <div className="col">
                <div className="card mb-3" style={{maxWidth: "300px"}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src="https://cdn2.iconfinder.com/data/icons/ecommerce-back-office-system-filled-outline/64/ready-to-ship-stock-check-inventory-goods-qc-512.png" 
                                    className="img-fluid rounded-start" 
                                    alt="card"/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Manage Stock</h5>
                                    <button className="btn btn-primary" ><Link to={"/stock"}>Go</Link></button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>  
            
            <div className="col" style={{marginLeft:"275px"}}>
                <div className="card mb-3" style={{maxWidth: "300px"}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/5450/5450893.png" 
                                    className="img-fluid rounded-start" 
                                    alt="card"/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Add To Cart</h5>
                                    <button className="btn btn-primary" ><Link to={"/cart"}>Go</Link></button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>  


                <div>
                </div>

                </div>   
        </div>  
        </>
    )
}
export default Mainpage;
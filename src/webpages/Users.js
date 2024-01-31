import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users=()=>{
    const[users,setAllUsers]=useState([]);

    const[userId,setUserId]=useState(null);
    const[username,setUsername]=useState(null);
    const[email,setEmail]=useState(null);
    const[password,setPassword]=useState(null);

    const[selectedRow,setSelectedRow]=useState(null);

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    const getAllUsers=async()=>{
        const response=await axios.get("http://localhost:5054/users");
        setAllUsers(response.data);
    }
    useEffect(()=>{
        getAllUsers();
    },[])

    const handleClick=(user)=>{
        setSelectedRow(user);
        setUserId(user.id);
        setUsername(user.name);
        setEmail(user.email);
        setPassword(user.password);
    }

    const handleUserId=(event)=>{
        setUserId(event.target.value);
    }
    const handleUsername=(event)=>{
        setUsername(event.target.value);
    }
    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }

    const clearForm=()=>{
        setUserId("user_id");
        setUsername("username");
        setEmail("email");
        setPassword("password");
    }
    const handleFormClearButton=()=>{
        clearForm();
    }
    const handleChangePassword=async()=>{
        const response=await axios.put(`http://localhost:5054/users/${userId}/change-password`);
        setAllUsers(response.data);
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
                            Manage-User
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

            <div style={{marginTop:"15px",marginLeft:"50px",marginBottom:"50px"}}>
                <h1>Manage-User</h1>
                <button className="btn btn-primary" type="submit" style={{marginLeft:"1025px"}}><Link to={'/register'}>New Register here</Link></button>
                 
            </div>

            <div className="col-md-10" style={{marginLeft:"100px"}}> 
                <table className="table table-stripped table-bordered">
                    <thead className="table-bordered">
                        <th>User_Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                             
                    </thead>
                     <tbody className="table-success">
                        <tr>
                            <td>
                                 <input type="text" className="form-control" placeholder="User_Id" 
                                    value={userId}
                                    onChange={handleUserId}
                                    readOnly
                                 />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Username" 
                                    value={username}
                                    onChange={handleUsername}
                                    readOnly
                                />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Email"
                                    value={email}
                                    onChange={handleEmail}
                                    readOnly
                                />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container-fluid" style={{display:"flex",marginLeft:"500px"}}>
                <button className="btn btn-light" style={{marginLeft:"70px"}} onClick={handleFormClearButton}>Clear Form</button>
                <button className="btn btn-primary" style={{marginLeft:"400px"}} onClick={handleChangePassword}>Change Password</button>
            </div>

            <div className="container" style={{marginLeft:"100px",marginTop:"50px"}}> 
                <table className="table table-primary table-hover table-bordered">
                    <thead>
                            <tr>
                                 <th>User_Id</th>
                                 <th>Username</th>
                                 <th>Email</th>
                                 <th>Password</th>
                            </tr>
                    </thead>
                     <tbody>
                        {
                            users.map((user,index)=>{
                                return <tr key={index} onDoubleClick={()=>handleClick(user)}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
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
export default Users;
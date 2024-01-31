import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const handleUserName=(event)=>{
        setUsername(event.target.value);
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }

    const handleLogin=async(event)=>{
        event.preventDefault();
        const data={
            "username":username,
            "password":password
        }
        const response=await axios.post("http://localhost:5054/auth/login");
        if(response.data===200){
            localStorage.setItem("token",data);
            axios.defaults.headers.common['Authorization']=`Bearer ${response.data}`;
        }else{
            console.log("logging error");
        }
    }
    
    return(
        <>
            <div className="login-box mb-10">

                <form onSubmit={handleLogin} style={{marginTop:"100px"}}> 
                    <div className="text-center mb-3">
                        <h1>User Login</h1>
                    </div>

                    <div className="form-group mb-3">
                        <input className="form-control" type="text"  placeholder="Username" onChange={handleUserName} 
                        value={username}
                        required/>
                    </div>

                    <div className="form-group mb-3">
                        <input className="form-control" type="password"  placeholder="Password" onChange={handlePassword} 
                        value={password}
                        required/>
                    </div>

                    <button className="btn btn-primary" type="submit" style={{marginLeft:"275px"}}>Login</button>
                    
                    
                </form>
                 
                <div style={{marginTop:"175px", marginLeft:"195px"}}>
                    <h6>If not registered register here</h6>
                    <button className="btn btn-primary" style={{marginLeft:"70px"}}><Link to={'/register'}>Register</Link></button>
                </div>
            </div>
        </>
    )
}
export default Login;
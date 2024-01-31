import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register=()=>{
    const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");

    const handleUserName=(event)=>{
        setUserName(event.target.value);
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }
    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }

    const clearForm=()=>{
        setUserName("username");
        setPassword("password")
        setEmail("email");
    }

    const handleRegister=async(event)=>{
        event.preventDefault();
        const data={
            "username":username,
            "email":email,
            "password":password
        }
        const response=await axios.post("http://localhost:5054/auth/register",data);
        if(response.status===200){
            console.log("user registered");
            clearForm();
        }else{
            console.log("error");
        }
    }

    return(
        <>
        <div className="login-box mb-10">

            <form onSubmit={handleRegister} style={{marginTop:"100px"}}> 
                <div className="text-center mb-3">
                    <h1>User Register</h1>
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

                <div className="form-group mb-3">
                    <input className="form-control" type="email"  placeholder="Email" onChange={handleEmail}
                    value={email}
                    required/>
                </div>

                <button className="btn btn-primary" type="submit" style={{marginLeft:"270px"}}>Register</button>
            </form>

            <div style={{marginTop:"175px", marginLeft:"195px"}}>
                    <h6 style={{marginLeft:"70px"}}>Goto Login</h6>
                    <button className="btn btn-primary" style={{marginLeft:"80px"}}><Link to={'/login'}>Login</Link></button>
            </div>
        </div>
        </>
    )
}

export default Register;
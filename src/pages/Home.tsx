import React, { useEffect, useState } from "react";
import {Container,Row} from "react-bootstrap";
import Cart from "./Cart";
import "./Home.css";

interface ApiProps{
    albumId:number
    id:number
    title:string
    url:string
    thumbnailUrl:string
}

const Home = () =>{

    const [users,setUsers] = useState<ApiProps[]>([]);
    const APIDATA:string ="https://jsonplaceholder.typicode.com/photos";
    
    const fetchingApiData =async (url:string) =>{
      try {
        const dataapi =await fetch(url);
        const data = await dataapi.json();
        setUsers(data)

      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        fetchingApiData(APIDATA)
    },[])

    //delete functionality
    const handleDelete =(id:number) =>{
        const userupdate = users.filter((user)=>user.id !==id)
        setUsers(userupdate)
    }
 
    //edit and update functionality
    const handleUpdate = (id:number, newTitle:string) =>{
     const updatedUsers = users.map((value)=>
     value.id === id ? {...value, title:newTitle}: value)
     setUsers(updatedUsers)
    }

    return(
        <>
        <Container fluid className="homeclass">
        <Container>
            <Row>
            <Cart users={users} onDelete={handleDelete} onUpdate={handleUpdate}/>
            </Row>
        </Container>
        </Container>
        </>
    )
}

export default Home;
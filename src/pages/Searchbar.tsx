import React from "react";
import { Container } from "react-bootstrap";
import "./Home.css";

interface Searchprops{
    value:string
    onChange:(value:string)=>void
}

const Searchbar:React.FC<Searchprops> =({value,onChange}) =>{
    const handleSearch =(event:React.ChangeEvent<HTMLInputElement>) =>{
        onChange(event.target.value)
    }
    
    return(
        <>
        <Container id="searchbar"> 
            <input className="w-75" type="text" name="search by title" value={value} id="search" 
            onChange={handleSearch} placeholder="SEARCH TEXT" />
        </Container>
        </>
    )
}

export default Searchbar;
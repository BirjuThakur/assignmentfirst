import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PaginationOne from "./Pagination";
import "./Home.css";
import Searchbar from "./Searchbar";

interface user {
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

interface cardprops {
    users: user[]
    onDelete: (id: number) => void
    onUpdate: (id: number, newTitle: string) => void
}

const Cart = ({ users, onDelete, onUpdate }: cardprops) => {
    //for search functiona;ity
    const [search, setSearch] = useState<string>("");

    //for edit and update
    const [editedTitle,setEditedTitle]= useState<string>("");
    const [editedUserId,setEditedUserId] =useState<number>(0);

    //for input search bar 
    const handleSearchChange =(value:string) =>{
    setSearch(value);
    setCurrentPage(1)
    }

    //this is search function
    const filterUsers = users.filter((user)=>{
       return user.title.toLowerCase().includes(search.toLowerCase())
    })

    const handleEdit =(id:number,title:string)=>{
        setEditedUserId(id)
        setEditedTitle(title)
    }

    const handleUpdate =()=>{
        onUpdate(editedUserId,editedTitle);
        setEditedUserId(0)
        setEditedTitle("")
    }

    const handleTitleChange =(event:React.ChangeEvent<HTMLInputElement>) =>{
      setEditedTitle(event.target.value)
    }

    //for pagination 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    //pagination 
    const handlePaginationClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    //calculation for pagination 
    // const totalItems = users.length;
    const totalItems = filterUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = filterUsers.slice(indexOfFirstItem, indexOfLastItem);
     
    return (
        <>
        <Container >
            <Searchbar value={search} onChange={handleSearchChange}/>
        </Container>
            {currentItems.map((value: any) => {
                const isEditing = value.id === editedUserId;

                return (
                    <Col sm={12} md={6} lg={4} key={value.id} className="mb-4 d-flex justify-content-center align-items-center">
                        <Card style={{ width: '18rem' }} id="maincard">
                            <Card.Title id="title"> {value.id} { " " }
                                {isEditing ? 
                                (<input type="text" value={editedTitle} onChange={handleTitleChange} />)
                                :(value.title)}
                                <Button variant="primary" id="buttonedit" onClick={()=>isEditing ? handleUpdate() 
                                    : handleEdit(value.id, value.title)}> {isEditing ? "update" : "edit"  }
                                </Button>
                            </Card.Title>
                            <Card.Body>
                                <Container className="CardbodyUpper">
                                    <Row>
                                        <Col><Card.Img variant="top" src={value.url} className="img-fluid" /> </Col>
                                        <Col><Card.Img variant="top" src={value.thumbnailUrl} className="img-fluid" /> </Col>
                                    </Row>
                                </Container><br />
                                <Button variant="primary" onClick={() => onDelete(value.id)}>delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
            <Container className="d-flex justify-content-center">
                <PaginationOne
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePaginationClick} />
            </Container>

        </>
    )
}

export default Cart;
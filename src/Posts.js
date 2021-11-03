import { Card, Row, Col, Button, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Header from "./components/Header"
import { API_URL } from "./config"


const PostCard = ({post}) => {
    let history = useHistory()
    const handleClick = (event) => {
        history.push(`/posts/${post.id}`)
    }

    return (
        <Card>
            {post.hasOwnProperty('image') ? <Card.Img variant="top" src={post.image} /> : ""}
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <Button variant="primary" onClick={handleClick}>Read Comments</Button>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Posted at {post.createdAt}</small>
            </Card.Footer>
        </Card>

    )
}

const PostList = () => {
    let [postsResults, setPostResults] = useState([])
    const getAllPost = async () => {
        const result = await axios.get(`${API_URL}/posts`)
        setPostResults([...result.data])
    }
    useEffect(() => {
        getAllPost()
    }, [])
    return (
        <Container style={{ height: "100vh", margin: "20px" }}>
            <Header></Header>
            <Row xs={1} md={4} className="g-4">
                {postsResults.map((post, idx) => (
                    <Col>
                    <PostCard post={post}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default PostList
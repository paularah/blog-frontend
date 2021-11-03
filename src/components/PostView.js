import { Container,Row, Form, Button, Col, Card } from "react-bootstrap"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { API_URL } from "../config"

// const comments = [
//     {
//         comment: " With supporting text below as a natural lead-in to additional content",
//         createAt: new Date().toUTCString()
//     },
//     {
//         comment: " With supporting text below as a natural lead-in to additional content",
//         createAt: new Date().toUTCString()
//     },
//     {
//         comment: " With supporting text below as a natural lead-in to additional content",
//         createAt: new Date().toUTCString()
//     },
//     {
//         comment: " With supporting text below as a natural lead-in to additional content",
//         createAt: new Date().toUTCString()
//     },
//     {
//         comment: " With supporting text below as a natural lead-in to additional content",
//         createAt: new Date().toUTCString()
//     },
//     {
//         comment: " With supporting text below as a natural lead-in to additional content",
//         createAt: new Date().toUTCString()
//     },
// ]



const PostView = () => {
    // let post = {
    //     title:"arah posts",
    //     content: "hdfjfhfjfjf",
    //     createdAt: new Date().toUTCString()
    // }
    let [comments, setComments] = useState([])
    let [post, setPost] = useState({})
    let [newComment, setNewComment] = useState()

    const {id} = useParams()

    const getPostandComments = async () => {
        const postresponse  =  await axios.get(`${API_URL}/posts/${id}`)
        setPost(postresponse.data)
        const commentResponse = await axios.get(`${API_URL}/posts/${id}/comments`)
        setComments(commentResponse.data)
    }



    let handleClick = () => {
        axios.post(`${API_URL}/posts/${id}/comments`, {
            comment:newComment
        })
    }

    useEffect(() => {
        getPostandComments()
    }, [])
    return (
        <Container>
            <Row className="align-items-center">
                <Card style={{ width: '', margin:"8px"}}>
                {post.hasOwnProperty('image') ? <Card.Img variant="top" src={post.image} style={{maxHeight:"180px"}} /> : ""}
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                {post.content}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Posted at {post.createdAt}</small>
                        </Card.Footer>
                </Card>
            </Row>
            <Row className="align-items-center">
                <Col>
                    <Form.Label className="mt-2 mb-2"><b>Create a new comment</b></Form.Label>
                    <Form.Control placeholder="your comment" value={newComment} onChange={(e) => (setNewComment(e.target.value))}>
                    </Form.Control>
                </Col>
                <Col>
                    <Button type="submit" className="mt-5" onClick={handleClick}>
                        Post Comment
                    </Button>
                </Col>
            </Row>

            <Row>
                {comments.map((comment, idx) => (
                    <Card style={{ width: '50rem', margin: "6px" }}>
                        <Card.Body>
                            <Card.Text>
                                {comment.comment}
                            </Card.Text>
                            <Card.Footer>
                                posted on  {comment.createAt}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                )

                )}

            </Row>
        </Container>
    )
}

export default PostView
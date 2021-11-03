import { Navbar, Container, Button, Modal, Form} from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import { API_URL } from '../config'




const Header = () => {
    const [show, setShow] = useState(false);
    let [imageFile, setImageFile] = useState()
    let [imageLink, setImageLink] = useState()
    let [title, setTitle] = useState()
    let [content, setContent] = useState()
    let [username, setUsername] = useState()
    let [submitting, setSubmitting] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleSubmit = (e) => {
        if (imageFile) {
            const fd = new FormData()
            fd.append('file', imageFile)
            fd.append('upload_preset', 'ml_default')
            axios.post('https://api.cloudinary.com/v1_1/arah/image/upload', fd).then(res => {
                console.log(res.data)
                setImageLink(res.data.secure_url)
            })
        }
        setSubmitting(true)
        let createpostData = {
            title,
            username,
            content,
        }
        if (imageLink) {
            createpostData.image = imageLink
        }
        console.log(createpostData)
        axios.post(`${API_URL}/posts`, createpostData).then(res => {
            setSubmitting(false)
            handleClose()
        }).catch(e => {
            setSubmitting(false)
            console.log(e)
        })
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Collapse id="navbarScroll" style={{ alignContent: "flex-end" }}>
                    <Button className="d-flex" variant="success" onClick={handleShow}>Create</Button>
                </Navbar.Collapse>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3 mt-3" >
                        <Form.Label>Title: </Form.Label>
                        <Form.Control type="text" value={title} placeholder="" onChange={(e) => setTitle(e.target.value)} />
                        <Form.Label>Content: </Form.Label>
                        <Form.Control type="text" as="textarea" value={content} placeholder="" onChange={(e) => setContent(e.target.value)} />
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder="" />
                        <Form.Label>Upload a Picture</Form.Label>
                        <Form.Control type="file" onChange={(e) => { setImageFile(e.target.files[0]) }} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleSubmit} disabled={submitting}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

export default Header
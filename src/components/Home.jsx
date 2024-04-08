import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllblog, uploadBLog } from '../services/AllApi';
import Blogcards from './Blogcards';

function Home() {
  const [blog, setBlog] = useState({
    title: "",
    blogs: ""
  });
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    console.log(blog);
    const { title, blogs } = blog;
    if (!title || !blogs) {
      alert("Please fill the form");
    } else {
      const response = await uploadBLog(blog);
      console.log(response);
      // Refresh the blogs after adding a new one
      getBlogs();
    }
    handleClose();
  };

  const getBlogs = async () => {
    const result = await getAllblog();
    console.log("get ===", result);
    setData(result.data || []);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Blog App</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      /><br /><br />
      <Button variant="primary" onClick={handleShow}>
        Add Blog
      </Button>
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <Blogcards title={item} blogs={item.blogs} />
            </div>
          ))
        ) : (
          <h1>No data to show</h1>
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="title">Enter Title</label>
          <input
            type="text"
            className='form-control'
            name="title"
            value={blog.title}
            onChange={handleChange}
          />
          <label htmlFor="blogs">Enter Blog</label>
          <input
            type="text"
            className='form-control'
            name="blogs"
            value={blog.blogs}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;

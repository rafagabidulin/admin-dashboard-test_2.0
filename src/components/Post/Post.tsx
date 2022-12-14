import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectPostById } from '../../store/post/selectors';
import Comments from '../Comments/Comment';
import { deletePost } from '../../store/post';

function Post({ postId }: { postId: string }) {
  const [show, setShow] = useState(false);
  const post = useAppSelector((state) => selectPostById(state, { postId }));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditPost = () => {
    navigate(`/edit/${String(postId)}`);
  };
  const handleDeletePost = () => dispatch(deletePost({ postId }));

  return (
    <Card className='mb-2 mt-3 py-2'>
      <Card.Header as='h5'>{post?.title}</Card.Header>
      <Card.Body>
        <Card.Text>{post?.body}</Card.Text>
        <div className='d-flex justify-content-between'>
          <Button variant='primary' onClick={handleShow}>
            Comments
          </Button>
          <Button variant='outline-primary' onClick={handleEditPost}>
            Edit post
          </Button>
          <Button onClick={handleDeletePost}>Delete</Button>
        </div>
        <Modal size='lg' show={show} onHide={handleClose} animation>
          <Modal.Header closeButton>
            <Modal.Title>{post?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='blockquote mb-3'>{post?.body}</p>
            <h4>Comments</h4>
            <Comments postId={post?.id} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default Post;

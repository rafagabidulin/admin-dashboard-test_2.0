import React, { useState, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { createPost, updatePost } from '../../store/post';
import { selectPostById } from '../../store/post/selectors';

function EditCreatePostForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();
  const post = useAppSelector((state: RootState) =>
    selectPostById(state, { postId: Number(postId) })
  );

  const [form, setForm] = useState({
    title: post?.title,
    body: post?.body,
  });

  const onChangePost = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const onSubmitPost = () => {
    if (postId) {
      dispatch(
        updatePost(
          Object.assign(form, {
            id: Number(postId),
            userId: post?.userId,
          })
        )
      );
    } else {
      dispatch(createPost(form));
    }
    navigate('/posts');
  };

  return (
    <Form className='mt-3 px-5'>
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          name='title'
          placeholder='Enter title'
          onChange={(event) => onChangePost(event)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type='text'
          name='text'
          placeholder='Enter content'
          onChange={(event) => onChangePost(event)}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={onSubmitPost}>
        {postId ? <span>Update post</span> : <span>Create new post</span>}
      </Button>
    </Form>
  );
}

export default EditCreatePostForm;

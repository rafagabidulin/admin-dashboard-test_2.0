import React, { useState } from 'react';
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
  const post = useAppSelector((state: RootState) => selectPostById(state, { postId }));

  const [form, setForm] = useState({
    title: post?.title || '',
    body: post?.body || '',
  });

  const onChangeTitlePost = ({ target }) => {
    setForm({
      ...form,
      title: target.value,
    });
  };

  const onChangeTextPost = ({ target }) => {
    setForm({
      ...form,
      body: target.value,
    });
  };

  const onSubmitPost = () => {
    if (postId) {
      dispatch(updatePost({ ...form, id: Number(postId) }));
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
          onChange={(event) => onChangeTitlePost(event)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type='text'
          name='text'
          placeholder='Enter content'
          onChange={(event) => onChangeTextPost(event)}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={onSubmitPost}>
        {postId ? <span>Update post</span> : <span>Create new post</span>}
      </Button>
    </Form>
  );
}

export default EditCreatePostForm;

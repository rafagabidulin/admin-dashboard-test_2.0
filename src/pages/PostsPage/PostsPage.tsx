import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchPosts } from '../../store/post';
import { selectPostIds } from '../../store/post/selectors';
import Post from '../../components/Post/Post';
import { fetchComments } from '../../store/comment';

function Posts() {
  const posts = useAppSelector((state) => selectPostIds(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className='px-5 py-2'>
      <h1 style={{ textAlign: 'center' }}>Posts</h1>
      <Link to='create'>
        <Button className='mt-2' variant='outline-primary' href='create'>
          Create new post
        </Button>
      </Link>
      {posts.map((id) => (
        <Post postId={id} key={id} />
      ))}
    </div>
  );
}

export default Posts;

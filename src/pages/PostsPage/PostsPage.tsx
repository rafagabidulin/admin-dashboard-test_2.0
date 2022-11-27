import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchPosts } from '../../store/post';
import { selectPostIds, selectIsPostLoading } from '../../store/post/selectors';
import Post from '../../components/Post/Post';

function Posts() {
  const posts = useAppSelector((state) => selectPostIds(state));
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => selectIsPostLoading(state));

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner animation='border' />;
  }

  return (
    <div className='px-5 py-2'>
      <h1 style={{ textAlign: 'center', borderBottom: 'solid 2px #4682B4' }}>Posts</h1>
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

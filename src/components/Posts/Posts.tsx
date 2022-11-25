import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchPosts } from '../../store/post';
import { selectPostIds } from '../../store/post/selectors';
import Post from '../Post/Post';

function Posts() {
  const posts = useAppSelector((state) => selectPostIds(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((id) => (
        <Post id={id} key={id} />
      ))}
    </div>
  );
}

export default Posts;

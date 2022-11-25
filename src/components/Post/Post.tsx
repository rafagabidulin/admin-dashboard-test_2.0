import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectPostById } from '../../store/post/selectors';

function Post({ id }: { id: string }) {
  const post = useAppSelector((state) => selectPostById(state, { postId: id }));
  return (
    <li>
      <span>{post.title}</span>
      <div>{post.body}</div>
    </li>
  );
}

export default Post;

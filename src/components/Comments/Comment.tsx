import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchComments } from '../../store/comment';
import { selectCommentByPostId } from '../../store/comment/selectors';
// import Comment from '../Comment/Comment';

function Comments({ postId }) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => selectCommentByPostId(state, { postId }));

  console.log('comments =', comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId]);

  return (
    <div>
      {Object.values(comments)?.map(({ name, email, body }) => (
        <div>
          <h5>{name}</h5>
          <h6>{email}</h6>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;

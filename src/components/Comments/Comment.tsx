import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
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
      {Object.values(comments)?.map(({ id, name, email, body }) => (
        <Card className='mb-2'>
          <Card.Header>{name}</Card.Header>
          <Card.Body>
            <blockquote className='blockquote mb-0'>
              <p>{body}</p>
              <footer className='blockquote-footer'>
                <cite title='Source Title'>{email}</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Comments;

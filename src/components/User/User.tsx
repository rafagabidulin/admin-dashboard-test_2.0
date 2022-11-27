import React from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUserById } from '../../store/user/selectors';
import { useAppSelector } from '../../hooks/hooks';

function User({ userId }) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => selectUserById(state, { userId }));

  return (
    <tr onClick={() => navigate(`${user?.id}`)}>
      <td>{user?.id}</td>
      <td>{user?.name}</td>
      <td>@{user?.username}</td>
      <td>{user?.email}</td>
    </tr>
  );
}

export default User;

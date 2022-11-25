import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectAlbumById } from '../../store/album/selectors';
import Photos from '../Photos/Photos';

function Album({ id }: { id: string }) {
  const album = useAppSelector((state) => selectAlbumById(state, { albumId: id }));

  return (
    <Link to={id}>
      <span>{album?.title}</span>
      <Photos id={id} />
    </Link>
  );
}

export default Album;

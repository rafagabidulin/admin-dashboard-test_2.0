import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Card className='text-center'>
      <Card.Header />
      <Card.Body>
        <Card.Title>Posts Page</Card.Title>
        <Card.Text>Click on the button to see posts or create a new one</Card.Text>
        <Link to='posts'>
          <Button variant='primary'>Go to Posts Page</Button>
        </Link>
      </Card.Body>
      <Card.Footer className='text-muted' />
      <Card.Body>
        <Card.Title>Albums Page</Card.Title>
        <Card.Text>Click on the button to see pictures</Card.Text>
        <Link to='albums'>
          <Button variant='primary'>Go to Albums Page</Button>
        </Link>
      </Card.Body>
      <Card.Footer className='text-muted' />
      <Card.Body>
        <Card.Title>Todos</Card.Title>
        <Card.Text>Click on the button to go on the Todos Page</Card.Text>
        <Link to='todos'>
          <Button variant='primary'>Go to Todos Page</Button>
        </Link>
      </Card.Body>
      <Card.Footer className='text-muted' />
    </Card>
  );
}

export default HomePage;

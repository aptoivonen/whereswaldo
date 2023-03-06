import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Not Found</h1>
      <p>Sorry!</p>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFound;

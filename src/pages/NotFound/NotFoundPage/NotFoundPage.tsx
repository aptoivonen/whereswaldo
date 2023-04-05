import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFoundPage;

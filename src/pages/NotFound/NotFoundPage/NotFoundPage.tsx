import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Not Found</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFoundPage;

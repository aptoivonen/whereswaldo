import { Link } from 'react-router-dom';

type HeaderQuitProps = {
  children: React.ReactNode;
};

function HeaderQuit({ children }: HeaderQuitProps) {
  return (
    <Link className="text-xl text-red" to="/" data-cy="level-quit-link">
      {children}
    </Link>
  );
}

export default HeaderQuit;

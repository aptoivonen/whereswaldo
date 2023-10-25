import { twMerge } from 'tailwind-merge';
import NavLink from './NavLink';

export type NavProps = {
  children: React.ReactNode;
  className?: string;
};

function Nav({ children, className }: NavProps) {
  return (
    <ul className={twMerge('ml-20 flex space-x-8', className)}>{children}</ul>
  );
}

Nav.Link = NavLink;

export default Nav;

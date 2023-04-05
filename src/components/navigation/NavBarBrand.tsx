import { Link } from 'react-router-dom';

type BrandProps = {
  to: string;
  children: React.ReactNode;
};

function NavBarBrand({ children, to }: BrandProps) {
  return (
    <div className="justify-self-start">
      <Link to={to}>{children}</Link>
    </div>
  );
}

export default NavBarBrand;

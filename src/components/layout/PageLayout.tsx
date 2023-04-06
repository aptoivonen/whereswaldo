import { Outlet } from 'react-router-dom';
import Container from '@/components/layout/Container';
import NavBar from '@/components/navigation/NavBar';
import Nav from '@/components/navigation/Nav';
import brandImage from '@/assets/images/waldohead.png';

const brand = {
  route: '/',
};

const navLinks = [
  { id: 'home', route: '/', content: 'Home' },
  { id: 'scoreboard', route: '/scoreboard', content: 'Scoreboard' },
];

function PageLayout() {
  return (
    <>
      <NavBar>
        <Container>
          <div className="flex items-center">
            <NavBar.Brand to={brand.route}>
              <span className="flex items-center">
                <img
                  className="h-24"
                  src={brandImage}
                  alt="Where's Waldo logo"
                />
                <span className="text-5xl font-bold">
                  <p className="text-blue">Where&apos;s</p>
                  <p className="text-red">Waldo?</p>
                </span>
              </span>
            </NavBar.Brand>
            <Nav>
              {navLinks.map((navLink) => (
                <Nav.Link key={navLink.id} to={navLink.route}>
                  {navLink.content}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        </Container>
      </NavBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default PageLayout;

import { Outlet } from 'react-router-dom';
import Container from '@/components/common/Container';
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
      <header className="fixed inset-x-0 top-0 z-10 bg-light">
        <NavBar>
          <Container>
            <div className="flex h-20 items-center sm:h-28">
              <NavBar.Brand to={brand.route}>
                <span className="flex items-center">
                  <img
                    className="h-12 sm:h-20"
                    src={brandImage}
                    alt="Where's Waldo logo"
                  />
                  <span className="text-xl font-bold sm:text-4xl">
                    <p className="text-blue">Where&apos;s</p>
                    <p className="text-red">Waldo?</p>
                  </span>
                </span>
              </NavBar.Brand>
              <Nav className="ml-10 sm:ml-20">
                {navLinks.map((navLink) => (
                  <Nav.Link key={navLink.id} to={navLink.route}>
                    <span className="text-lg sm:text-2xl">
                      {navLink.content}
                    </span>
                  </Nav.Link>
                ))}
              </Nav>
            </div>
          </Container>
        </NavBar>
      </header>
      <main className="flex-1 bg-gradient-to-br from-light to-blue pt-24 sm:pt-32">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default PageLayout;

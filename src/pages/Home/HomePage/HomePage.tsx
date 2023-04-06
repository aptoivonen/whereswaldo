import Levels from '../Levels/Levels';

function HomePage() {
  return (
    <>
      <section>
        <h1>Find Waldo!</h1>
        <p>Find Waldo as quickly as possible</p>
      </section>
      <section aria-label="Levels">
        <Levels />
      </section>
    </>
  );
}

export default HomePage;

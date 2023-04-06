import Levels from '../Levels/Levels';

function HomePage() {
  return (
    <>
      <section aria-labelledby="waldo-heading">
        <h1 className="text-3xl font-bold" id="waldo-heading">
          Find Waldo!
        </h1>
        <p>
          Waldo has been lost in the crowd. Can you find him? Also, the Wizard
          and Odlaw are hiding.
        </p>
      </section>
      <section aria-label="Levels">
        <Levels />
      </section>
    </>
  );
}

export default HomePage;

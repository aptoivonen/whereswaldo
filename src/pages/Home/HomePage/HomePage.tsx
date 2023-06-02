import LevelCardList from '../Levels/LevelCardList';

function HomePage() {
  return (
    <>
      <section
        className="mx-auto  rounded-xl bg-blue p-8 text-white"
        aria-labelledby="waldo-heading"
      >
        <h1 className="text-center text-3xl font-bold" id="waldo-heading">
          Can you spot the elusive Waldo and top the leaderboard?
        </h1>
        <p className="mx-auto mt-4 max-w-prose text-center text-xl">
          Waldo is a master of disguise and hiding in plain sight is his
          specialty. He&apos;s always on the run from his fans who are
          constantly trying to find him, making him a skilled and elusive
          hide-and-seek champion.
        </p>
      </section>
      <section className="mt-4" aria-label="Levels">
        <LevelCardList />
      </section>
    </>
  );
}

export default HomePage;

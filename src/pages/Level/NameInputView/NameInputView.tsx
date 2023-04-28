import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Container, useErrorBoundary } from '@/components/common';
import useAddScore from './useAddScore';
import formatTime from '@/utils/helpers/formatTime';

type NameInputViewProps = {
  levelId: string;
  counter: number;
};

function NameInputView({ levelId, counter }: NameInputViewProps) {
  const score = useAddScore();
  const { showBoundary } = useErrorBoundary();
  const [isNameError, setIsNameError] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const el = new FormData(e.currentTarget);
    const name = el.get('nameInput');
    if (typeof name !== 'string') {
      showBoundary(new Error('name input name property is wrong'));
      return;
    }
    const trimmedName = name.trim();
    if (!trimmedName) {
      setIsNameError(true);
      return;
    }
    try {
      score.add({
        userName: trimmedName,
        levelId,
        time: counter,
      });
    } catch (error) {
      showBoundary(error);
    }
  };

  if (score.isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-light to-blue">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (score.data) {
    return <Navigate to={`/scoreboard/?playerId=${score.data}`} />;
  }

  return (
    <div className="flex h-full items-center bg-gradient-to-br from-light to-blue">
      <Container>
        <section
          className="mx-auto flex w-full max-w-lg flex-col rounded-xl bg-blue p-8 text-white shadow"
          aria-labelledby="mainHeading"
        >
          <h1 className="text-center text-xl" id="mainHeading">
            You Found &apos;Em!
          </h1>
          <p className="mt-4">
            Give your name, visitor, to enter the scoreboard of fastest finders.
          </p>
          <span className="mt-4">
            Time: <time>{formatTime(counter)}</time>
          </span>
          <form className="mt-4" onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="nameInput"
              className="flex w-full items-center text-base"
            >
              Name:
              <input
                className="ml-4 flex-1 p-1 pl-2 text-black"
                id="nameInput"
                name="nameInput"
                type="text"
                placeholder="Input your name for highscores"
                required
                disabled={score.isLoading}
              />
            </label>
            {isNameError && (
              <Alert className="mt-4" variant="warning">
                You didn&apos;t input a name!
              </Alert>
            )}
          </form>
        </section>
      </Container>
    </div>
  );
}

export default NameInputView;

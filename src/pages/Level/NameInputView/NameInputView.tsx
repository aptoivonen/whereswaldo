import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fromZodError } from 'zod-validation-error';
import { Alert, Container, useErrorBoundary } from '@/components/common';
import useAddScore from './useAddScore';
import formatTime from '@/utils/helpers/formatTime';
import { UserNameSchema } from '@/model/schemas';

type NameInputViewProps = {
  levelId: string;
  counter: number;
};

function NameInputView({ levelId, counter }: NameInputViewProps) {
  const score = useAddScore();
  const { showBoundary } = useErrorBoundary();
  const [nameError, setNameError] = useState<Error | null>(null);
  const isNameError = !!nameError;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setNameError(null);
    const el = new FormData(e.currentTarget);
    const name = el.get('nameInput');
    if (typeof name !== 'string') {
      showBoundary(new Error('name input name property is wrong'));
      return;
    }
    const result = UserNameSchema.safeParse(name);
    if (!result.success) {
      setNameError(
        fromZodError(result.error, { prefix: '', prefixSeparator: '' })
      );
      return;
    }

    try {
      score.add({
        userName: result.data,
        levelId,
        time: counter,
      });
    } catch (error) {
      showBoundary(error);
    }
  };

  if (score.isLoading) {
    return <p className="text-xl">Loading...</p>;
  }

  if (score.data) {
    return <Navigate to={`/scoreboard/?scoreId=${score.data}`} />;
  }

  return (
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
            <span className="inline-block w-14">Name:</span>
            <input
              className="block flex-1 p-1 pl-2 text-black"
              id="nameInput"
              name="nameInput"
              type="text"
              placeholder="Input your name for highscores"
              required
              disabled={score.isLoading}
            />
          </label>
          <small className="ml-14 mt-2 block italic">
            Name should be between 1 and 10 characters long.
          </small>
          {isNameError && (
            <Alert className="mt-4" variant="warning">
              {nameError.message}
            </Alert>
          )}
        </form>
      </section>
    </Container>
  );
}

export default NameInputView;

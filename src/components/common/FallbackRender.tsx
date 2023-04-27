type FallbackRenderProps = {
  error: Error;
};

function FallbackRender({ error }: FallbackRenderProps) {
  return (
    <div
      role="alert"
      className="flex h-full flex-col items-center justify-center pt-4 text-center text-xl"
    >
      <p>Something went wrong:</p>
      <pre className="text-warning">{error.message}</pre>
    </div>
  );
}

export default FallbackRender;

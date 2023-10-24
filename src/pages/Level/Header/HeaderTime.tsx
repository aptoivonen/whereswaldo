type HeaderTimeProps = { children: string };

function HeaderTime({ children }: HeaderTimeProps) {
  return (
    <time
      className="text-2xl sm:text-4xl"
      aria-label="Elapsed time on the level."
      role="timer"
    >
      {children}
    </time>
  );
}

export default HeaderTime;

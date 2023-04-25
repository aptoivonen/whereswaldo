type HeaderTimeProps = { children: string };

function HeaderTime({ children }: HeaderTimeProps) {
  return (
    <time className="text-2xl sm:text-4xl" title="Running time on the level.">
      {children}
    </time>
  );
}

export default HeaderTime;

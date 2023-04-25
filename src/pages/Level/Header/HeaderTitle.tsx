type HeaderTitleProps = {
  children: string;
};

function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <h1 className="text-xl" title="Level name">
      {children}
    </h1>
  );
}

export default HeaderTitle;

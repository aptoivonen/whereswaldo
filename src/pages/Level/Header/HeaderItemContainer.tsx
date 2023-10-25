type HeaderItemContainerProps = {
  children: React.ReactNode;
};

function HeaderItemContainer({ children }: HeaderItemContainerProps) {
  return <div className="flex items-center">{children}</div>;
}

export default HeaderItemContainer;

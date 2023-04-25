type HeaderIconContainerProps = {
  children: React.ReactNode;
};

function HeaderIconContainer({ children }: HeaderIconContainerProps) {
  return <div className="ml-4 flex space-x-2">{children}</div>;
}

export default HeaderIconContainer;

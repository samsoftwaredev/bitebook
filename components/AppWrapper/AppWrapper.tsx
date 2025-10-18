import ProtectedRoute from '../ProtectedRoute';

interface Props {
  children: any;
}

const AppWrapper = ({ children }: Props) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AppWrapper;

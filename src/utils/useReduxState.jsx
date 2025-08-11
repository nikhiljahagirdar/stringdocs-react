import { useSelector } from 'react-redux';

const useReduxState = (key) => {
  return useSelector((state) => state[key]);
};

export default useReduxState;
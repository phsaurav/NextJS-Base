import { RootState } from '@/redux/store';
import Fetcher from '@/utils/fetcher';
import getLogger from '@/utils/getLogger';
import { useSelector } from 'react-redux';

const useRequest = (
  authenticated: boolean = false,
  _log: boolean = true,
  _token?: string
): Fetcher => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (authenticated && !_token) _token = token || undefined;
  const logger = getLogger();
  if (logger.showLog('info') && _log) _log = true;
  return new Fetcher(_token, _log);
};

export default useRequest;

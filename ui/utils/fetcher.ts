// swr doesn't do any fetching for us
// it just handles loading, error, and data states
// so we need this

import axios from 'axios';

const fetcher = <T>(url: string, headers = {}): Promise<T> =>
  axios
    .get<T>(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export default fetcher;

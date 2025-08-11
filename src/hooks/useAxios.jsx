import { useState, useCallback } from "react";
import axios from "axios";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic API Request Function
  const request = useCallback(async (method, url, data = null, headers = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({ method, url, data, headers });
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // API Methods
  const get = useCallback((url,  headers) => request("get", url, null, headers), [request]);
  const post = useCallback((url, data,  headers) => request("post", url, data, headers), [request]);
  const put = useCallback((url, data, headers) => request("put", url, data, headers), [request]);
  const patch = useCallback((url, data, headers ) => request("patch", url, data, headers), [request]);
  const del = useCallback((url, headers = {}) => request("delete", url, null, headers), [request]);

  return { get, post, put, patch, del, loading, error };
};

export default useAxios;

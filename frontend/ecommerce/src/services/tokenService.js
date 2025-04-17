import axios from 'axios';

const API_URL = 'http://your-backend-url/api/';

const refreshToken = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user?.refresh) {
      return false;
    }
    
    const response = await axios.post(API_URL + 'token/refresh/', {
      refresh: user.refresh
    });
    
    if (response.data.access) {
      const updatedUser = {
        ...user,
        access: response.data.access
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};

// Set up axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is due to unauthorized access and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshed = await refreshToken();
      if (refreshed) {
        // Update authorization header
        const user = JSON.parse(localStorage.getItem('user'));
        originalRequest.headers['Authorization'] = `Bearer ${user.access}`;
        return axios(originalRequest);
      }
      
      // If refresh failed, logout user
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default { refreshToken };
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const axiosApi = axios.create({
    baseURL: apiUrl,
    // withCredentials: true

});


// Add token automatically
axiosApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
//   console.log(token);
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}

  return config;
});

// axiosApi.interceptors.response.use(
    // successfull response
    // (response) => {
    //     return response
    // },

    // error response
    // async (error) => {
    //     const originalRequest = error.config;

    // }
// )



// ----- api reusable functions ------

// get function
export const get = async (url, config = {}) => {
    const { data } = await axiosApi.get(url, { ...config });
    return data
}

// post function
export const post = async (url, payload, config = {}) => {
    const { data } = await axiosApi.post(url, payload, { ...config });
    return data
}

// put function
export const put = async (url, payload, config = {}) => {
    const { data } = await axiosApi.put(url, payload, { ...config });
    return data
}

// patch function
export const patch = async (url, payload, config = {}) => {
    const { data } = await axiosApi.patch(url, payload, { ...config });
    return data
}

// delete function
export const deletes = async (url, config = {}) => {
    const { data } = await axiosApi.delete(url, { ...config });
}

// file upload function
export const postFormData = async (url, formData, config = {}) => {
    const { data } = await axiosApi.post(url, formData, config);
    return data;
};



export default axiosApi
import axios from "axios";

//! get method
export const axiosGet = async(url) => {
  let result = false;

  try {
    result = await axios.get(url)
            .then(res => res.data)    
  } catch (error) {
    
  }

  return result;
}

// post method
export const axiosPost = async(url, data) => {
  let result = false;

  try {
    result = await axios.post(url, data).then(res => res.data)
  } catch (error) {

  }

  return result;
}
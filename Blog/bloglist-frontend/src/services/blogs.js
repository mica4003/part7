import axios from "axios";
import storage from "./storage";
const baseUrl = "/api/blogs";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const addComment = async(id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment})
  console.log(response.data)
  return response.data
}
export default {getAll , create, update, remove, addComment };

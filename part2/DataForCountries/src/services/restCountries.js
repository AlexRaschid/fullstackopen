import axios from 'axios'
const URL_ALL = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const URL_NAME = 'https://studies.cs.helsinki.fi/restcountries/api/name/${}';//takes request

const getAll = () => {
  return axios.get(URL_ALL)
}

const create = (newObject) => {
  return axios.post(URL_ALL, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${URL_ALL}/${id}`, newObject)
}

const deleteService = (id) => {
  return axios.delete(`${URL_ALL}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteService: deleteService 
}
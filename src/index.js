import { stringify as qs } from 'querystring-browser'
import axios from 'axios'

// HTTP VERBS
const GET = 'GET'
const POST = 'POST'
const PATCH = 'PATCH'
const DELETE = 'DELETE'

// REQUEST TYPES
const actionTypes = {
  GET_LIST: 'GET_LIST',
  GET_ONE: 'GET_ONE',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const defaultActions = {
  transformResponse: (response) => {
    const { data: { _id, ...data } } = response
    return {
      data: {
        ...data,
        id: _id
      }
    }
  },
  generatePath: params => {
    const { id } = params
    return `/${id}`
  },
  httpVerb: GET
}

const actions = {
  [actionTypes.GET_LIST]: {
    transformResponse: response => {
      const { data } = response
      return {
        data: data.map(({ _id, ...elem}) => ({ ...elem, id: _id })),
        total: data.length
      }
    },
    generatePath: params => {
      const {
        filter,
        pagination: { perPage, page },
        sort: { order, field }
      } = params

      const query = qs({
        limit: perPage,
        skip: perPage*(page-1),
        query: JSON.stringify(filter),
        sort: `${order === 'ASC' ? '' : '-'}${field}`
      })

      return `?${query}`
    }
  },
  [actionTypes.CREATE]: {
    httpVerb: POST,
    generatePath: () => ''
  },
  [actionTypes.UPDATE]: {
    httpVerb: PATCH
  },
  [actionTypes.DELETE]: {
    httpVerb: DELETE
  }
}

const axiosConfig = (baseUrl, resource, params, action) => ({
  method: action.httpVerb,
  url: `${baseUrl}/${resource}${action.generatePath(params)}`,
  data: params.data,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseUrl => (type, resource, params, axios = axios) => {
  const action = Object.assign({}, defaultActions, actions[type] || {})

  const config = axiosConfig(baseUrl, resource, params, action)

  return axios(config)
    .then(action.transformResponse)
}

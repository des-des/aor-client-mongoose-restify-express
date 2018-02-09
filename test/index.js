import test from 'tape'
import createClient from '../src/'

const client = createClient('example.com')

const createMockAxois = mockResponse => {
  const calls = []

  return {
    axios: config => {
      calls.push(config)
      return new Promise(res => res(mockResponse))
    },
    calls
  }
}

test('GET_LIST', t => {
  const mockAPIResponse = { data: [{_id: 1, name: 'eoin' }] };
  const requestParams = {
    filter: {},
    pagination: { perPage: 10, page: 1 },
    sort: { order: 'ASC', field: 'id' }
  }

  const {
    calls,
    axios
  } = createMockAxois(mockAPIResponse)

  client('GET_LIST', 'users', requestParams, axios).then(response => {

    const expectedAxiosConfig = {
      method: 'GET',
      url: 'example.com/users?limit=10&skip=0&query=%7B%7D&sort=id',
      data: undefined,
      headers: { 'Content-Type': 'application/json' }
    }
    t.deepEqual(
      calls.shift(),
      expectedAxiosConfig,
      'correct arguments passed into axios'
    )

    const expectedClientResponse = {
      data: [{ id: 1, name: 'eoin' }],
      total: 1
    }
    t.deepEqual(
      response,
      expectedClientResponse,
      'response is transformed correctly'
    )

    t.end()
  }).catch(error => {

    t.error(error)
    t.end()
  })
})

test('GET_ONE', t => {
  const mockAPIResponse = { data: { _id: 1, name: 'eoin' } };
  const requestParams = {
    id: 1
  }

  const {
    calls,
    axios
  } = createMockAxois(mockAPIResponse)

  client('GET_ONE', 'users', requestParams, axios).then(response => {

    const expectedAxiosConfig = {
      method: 'GET',
      url: 'example.com/users/1',
      data: undefined,
      headers: { 'Content-Type': 'application/json' }
    }
    t.deepEqual(
      calls.shift(),
      expectedAxiosConfig,
      'correct arguments passed into axios'
    )

    const expectedClientResponse = {
      data: { id: 1, name: 'eoin' }
    }
    t.deepEqual(
      response,
      expectedClientResponse,
      'response is transformed correctly'
    )

    t.end()
  }).catch(error => {

    t.error(error)
    t.end()
  })
})

test('CREATE', t => {
  const mockAPIResponse = { data: { _id: 1, name: 'eoin' } };
  const requestParams = {
    data: { name: 'eoin' }
  }

  const {
    calls,
    axios
  } = createMockAxois(mockAPIResponse)

  client('CREATE', 'users', requestParams, axios).then(response => {

    const expectedAxiosConfig = {
      method: 'POST',
      url: 'example.com/users',
      data: requestParams.data,
      headers: { 'Content-Type': 'application/json' }
    }
    t.deepEqual(
      calls.shift(),
      expectedAxiosConfig,
      'correct arguments passed into axios'
    )

    const expectedClientResponse = {
      data: { id: 1, name: 'eoin' }
    }
    t.deepEqual(
      response,
      expectedClientResponse,
      'response is transformed correctly'
    )

    t.end()
  }).catch(error => {

    t.error(error)
    t.end()
  })
})

test('UPDATE', t => {
  const mockAPIResponse = { data: { _id: 1, name: 'des' } };
  const requestParams = {
    id: 1,
    data: { name: 'des' }
  }

  const {
    calls,
    axios
  } = createMockAxois(mockAPIResponse)

  client('UPDATE', 'users', requestParams, axios).then(response => {

    const expectedAxiosConfig = {
      method: 'PATCH',
      url: 'example.com/users/1',
      data: requestParams.data,
      headers: { 'Content-Type': 'application/json' }
    }
    t.deepEqual(
      calls.shift(),
      expectedAxiosConfig,
      'correct arguments passed into axios'
    )

    const expectedClientResponse = {
      data: { id: 1, name: 'des' }
    }
    t.deepEqual(
      response,
      expectedClientResponse,
      'response is transformed correctly'
    )

    t.end()
  }).catch(error => {

    t.error(error)
    t.end()
  })
})


test('DELETE', t => {
  const mockAPIResponse = { data: { _id: 1, name: 'des' } };
  const requestParams = {
    id: 1
  }

  const {
    calls,
    axios
  } = createMockAxois(mockAPIResponse)

  client('DELETE', 'users', requestParams, axios).then(response => {

    const expectedAxiosConfig = {
      method: 'DELETE',
      url: 'example.com/users/1',
      data: requestParams.data,
      headers: { 'Content-Type': 'application/json' }
    }
    t.deepEqual(
      calls.shift(),
      expectedAxiosConfig,
      'correct arguments passed into axios'
    )

    const expectedClientResponse = {
      data: { id: 1, name: 'des' }
    }
    t.deepEqual(
      response,
      expectedClientResponse,
      'response is transformed correctly'
    )

    t.end()
  }).catch(error => {

    t.error(error)
    t.end()
  })
})

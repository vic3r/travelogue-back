const HANDLERS = {
  users: {
    create: {
      headers: {},
      method: 'post',
      path: '/',
      dataInBody: true,
      dataInParams: false,
    },
    get: {
      headers: {},
      method: 'get',
      path: '/id/:userId',
      dataInBody: false,
      dataInParams: true,
    },
    update: {
      headers: {},
      method: 'patch',
      path: '/id/:userId',
      dataInBody: true,
      dataInParams: true,
    },
    delete: {
      headers: {},
      method: 'delete',
      path: '/id/:userId',
      dataInBody: false,
      dataInParams: true,
    },
  },
};

module.exports = HANDLERS;

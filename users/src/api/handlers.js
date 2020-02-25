const HANDLERS = {
  users: {
    create: {
      method: 'post',
      path: '/',
      dataInBody: true,
      dataInParams: false,
    },
    get: {
      method: 'get',
      path: '/id/:userId',
      dataInBody: false,
      dataInParams: true,
    },
    update: {
      method: 'patch',
      path: '/id/:userId',
      dataInBody: true,
      dataInParams: true,
    },
    delete: {
      method: 'delete',
      path: '/id/:userId',
      dataInBody: false,
      dataInParams: true,
    },
  },
};

module.exports = HANDLERS;

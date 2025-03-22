const userController = require('../../../src/controllers/userController');
const userService = require('../../../src/services/userService');

jest.mock('../../../src/services/userService');

describe('User Controller', () => {
  it('should get users', async () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    userService.getUsers.mockResolvedValue(mockUsers);

    const req = {};
    const res = { json: jest.fn() };

    await userController.getUsers(req, res);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
});

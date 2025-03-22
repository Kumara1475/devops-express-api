const userService = require('../../../src/services/userService');
const userModel = require('../../../src/models/userModel');

jest.mock('../../../src/models/userModel');

describe('User Service', () => {
  it('should get users', async () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    userModel.getUsers.mockResolvedValue(mockUsers);

    const users = await userService.getUsers();
    expect(users).toEqual(mockUsers);
  });
});

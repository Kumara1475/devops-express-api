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
  
  it('should create a user and return 201 status with the user data', async () => {
    const mockUser = { name: 'John Doe' };
    userService.createUser.mockResolvedValue(mockUser);

    const req = { body: mockUser };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.createUser(req, res);

    expect(userService.createUser).toHaveBeenCalledWith(mockUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});



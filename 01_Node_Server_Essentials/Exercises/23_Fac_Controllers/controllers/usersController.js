/**
 * USERS CONTROLLER
 * 
 * Controllers are functions that handle the business logic for routes.
 * Instead of putting logic directly in routes, we separate it into controllers.
 * 
 * Benefits:
 * - Routes stay clean and readable
 * - Logic is reusable
 * - Easier to test
 * - Better organization
 */

// Sample data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user' },
];

/**
 * GET ALL USERS
 * Controller function: getAllUsers
 * 
 * This function handles the logic for getting all users.
 * It receives req, res, next as parameters (like middleware).
 */
export const getAllUsers = (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve users',
      message: error.message,
    });
  }
};

/**
 * GET USER BY ID
 * Controller function: getUserById
 * 
 * This function handles the logic for getting a single user.
 * It accesses route parameters via req.params.
 */
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user',
      message: error.message,
    });
  }
};

/**
 * CREATE USER
 * Controller function: createUser
 * 
 * This function handles the logic for creating a new user.
 * It accesses request body via req.body.
 */
export const createUser = (req, res) => {
  try {
    const { name, email, role = 'user' } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required',
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
      message: error.message,
    });
  }
};

/**
 * UPDATE USER
 * Controller function: updateUser
 * 
 * This function handles the logic for updating a user.
 * It accesses both params (id) and body (updated data).
 */
export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
      message: error.message,
    });
  }
};

/**
 * DELETE USER
 * Controller function: deleteUser
 * 
 * This function handles the logic for deleting a user.
 * It finds and removes the user from the array.
 */
export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete user',
      message: error.message,
    });
  }
};

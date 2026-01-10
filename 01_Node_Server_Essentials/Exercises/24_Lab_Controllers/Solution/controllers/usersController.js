/**
 * Users Controller
 * Contains all business logic for user routes
 */

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

/**
 * GET all users
 */
export const getAllUsers = (req, res) => {
  try {
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET single user by ID
 */
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * CREATE new user
 */
export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required',
      });
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
    };
    users.push(newUser);

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * UPDATE user
 */
export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * DELETE user
 */
export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];
    res.json({ success: true, data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

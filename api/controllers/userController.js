import prisma from '../prisma/client.js';
import bcrypt from 'bcryptjs';
import * as jdenticon from 'jdenticon';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { uploadsFolder } from '../app.js';
import { createUser, getUserByEmail, getUserById, updateUser } from '../models/userModel.js';

class UserController {
  async register(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).send({ error: 'Missing required fields: email, password, name' });
    }

    try {
      // check if user exists
      // if user exists, return 400
      // if user does not exist, create user
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' });
      }

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // generate avatar
      const png = jdenticon.toPng(email, 200);
      const avatarName = `${email}.png`;
      const avatarPath = `${uploadsFolder}/${avatarName}`;
      await fs.promises.writeFile(avatarPath, png);

      const newUser = await createUser({
        email,
        password: hashedPassword,
        name,
        avatarUrl: `/uploads/${avatarName}`,
      });

      res.send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Missing required fields: email, password' });
    }

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(400).send({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      res.send({ token });
    } catch (error) {
      console.error('Login error', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const user = await getUserById(id);

      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      // check if the current user is following the user
      const isFollowing = user.followers.some((follower) => follower.id === userId);

      // password must not be send to the client
      delete user.password;
      res.send({ ...user, isFollowing });
    } catch (error) {
      console.error('Get user by id error', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { email, name, dateOfBirth, bio, location } = req.body;

    //console.log(req.user.userId);
    //console.log(id);

    if (id !== req.user.userId) {
      return res.status(403).send({ error: 'Forbidden' });
    }

    let avatarUrl;
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
    } else {
      avatarUrl = null;
    }

    try {
      if (email) {
        const existingUser = await getUserByEmail(email);

        if (existingUser && existingUser.id !== id) {
          return res.status(400).send({ error: 'Email already in use' });
        }
      }
    } catch (error) {
      console.error('Check email error', error);
      res.status(500).send({ error: 'Internal server error' });
    }

    try {
      const updatedUser = await updateUser(id, {
        email,
        name,
        dateOfBirth,
        bio,
        location,
        avatarUrl,
      });
      res.send(updatedUser);
    } catch (error) {
      console.error('Update user error: ', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async current(req, res) {
    const { user } = req;
    try {
      const currentUser = await getUserById(user.userId);

      if (!currentUser) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.send(currentUser);
    } catch (error) {
      console.error('Get current user error', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    res.send('delete');
  }
}

export default UserController;

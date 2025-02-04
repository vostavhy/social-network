import prisma from '../prisma/client.js';
import bcrypt from 'bcryptjs';
import * as jdenticon from 'jdenticon';
import fs from 'fs';
import { uploadsFolder } from '../app.js';

class UserController {
  async register(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).send('Missing required fields: email, password, name');
    }

    try {
      // check if user exists
      // if user exists, return 400
      // if user does not exist, create user
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).send('User already exists');
      }

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // generate avatar
      const png = jdenticon.toPng(email, 200);
      const avatarName = `${email}.png`;
      const avatarPath = `${uploadsFolder}/${avatarName}`;
      await fs.promises.writeFile(avatarPath, png);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatarUrl: `/uploads/${avatarName}`,
        },
      });

      res.send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async login(req, res) {
    res.send('login');
  }

  async current(req, res) {
    res.send('current');
  }

  async getUserById(req, res) {
    const { id } = req.params;
    res.send(`profile: ${id}`);
  }

  async updateUserById(req, res) {
    res.send('update');
  }

  async delete(req, res) {
    res.send('delete');
  }
}

export default UserController;

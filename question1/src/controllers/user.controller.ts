// user.controller.ts
import { Request, Response } from 'express';

export class UserController {
  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  getAllUsers(req: Request, res: Response) {
    res.json(this.users);
  }

  getUserById(req: Request, res: Response) {
    const user = this.users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  createUser(req: Request, res: Response) {
    const newUser = { id: this.users.length + 1, ...req.body };
    this.users.push(newUser);
    res.status(201).json(newUser);
  }

  updateUser(req: Request, res: Response) {
    const userIndex = this.users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...req.body };
      res.json(this.users[userIndex]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  deleteUser(req: Request, res: Response) {
    const userIndex = this.users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
}


export default UserController;
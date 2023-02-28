import { type NextFunction, type Request, type Response } from "express";
import { type User } from "./user.model";
import { registerUser, removeUser } from "./user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | null> => {
  try {
    const { username, password, avatar } = req.body;
    await registerUser(username, password, avatar);
    return res.status(201).end();
  } catch (err) {
    next(err);
    return null;
  }
};

export const login = (req: Request, res: Response): Response => {
  req.logIn(req.user as User, (err: any) => {
    if (err) throw err;
  });
  return res.status(200).end();
};

export const logout = (req: Request, res: Response): Response => {
  req.logout((err) => {
    if (err) throw err;
  });
  return res.status(200).end();
};

export const getUser = (req: Request, res: Response): Response =>
  res.status(200).json(req.user);

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | null> => {
  try {
    const { id } = req.body;
    await removeUser(id);
    req.session.destroy(() => {});
    return res.status(200).end();
  } catch (err) {
    next(err);
    return null;
  }
};

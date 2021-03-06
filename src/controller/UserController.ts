import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import User from "../model/User";

class UserController {
  async create(request: Request, response: Response) {
    const { name, last_name, nickname, adress, bio } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const nicknameExist = await userRepository.findByNickname(nickname);

    if (nicknameExist) {
      throw new AppError("nickname already exists!");
    }

    const user = userRepository.create({
      name,
      last_name,
      nickname,
      adress,
      bio,
    });
    await userRepository.save(user);

    return response.status(200).json(user);
  }

  async show(request: Request, response: Response): Promise<User | any> {
    const { name, last_name } = request.query;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.name = :name", { name })
      .orWhere("user.last_name = :last_name", { last_name })
      .getMany();

    const userExist = user.find((find) => find.name === name);

    if (!userExist) {
      throw new AppError("user not found!");
    }
    return response.status(200).json(user);
  }

  async listUserByNickname(request: Request, response: Response) {
    const nickname = request.query;

    const userRepository = getCustomRepository(UserRepository);
    const userExist = await userRepository.findOne(nickname);

    if (!userExist) {
      throw new AppError("user not found");
    }

    const { name, last_name } = userExist;

    return response.status(200).json({ name, last_name, ...nickname });
  }

  async updateLastName(request: Request, response: Response) {
    const { id } = request.params;
    const { last_name } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const userExist = await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ last_name })
      .where("id = :id", { id })
      .execute();

    if (!userExist) {
      throw new AppError("user not found!");
    }
    return response.status(200).json(userExist);
  }

  async updateNickname(request: Request, response: Response) {
    const { id } = request.params;
    const { nickname } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const userExist = await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ nickname })
      .where("id = :id", { id })
      .execute();

    if (!userExist) {
      throw new AppError("user not found!");
    }
    return response.status(200).json(userExist);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ id });

    if (!user) {
      throw new AppError("user not found");
    }

    await userRepository.remove(user);

    return response.status(200).send("user deleted with success");
  }
}

export default UserController;

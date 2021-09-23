import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import User from "../model/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findByNickname(nickname: string): Promise<User> {
    return this.findOne({ nickname });
  }
  // async store({
  //   name,
  //   last_name,
  //   nickname,
  //   adress,
  //   bio,
  // }: ICreateUser): Promise<User> {
  //   const userRepository = getCustomRepository(UserRepository);
  //   const user = await userRepository.create({
  //     name,
  //     last_name,
  //     nickname,
  //     adress,
  //     bio,
  //   });
  //   return userRepository.save(user);
  // }
}

export default UserRepository;

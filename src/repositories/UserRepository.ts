import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import User from "../model/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findByNickname(nickname: string): Promise<User> {
    return this.findOne({ nickname });
  }
}

export default UserRepository;

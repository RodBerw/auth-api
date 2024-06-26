import { Injectable } from '@nestjs/common';
import { User } from './models/User';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  public constructor(
    @InjectModel(User)
    private user : typeof User,
    private readonly jwtService: JwtService,
  ) {}

  public async selectUser(email) {
    try{
      return email ? this.user.findOne({where: {email}}) : this.user.findAll();
    }catch(error){
      console.error('Error selecting user:', error);
      throw new Error('Could not select user');
    }
  }

  public async createUser(body: any) {
    try {
      const user = await User.create(body);
      return {message: 'ok', user};
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user');
    }
  }

  public async generateToken(payload: any): Promise<string> {
    try{
      const token = await this.jwtService.signAsync(payload, {expiresIn: '10m'});
      return token;
    }catch(error){
      console.error('Error generating token:', error);
      throw new Error('Could not generate token');
    }
  }
}

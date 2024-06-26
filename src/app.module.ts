import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      define: {
        timestamps: false
      },
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Curitiba12345',
      database: 'trabalho',
      models: [User],
    }),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "senha",
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

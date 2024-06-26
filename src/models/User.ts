import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  user_id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;
}

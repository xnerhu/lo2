import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { IUserEntity } from '~/common/interfaces';

@Entity('users')
export class UserEntity extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('tinytext')
  firstName: string;

  @Column('tinytext')
  lastName: string;

  @Column('text')
  password: string;

  @Column('tinytext')
  imageId: string;
}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { IArticleEntity } from '~/common/interfaces';

@Entity('articles')
export class ArticleEntity extends BaseEntity implements IArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  label: string;

  @Column('tinytext')
  title: string;

  @Column('longtext')
  content: string;

  @Column('tinytext')
  imageId: string;
}

import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "../db/entities/post.entity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {

}
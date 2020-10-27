import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlActivityModel {
    @Field((type) => ID)
    activity_id: number;

    @Field()
    name: string;

    @Field()
    description: string;
}
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { MicroservicesModules } from 'src/microservices';

export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      include: [...MicroservicesModules],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    };
  }
}

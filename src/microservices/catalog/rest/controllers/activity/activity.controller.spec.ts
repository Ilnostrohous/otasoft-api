import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../../../services/activity/activity.service';
import { connectMicroservice } from '../../../../microservice-connection/microservice-connection';
import { ActivityController } from './activity.controller';
import { RedisCacheModule } from '../../../../../cache/redis-cache.module';
import { MicroserviceConnectionService } from '../../../../microservice-connection/microservice-connection.service';

describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([connectMicroservice('catalog')]),
        RedisCacheModule,
      ],
      controllers: [ActivityController],
      providers: [ActivityService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
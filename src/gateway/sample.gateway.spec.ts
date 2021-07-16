import { Test, TestingModule } from '@nestjs/testing';
import { SampleGateway } from './sample.gateway';

describe('SampleGateway', () => {
  let gateway: SampleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleGateway],
    }).compile();

    gateway = module.get<SampleGateway>(SampleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

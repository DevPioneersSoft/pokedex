import { Test, TestingModule } from '@nestjs/testing';
import { PruebaService } from './prueba.service';

describe('PruebaService', () => {
  let service: PruebaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PruebaService],
    }).compile();

    service = module.get<PruebaService>(PruebaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

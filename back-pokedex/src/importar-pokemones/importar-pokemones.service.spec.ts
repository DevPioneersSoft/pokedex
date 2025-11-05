import { Test, TestingModule } from '@nestjs/testing';
import { ImportarPokemonesService } from './importar-pokemones.service';

describe('ImportarPokemonesService', () => {
  let service: ImportarPokemonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportarPokemonesService],
    }).compile();

    service = module.get<ImportarPokemonesService>(ImportarPokemonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ImportarPokemonService } from './importar-pokemon.service';

describe('ImportarPokemonService', () => {
  let service: ImportarPokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportarPokemonService],
    }).compile();

    service = module.get<ImportarPokemonService>(ImportarPokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

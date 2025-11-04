import { Test, TestingModule } from '@nestjs/testing';
import { ImportarPokemonController } from './importar-pokemon.controller';
import { ImportarPokemonService } from './importar-pokemon.service';

describe('ImportarPokemonController', () => {
  let controller: ImportarPokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportarPokemonController],
      providers: [ImportarPokemonService],
    }).compile();

    controller = module.get<ImportarPokemonController>(ImportarPokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

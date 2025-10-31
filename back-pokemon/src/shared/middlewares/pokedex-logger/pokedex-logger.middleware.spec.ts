import { PokedexLoggerMiddleware } from './pokedex-logger.middleware';

describe('PokedexLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new PokedexLoggerMiddleware()).toBeDefined();
  });
});

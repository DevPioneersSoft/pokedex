export interface ListaPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    url: string;
  }>;
}
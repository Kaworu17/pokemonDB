export interface Pokemon {
  id?: number | undefined | null;
  name: string;
  icon: string; //sprites>front_default
  type01: string;
  type02?: string;
  description?: string;
}

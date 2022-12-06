export interface Repository<T> {
  getAll(): Promise<T[]>;
  create(input: Omit<T, "id">): Promise<T>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}

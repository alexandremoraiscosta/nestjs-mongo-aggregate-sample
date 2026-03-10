export interface DomainEvent<T = any> {
  eventType: string;
  occurredAt: string;
  payload: T;
}
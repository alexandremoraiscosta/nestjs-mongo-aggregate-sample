import { DomainEvent } from './domain-event.interface';

export interface EventsPublisher {
  publish(event: DomainEvent): Promise<void>;
}
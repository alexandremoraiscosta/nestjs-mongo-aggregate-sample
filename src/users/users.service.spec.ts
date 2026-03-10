import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { SqsLikeEventsPublisher } from '../common/events/sqs-like-events.publisher';

describe('UsersService', () => {
  let service: UsersService;

  const userModelMock = {
    create: jest.fn(),
    find: jest.fn(() => ({ exec: jest.fn() })),
    findById: jest.fn(() => ({ exec: jest.fn() })),
    findByIdAndUpdate: jest.fn(() => ({ exec: jest.fn() })),
    aggregate: jest.fn(() => ({ exec: jest.fn() })),
  };

  const eventsPublisherMock = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
        {
          provide: SqsLikeEventsPublisher,
          useValue: eventsPublisherMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
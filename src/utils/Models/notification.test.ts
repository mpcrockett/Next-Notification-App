import { createNotification, getNotifications } from './notification';
import prisma from '../client';
import { Prisma } from '@prisma/client';

jest.mock('../client', () => ({
  notification: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const mockNotification = {
  id: 1,
  userId: 'cuid-123',
  apptTime: '09:15',
  roomNumber: '4',
  message: 'Please bring intake form',
  createdAt: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createNotification', () => {
  it('creates and returns a notification', async () => {
    (mockPrisma.notification.create as jest.Mock).mockResolvedValue(mockNotification);

    const result = await createNotification({
      userId: 'cuid-123',
      apptTime: '09:15',
      roomNumber: '4',
      message: 'Please bring intake form',
    });

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: {
        userId: 'cuid-123',
        apptTime: '09:15',
        roomNumber: '4',
        message: 'Please bring intake form',
      },
    });
    expect(result).toEqual(mockNotification);
  });

  it('creates a notification without an optional message', async () => {
    const withoutMessage = { ...mockNotification, message: undefined };
    (mockPrisma.notification.create as jest.Mock).mockResolvedValue(withoutMessage);

    const result = await createNotification({
      userId: 'cuid-123',
      apptTime: '09:15',
      roomNumber: '4',
    });

    expect(result).toEqual(withoutMessage);
  });

  it('returns a Prisma error object when a known Prisma error occurs', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const prismaError = new Prisma.PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '6.3.1',
    });
    (mockPrisma.notification.create as jest.Mock).mockRejectedValue(prismaError);

    const result = await createNotification({
      userId: 'cuid-123',
      apptTime: '09:15',
      roomNumber: '4',
    });

    expect(result).toEqual({ error: 'Record not found', code: 'P2025' });
    consoleSpy.mockRestore();
  });

  it('returns a generic error object when an unknown error occurs', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (mockPrisma.notification.create as jest.Mock).mockRejectedValue(new Error('Unknown'));

    const result = await createNotification({
      userId: 'cuid-123',
      apptTime: '09:15',
      roomNumber: '4',
    });

    expect(result).toEqual({ error: 'An unexpected error occurred' });
    consoleSpy.mockRestore();
  });
});

describe('getNotifications', () => {
  it('returns a list of notifications', async () => {
    const mockList = [mockNotification];
    (mockPrisma.notification.findMany as jest.Mock).mockResolvedValue(mockList);

    const result = await getNotifications();

    expect(mockPrisma.notification.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockList);
  });

  it('returns an empty array when no notifications exist', async () => {
    (mockPrisma.notification.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getNotifications();

    expect(result).toEqual([]);
  });

  it('returns a Prisma error object when a known Prisma error occurs', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const prismaError = new Prisma.PrismaClientKnownRequestError('Connection failed', {
      code: 'P1001',
      clientVersion: '6.3.1',
    });
    (mockPrisma.notification.findMany as jest.Mock).mockRejectedValue(prismaError);

    const result = await getNotifications();

    expect(result).toEqual({ error: 'Connection failed', code: 'P1001' });
    consoleSpy.mockRestore();
  });

  it('returns a generic error object when an unknown error occurs', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (mockPrisma.notification.findMany as jest.Mock).mockRejectedValue(new Error('Unknown'));

    const result = await getNotifications();

    expect(result).toEqual({ error: 'An unexpected error occurred' });
    consoleSpy.mockRestore();
  });
});
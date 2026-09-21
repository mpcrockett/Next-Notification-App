import { createUser, getProviders, getProviderById, updatePhoneNumber, checkUser, setIsProvider } from './users';
import prisma from '../client';


jest.mock('../client', () => ({
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;


const mockUser = {
  id: 'cuid-123',
  name: 'Jane Smith',
  email: 'jane@clinic.com',
  phoneNumber: '+12125551234',
  onboarded: false,
  role: 'PROVIDER' as const,
  twilioOptedIn: true,
  emailVerified: null,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};


beforeEach(() => {
  jest.clearAllMocks();
});


describe('createUser', () => {
  it('creates and returns a new user', async () => {
    (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUser({
      name: 'Jane Smith',
      email: 'jane@clinic.com',
      phoneNumber: '+12125551234',
    });

    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Jane Smith',
        email: 'jane@clinic.com',
        phoneNumber: '+12125551234',
      },
    });
    expect(result).toEqual(mockUser);
  });

  it('logs error and returns undefined when Prisma throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (mockPrisma.user.create as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await createUser({
      name: 'Jane Smith',
      email: 'jane@clinic.com',
      phoneNumber: '+12125551234',
    });

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});


describe('getProviders', () => {
  it('returns a list of providers', async () => {
    const mockProviders = [{ id: 'cuid-123', name: 'Jane Smith' }];
    (mockPrisma.user.findMany as jest.Mock).mockResolvedValue(mockProviders);

    const result = await getProviders();

    expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
      select: { id: true, name: true },
      where: { role: 'PROVIDER' },
    });
    expect(result).toEqual(mockProviders);
  });

  it('returns empty array when no providers exist', async () => {
    (mockPrisma.user.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getProviders();

    expect(result).toEqual([]);
  });

  it('logs error and returns undefined when Prisma throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (mockPrisma.user.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await getProviders();

    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
});


describe('getProviderById', () => {
  it('returns a provider when found', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await getProviderById('cuid-123');

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'cuid-123', role: 'PROVIDER' },
    });
    expect(result).toEqual(mockUser);
  });

  it('returns null when provider not found', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getProviderById('nonexistent-id');

    expect(result).toBeNull();
  });

  it('logs error and returns undefined when Prisma throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (mockPrisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await getProviderById('cuid-123');

    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
});


describe('updatePhoneNumber', () => {
  it('updates and returns the user with new phone number', async () => {
    const updated = { ...mockUser, phoneNumber: '+19995551234' };
    (mockPrisma.user.update as jest.Mock).mockResolvedValue(updated);

    const result = await updatePhoneNumber('cuid-123', '+19995551234');

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 'cuid-123' },
      data: { phoneNumber: '+19995551234' },
    });
    expect(result).toEqual(updated);
  });

  it('logs error and returns undefined when Prisma throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (mockPrisma.user.update as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await updatePhoneNumber('cuid-123', '+19995551234');

    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
});


describe('checkUser', () => {
  it('returns the user when found', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await checkUser('jane@clinic.com');

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'jane@clinic.com' },
    });
    expect(result).toEqual(mockUser);
  });

  it('returns false when user not found', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await checkUser('nobody@clinic.com');

    expect(result).toBe(false);
  });

  it('logs error and returns undefined when Prisma throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (mockPrisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await checkUser('jane@clinic.com');

    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
});


describe('setIsProvider', () => {
  it('updates the user role to PROVIDER', async () => {
    (mockPrisma.user.update as jest.Mock).mockResolvedValue(undefined);

    await setIsProvider('cuid-123');

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 'cuid-123' },
      data: { role: 'PROVIDER' },
    });
  });

  it('logs error and returns undefined when Prisma throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (mockPrisma.user.update as jest.Mock).mockRejectedValue(new Error('DB error'));

    await setIsProvider('cuid-123');

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
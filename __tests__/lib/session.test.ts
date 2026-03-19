import { getSession, setSession } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const mockGetIronSession = getIronSession as jest.Mock;
const mockCookies = cookies as jest.Mock;

describe('setSession', () => {
  it('saves userId and username to the session', async () => {
    const mockSave = jest.fn();
    const mockSession = { userId: null, username: null, save: mockSave };
    mockCookies.mockResolvedValue({});
    mockGetIronSession.mockResolvedValue(mockSession);

    const mockUser = {
      id: 1,
      username: 'john',
      password: 'hashed',
      createdAt: new Date(),
    };
    await setSession(mockUser);

    expect(mockSession.userId).toBe(1);
    expect(mockSession.username).toBe('john');
    expect(mockSave).toHaveBeenCalled();
  });
});

describe('getSession', () => {
  it('calls getIronSession', async () => {
    await getSession();
    expect(mockGetIronSession).toHaveBeenCalled();
  });
});

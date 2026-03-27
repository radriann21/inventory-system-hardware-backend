export const CookieConfig = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  partitioned: process.env.NODE_ENV === 'production' ? true : false,
} as const;

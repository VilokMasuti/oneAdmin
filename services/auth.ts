export interface LoginResponse {
  success: boolean;
  error?: string;
  user?: {
    email: string;
    name: string;
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          success: true,
          user: {
            email,
            name: email.split('@')[0].replace('.', ' '),
          },
        });
      } else {
        resolve({
          success: false,
          error: 'Invalid credentials',
        });
      }
    }, 500);
  });
}

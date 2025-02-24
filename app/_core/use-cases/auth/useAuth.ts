import { useMutation } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

export const useAuthMutations = () => {
  const login = useMutation({
    mutationFn: async (credentials: LoginCredential) => {
      return await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });
    },
    onSuccess: async () => {
      const session = await getSession();

      console.log(session);
      toast.success("Login Successful");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    login,
  };
};

interface LoginCredential {
  email: string;
  password: string;
}

// interface ILoginRes {
//   data: {
//     accessToken: string;
//     refreshToken: string;
//     user: {
//       id: string;
//       email: string;
//       firstName: string;
//       lastName: string;
//       role: string[];
//       company: string;
//     };
//   };
// }

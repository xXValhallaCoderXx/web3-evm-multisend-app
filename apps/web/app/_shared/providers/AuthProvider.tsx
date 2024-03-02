import { auth } from "../../../auth.config";
import { SessionProvider } from "next-auth/react";

export default async function AuthProvider({ children }: any) {
  const session = await auth();
  if (session?.user) {
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}

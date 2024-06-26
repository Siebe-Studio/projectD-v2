"use client";

import { Session } from "next-auth";
import { SessionProvider} from "next-auth/react";

const Providers = ({ children, session }: { children: React.ReactNode, session: Session }) => {
  console.log(session);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;

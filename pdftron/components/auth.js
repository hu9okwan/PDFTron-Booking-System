import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Auth ({ children }) {
  const [session, loading] = useSession();
  const hasUser = !!session?.user;
  const router = useRouter();
  useEffect(() => {
    if (!loading && !hasUser) {
      router.push("http://localhost:3000/");
    }
  }, [loading, hasUser]);
  if (loading || !hasUser) {
    return <div>Waiting for session...</div>;
  }
  return children;
};

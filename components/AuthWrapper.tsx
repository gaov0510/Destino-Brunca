// components/AuthWrapper.tsx
import { useRouter, useSegments } from "expo-router";
import useAuth from "@/hooks/useAuth";

import Loading from "./Loading";

const PROTECTED_ROUTES = ["(screens)", "(forms)"];

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const segments: string[] = useSegments();
  const auth = useAuth();

  /*   useEffect(() => {
    const inProtectedRoute = PROTECTED_ROUTES.some((route) =>
      segments.includes(route.replace(/[()]/g, ""))
    );

    if (inProtectedRoute && !auth.user) {
      // Redirige al login si no está autenticado
      router.replace("/");
    } else if (!inProtectedRoute && auth.user) {
      // Redirige a la pantalla principal si ya está autenticado
      router.replace("/(screens)/home");
    }
  }, [auth.user]); */

  if (auth.loading) return <Loading opaque />;

  return children;
}

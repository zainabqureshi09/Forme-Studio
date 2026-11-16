import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface RouterContextValue {
  pathname: string;
  search: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseTarget(to: string): { path: string; search: string; hash: string } {
  const [pathAndSearch, hashPart = ""] = to.split("#");
  const [pathPart, searchPart = ""] = pathAndSearch.split("?");
  return {
    path: pathPart || "/",
    search: searchPart ? `?${searchPart}` : "",
    hash: hashPart ? `#${hashPart}` : "",
  };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState<string>(
    () => window.location.pathname || "/"
  );
  const [search, setSearch] = useState<string>(
    () => window.location.search || ""
  );

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || "/");
      setSearch(window.location.search || "");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const { path, search: nextSearch, hash } = parseTarget(to);
    const fullUrl = `${path}${nextSearch}${hash}`;

    if (window.location.pathname + window.location.search + window.location.hash !== fullUrl) {
      window.history.pushState({}, "", fullUrl);
    }

    setPathname(path);
    setSearch(nextSearch);

    if (hash) {
      const targetId = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, search, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside RouterProvider");
  return ctx;
}

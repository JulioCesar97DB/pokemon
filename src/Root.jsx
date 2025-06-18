import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster
          theme="dark"
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "rgb(30 41 59)",
              color: "rgb(241 245 249)",
              border: "1px solid rgb(71 85 105)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default Root;

import { Preloader } from "@/features/auth/components"
import RootModals from "@/features/modals/RootModals"
import { queryClient } from "@/lib/queryClient"
import RootRoutes from "@/router/RootRoutes"
import { QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <RootModals />
          <RootRoutes />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

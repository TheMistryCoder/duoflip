"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
// ✅ DEV-only: suppress Grammarly hydration warning
// app/providers.tsx or app/layout.tsx

if (process.env.NODE_ENV === "development") {
	const originalError = console.error;
	console.error = (...args) => {
		if (typeof args[0] === "string" && args[0].includes("A tree hydrated but some attributes")) {
			return;
		}
		originalError(...args);
	};
}

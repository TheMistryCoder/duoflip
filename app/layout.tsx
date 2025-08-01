/////////////////////////////////////////////////////////
export {};
// Only run this block during development — avoids affecting production builds
if (process.env.NODE_ENV === "development") {
	void import("../src/utils/suppressDevWarnings");
}
/////////////////////////////////////////////////////////

// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Providers from "./providers"; // 👈 import your client-only wrapper

export const metadata = {
	title: "Duo Flip - Interactive Learning",
	description: "Transform classrooms across the UK with Duo Flip projection technology.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-white text-slate-900 antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

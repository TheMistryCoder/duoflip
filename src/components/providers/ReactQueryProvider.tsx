import "./globals.css";
import { ReactNode } from "react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export const metadata = {
	title: "Duo Flip",
	description: "Interactive learning that moves with you",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
}

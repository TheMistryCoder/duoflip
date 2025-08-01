import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge"; // ✅ Add this line

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(...inputs));
}

// ✅ DEV-only: suppress Grammarly hydration warning
if (process.env.NODE_ENV === "development") {
	const originalError = console.error;

	console.error = (...args) => {
		if (
			typeof args[0] === "string" &&
			args[0].includes("A tree hydrated but some attributes")
		) {
			return;
		}
		originalError(...args);
	};
}

export {};

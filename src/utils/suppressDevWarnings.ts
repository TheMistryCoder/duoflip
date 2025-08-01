// Only run this block during development — avoids affecting production builds
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
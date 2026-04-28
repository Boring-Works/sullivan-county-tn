import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "~/server/auth";

export const Route = createFileRoute("/admin/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await login({ data: { password } });
			navigate({ to: "/admin" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-sm">
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-navy">
						<span className="font-display text-lg font-bold text-brand-brass">SC</span>
					</div>
					<h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
					<p className="mt-1 text-sm text-gray-500">Sullivan County CMS</p>
				</div>

				<form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoFocus
						className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
					/>

					{error && (
						<p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-50 transition-colors"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
			</div>
		</main>
	);
}

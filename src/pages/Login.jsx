import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("user1@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:grid-cols-[1.1fr_1fr]">
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 p-10 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <span className="text-2xl font-semibold">TS</span>
            </div>
            <div className="font-semibold tracking-wide">Task Sphere</div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight">
              Plan, prioritize & manage your tasks.
            </h1>
            <p className="max-w-md text-sm text-emerald-100">
              Stay on top of every project with a clean, modern dashboard
              experience tailored for your workflow.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-emerald-100/80">
            <span>© {new Date().getFullYear()} Task Sphere</span>
            <span>Secure & modern dashboard</span>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-50/40 p-8 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Welcome back 👋
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Login to access your projects dashboard.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-xs text-slate-400">
              For testing: <span className="font-medium">user1@example.com</span>{" "}
              / <span className="font-medium">password123</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


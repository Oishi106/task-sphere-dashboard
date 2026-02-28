import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../services/axiosInstance.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, projectsRes] = await Promise.all([
          axiosInstance.get("/api/summary"),
          axiosInstance.get("/api/projects"),
        ]);
        setSummary(summaryRes.data);
        setProjects(projectsRes.data || []);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProjects = summary?.totalProjects ?? 24;
  const endedProjects = summary?.endedProjects ?? 10;
  const runningProjects = summary?.runningProjects ?? 12;
  const pendingProjects = summary?.pendingProjects ?? 2;

  const fallbackProjects = [
    { id: "fallback-1", title: "Develop API Endpoints", dueDate: "Nov 26, 2024" },
    { id: "fallback-2", title: "Onboarding Flow", dueDate: "Nov 28, 2024" },
    { id: "fallback-3", title: "Build Dashboard", dueDate: "Nov 30, 2024" },
    { id: "fallback-4", title: "Optimize Page Load", dueDate: "Dec 5, 2024" },
    { id: "fallback-5", title: "Cross-Browser Testing", dueDate: "Dec 6, 2024" },
  ];

  const projectItems = (projects?.length ? projects : fallbackProjects).slice(0, 5);

  return (
    <div className="min-h-screen bg-white/0 p-3 text-slate-900 sm:p-4">
      <div className="flex flex-col items-stretch gap-3 sm:gap-4 lg:flex-row lg:items-stretch">
        {/* Sidebar card */}
        <aside className="flex w-full shrink-0 flex-col rounded-4xl bg-white/80 px-5 pt-5 pb-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-6 lg:w-64">
          <div className="flex items-center gap-3">
            <div className="flex  justify-center rounded-full  -ml-5">
              <img src="/logo.png" alt="Donezo" className="h-27 w-29 " />
            </div>
            <p className="text-[26px] font-semibold -ml-9  tracking-tight text-slate-900">Donezo</p>
          </div>

          <nav className="mt-8 space-y-8 text-sm sm:mt-10">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] pl-4 text-slate-400">Menu</p>
              <div className="space-y-1">
                <button className="group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left">
                  <span className="absolute -left-3 top-1/2 h-9 w-1.5 -translate-y-1/2 rounded-full bg-emerald-700" />
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h7v7H4z" />
                    <path d="M13 4h7v7h-7z" />
                    <path d="M4 13h7v7H4z" />
                    <path d="M13 13h7v7h-7z" />
                  </svg>
                  <span className="text-[15px] font-semibold text-slate-900">Dashboard</span>
                </button>

                <button className="group flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                  <span className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5 text-slate-300 transition group-hover:text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 6h8" />
                      <path d="M8 10h8" />
                      <path d="M8 14h5" />
                      <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                    </svg>
                    <span className="text-[15px] font-medium">Tasks</span>
                  </span>
                  <span className="rounded-md bg-emerald-900 px-2 py-1 text-[10px] font-semibold text-white">12+</span>
                </button>

                <button className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-300 transition group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2z" />
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <path d="M5 9h14" />
                  </svg>
                  <span className="text-[15px] font-medium">Calendar</span>
                </button>

                <button className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-300 transition group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19V5" />
                    <path d="M8 19v-7" />
                    <path d="M12 19v-4" />
                    <path d="M16 19V9" />
                    <path d="M20 19v-12" />
                  </svg>
                  <span className="text-[15px] font-medium">Analytics</span>
                </button>

                <button className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-300 transition group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <path d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    <path d="M22 21v-2a3 3 0 0 0-2.5-3" />
                    <path d="M16 3.4a4 4 0 0 1 0 7.6" />
                  </svg>
                  <span className="text-[15px] font-medium">Team</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] pl-4 text-slate-400">General</p>
              <div className="space-y-1">
                <button className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-300 transition group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-1.4 3.4h-.2a1.7 1.7 0 0 0-1.6 1.2 2 2 0 0 1-3.8 0 1.7 1.7 0 0 0-1.6-1.2h-.2a2 2 0 0 1-1.4-3.4l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4.8a2 2 0 0 1-1.9-2.6 2 2 0 0 1 1.9-1.4h.1a1.7 1.7 0 0 0 1.6-1.2 2 2 0 0 1 3.8 0 1.7 1.7 0 0 0 1.6 1.2h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 0 1 16.2 3h.2a1.7 1.7 0 0 0 1.6-1.2 2 2 0 0 1 3.8 0 1.7 1.7 0 0 0 1.6 1.2h.2a2 2 0 0 1 1.4 3.4l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                  </svg>
                  <span className="text-[15px] font-medium">Settings</span>
                </button>

                <button className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-300 transition group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 18h.01" />
                    <path d="M9.1 9a3 3 0 1 1 4.8 2.4c-.9.6-1.9 1.2-1.9 2.6" />
                    <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
                  </svg>
                  <span className="text-[15px] font-medium">Help</span>
                </button>

                <button
                  onClick={logout}
                  className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-slate-400 transition hover:bg-rose-50 hover:text-rose-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-300 transition group-hover:text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <path d="M16 17l5-5-5-5" />
                    <path d="M21 12H9" />
                  </svg>
                  <span className="text-[15px] font-medium">Logout</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="mt-auto overflow-hidden rounded-3xl">
            <div
              className="relative bg-cover bg-center bg-no-repeat p-5 text-white"
              style={{ backgroundImage: "url(/D.jpeg)" }}
            >
              <div className="absolute inset-0 bg-slate-950/55" />

              <div className="relative">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                    <path d="M12 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                </div>

                <p className="mt-3 text-[18px] font-medium leading-tight text-white/90">Download our</p>
                <p className="text-[20px] font-semibold leading-tight text-white">Mobile App</p>
                <p className="mt-1 text-[11px] text-white/70">Get easy in another way</p>

                <button className="mt-6 w-full rounded-full bg-emerald-800 py-3 text-[13px] font-medium text-white">Download</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main area: navbar card + dashboard card */}
        <main className="min-w-0 flex-1">
          <div className="flex flex-col gap-4">
            {/* Navbar card */}
            <div className="rounded-4xl bg-white/95 px-4 py-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:px-7 sm:py-5">
              <div className="flex flex-col gap-4 rounded-3xl bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="w-full sm:max-w-lg">
                  <div className="flex h-12 items-center gap-3 rounded-full bg-slate-50 px-4 ring-1 ring-inset ring-slate-200/70">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.2-3.2" />
                    </svg>

                    <input
                      type="text"
                      placeholder="Search task"
                      className="w-full bg-transparent text-[14px] text-slate-600 outline-none placeholder:text-slate-400"
                    />

                    <span className="inline-flex shrink-0 items-center rounded-xl bg-slate-100 px-2 py-1 text-[12px] font-medium text-slate-500 ring-1 ring-inset ring-slate-200/70">
                      ⌘ F
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Messages"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-inset ring-slate-200/70"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 text-slate-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 5h16v14H4z" />
                        <path d="M4 7l8 6 8-6" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      aria-label="Notifications"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-inset ring-slate-200/70"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 text-slate-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 ring-1 ring-inset ring-slate-200/70">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-200 text-xl" aria-hidden="true">
                      🧑‍🦱
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold leading-tight text-slate-900">Totok Michael</p>
                      <p className="truncate text-[13px] leading-tight text-slate-400">{user?.email || "tmichael20@mail.com"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard content card */}
            <div className="rounded-4xl bg-white/95 px-4 py-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:px-7 sm:py-5">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-[28px] font-semibold tracking-tight text-slate-900">Dashboard</h1>
                  <p className="mt-1 text-[13px] text-slate-500">Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>

                <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-[13px] font-medium text-white shadow-sm hover:bg-emerald-800 sm:w-auto">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                    Add Project
                  </button>
                  <button className="w-full rounded-full border border-emerald-700/50 bg-white px-5 py-2.5 text-[13px] font-medium text-emerald-800 hover:bg-emerald-50 sm:w-auto">Import Data</button>
                </div>
              </header>

              <section className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
                {/* Row 1: stats */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4 ">
                  <StatCard
                    title="Total Projects"
                    titleClassName="text-[24px] font-semibold text-slate-900"
                    value={totalProjects}
                    metaBadge="5+"
                    metaText="Increased from last month"
                    featured
                    featuredBg="linear-gradient(135deg, #0B4D2C 0%, #1A5F35 100%)"
                  />
                  <StatCard
                    title="Ended Projects"
                    titleClassName="text-[24px] font-semibold text-slate-900"
                    value={endedProjects}
                    metaBadge="6+"
                    metaText="Increased from last month"
                  />
                  <StatCard
                    title="Running Projects"
                    titleClassName="text-[24px] font-semibold text-slate-900"
                    value={runningProjects}
                    metaBadge="2+"
                    metaText="Increased from last month"
                  />
                  <StatCard
                    title="Pending Project"
                    titleClassName="text-[24px] font-semibold text-slate-900"
                    value={pendingProjects}
                    metaText="On Discuss"
                  />
                </div>

                {/* Row 2 */}
                <div className="rounded-3xl bg-white p-4 shadow-sm md:col-span-2 lg:col-span-1 h-[300px] w-[573px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[24px] font-semibold text-slate-900">Project Analytics</p>
                  </div>
                  <div className="mt-16">
                    <img src="/date.png" alt="Project analytics" className="h-auto w-full" />
                  </div>
                  <div className="mt-1 grid grid-cols-7 place-items-center text-[15px] text-slate-400">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                      <span key={`${day}-${idx}`} className="text-center">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm ml-17  h-[300px] w-[281px] ">
                  <p className="text-[24px] font-semibold text-slate-900">Reminders</p>
                  <p className="mt-4 text-[30px] font-semibold leading-[1.1] text-emerald-900">
                    Meeting with Arc
                    <br />
                    Company
                  </p>
                  <p className="mt-2 text-[13px] text-slate-400">Time : 02.00 pm - 04.00 pm</p>

                  <button className="mt-6 h-14 inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-800 py-3 text-[14px] font-medium text-white">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 10l4.5-3v10L15 14v-4z" />
                        <rect x="3" y="7" width="12" height="10" rx="2" />
                      </svg>
                    </span>
                    Start Meeting
                  </button>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm w-[273px] ml-10 h-[375px]">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[24px] font-semibold text-slate-900">Project</p>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-hidden="true">
                        +
                      </span>
                      New
                    </button>
                  </div>

                  <div className="space-y-4">
                    {projectItems.map((project, index) => (
                      <div key={project.id} className="flex items-center gap-3">
                        <ProjectItemIcon index={index} />
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-semibold text-slate-900">{project.title}</p>
                          <p className="text-[11px] text-slate-400">Due date: {project.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="rounded-3xl bg-white p-5 shadow-sm lg:col-span-1 w-[480px] ">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[24px] font-semibold text-slate-900">Team Collaboration</p>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-hidden="true">
                        +
                      </span>
                      Add Member
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Alexandra Deff", task: "Github Project Repository", status: "Completed", tone: "emerald" },
                      { name: "Edwin Adenike", task: "Integrate User Authentication System", status: "In Progress", tone: "amber" },
                      { name: "Isaac Oluwatemilour", task: "Develop Search and Filter Functionality", status: "Pending", tone: "rose" },
                      { name: "David Oshof", task: "Responsive Layout for Homepage", status: "In Progress", tone: "amber" },
                    ].map((member, idx) => (
                      <div key={member.name} className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold ${idx % 2 === 0 ? "bg-rose-200 text-rose-700" : "bg-emerald-200 text-emerald-800"
                              }`}
                            aria-hidden="true"
                          >
                            {member.name
                              .split(" ")
                              .map((p) => p[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold text-slate-900">{member.name}</p>
                            <p className="truncate text-[12px] text-slate-400">
                              Working on <span className="font-semibold text-slate-700">{member.task}</span>
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ring-1 ring-inset ${member.tone === "emerald"
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                              : member.tone === "amber"
                                ? "bg-amber-50 text-amber-700 ring-amber-200"
                                : "bg-rose-50 text-rose-700 ring-rose-200"
                            }`}
                        >
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm lg:col-span-1 w-[300px] mr-7">
                  <div className="flex items-center justify-between">
                    <p className="text-[24px] font-semibold text-slate-900">Project Progress</p>
                  </div>

                  <div className="relative mt-4 flex items-center justify-center">
                    <img src="/progress.png" alt="Project progress" className="h-auto w-full" />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-[44px] font-semibold leading-none text-slate-900">41%</p>
                      <p className="mt-1 text-[13px] text-slate-400">Project Ended</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[12px] text-slate-500">
                    <LegendDot color="bg-emerald-600" label="Completed" />
                    <LegendDot color="bg-emerald-900" label="In Progress" />
                    <LegendDot striped label="Pending" />
                  </div>
                </div>

                <div
                  className="relative overflow-hidden rounded-3xl bg-emerald-950 p-5 w-[275px] text-white shadow-sm lg:col-span-1"
                  style={{ backgroundImage: "url(/time.png)", backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0 bg-emerald-950/35" />
                  <div className="relative">
                    <p className="text-[24px] font-semibold text-white/90">Time Tracker</p>
                    <p className="mt-5 text-center text-[40px] font-semibold tracking-wide text-white">01:24:08</p>

                    <div className="mt-6 flex items-center justify-center gap-4">
                      <button
                        type="button"
                        aria-label="Pause"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                          <path d="M7 5h3v14H7V5zm7 0h3v14h-3V5z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        aria-label="Stop"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                          <path d="M7 7h10v10H7V7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {loading && (
                <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center">
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-[11px] text-slate-100 shadow-lg">
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                    Syncing dashboard data...
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );

}

function StatCard({ title, titleClassName, value, metaBadge, metaText, featured = false, featuredBg }) {
  const hasFeaturedBg = featured && Boolean(featuredBg);
  const containerClass = featured ? "text-white" : "bg-white text-slate-900 ring-1 ring-inset ring-slate-200/60";
  const titleClass = featured ? "text-white/85" : "text-slate-900";
  const valueClass = featured ? "text-white" : "text-slate-900";
  const buttonClass = featured ? "border-white/0 bg-white text-slate-900" : "border-slate-200 bg-white text-slate-700";
  const metaTextClass = featured ? "text-emerald-100/90" : "text-emerald-600";
  const metaBadgeClass = featured ? "bg-white/15 text-emerald-50" : "bg-emerald-50 text-emerald-700";

  return (
    <div
      className={`rounded-3xl p-5 shadow-sm ${containerClass}`}
      style={hasFeaturedBg ? { background: featuredBg } : undefined}
    >
      <div className="flex items-start justify-between">
        <p className={`text-[14px] font-medium ${titleClass} ${titleClassName ?? ""}`}>{title}</p>
        <button
          type="button"
          className={`flex h-8 w-8 items-center justify-center rounded-full border ${buttonClass}`}
          aria-label={`${title} details`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M10 7h7v7" />
          </svg>
        </button>
      </div>

      <p className={`mt-4 text-[44px] font-semibold leading-none tracking-tight ${valueClass}`}>{value}</p>

      <div className={`mt-3 flex items-center gap-2 text-[12px] font-medium ${metaTextClass}`}>
        {metaBadge ? (
          <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${metaBadgeClass}`}>{metaBadge}</span>
        ) : null}
        <span className="text-[12px]">{metaText}</span>
      </div>
    </div>
  );
}

function LegendDot({ color, label, striped = false }) {
  return (
    <div className="flex items-center gap-2">
      {striped ? (
        <span
          className="h-3 w-3 rounded-full ring-1 ring-inset ring-slate-300"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(15,23,42,0.25) 0px, rgba(15,23,42,0.25) 3px, rgba(255,255,255,0) 3px, rgba(255,255,255,0) 6px)",
            backgroundColor: "rgba(148,163,184,0.2)",
          }}
        />
      ) : (
        <span className={`h-3 w-3 rounded-full ${color}`} />
      )}
      <span>{label}</span>
    </div>
  );
}

function ProjectItemIcon({ index }) {
  const baseClass = "h-10 w-10 shrink-0";

  if (index === 0) {
    return (
      <div className={`${baseClass} text-indigo-600`} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor">
          <path d="M6 7.5l5-3M6 12l9-5M6 16.5l12-6.5" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M16 5.5h3.5V9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={`${baseClass} text-emerald-600`} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor">
          <path d="M12 22s8-4.5 8-12V5l-8-3-8 3v5c0 7.5 8 12 8 12z" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-5" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className={`${baseClass} text-teal-600`} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor">
          <path d="M12 3v18" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M3 12h18" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M7 7h10v10H7z" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className={`${baseClass} text-amber-600`} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${baseClass} text-violet-600`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor">
        <path d="M4 7h16" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M4 12h16" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M4 17h10" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M18 15l2 2 4-4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}


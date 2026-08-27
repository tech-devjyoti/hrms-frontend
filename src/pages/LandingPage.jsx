const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
              H
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              HRMS
            </h1>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              About
            </a>

            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
              Login
            </button>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
              Get Started
            </button>
          </nav>

          <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:hidden">
            Menu
          </button>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:flex lg:items-center lg:gap-16 lg:py-32">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Human Resource Management
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Manage your workforce
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  with confidence.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A simple and scalable HR management platform to manage
                employees, attendance, leave, and everyday HR operations
                from one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700">
                  Get Started
                </button>

                <a
                  href="#features"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                >
                  Explore Features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <span>✓ Employee Management</span>
                <span>✓ Attendance</span>
                <span>✓ Leave Management</span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-14 flex-1 lg:mt-0">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-200/50 to-indigo-200/50 blur-2xl" />

                <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        HR Overview
                      </p>

                      <h3 className="mt-1 text-xl font-semibold">
                        Workforce Dashboard
                      </h3>
                    </div>

                    <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600">
                      This Month
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DashboardCard
                      title="Employees"
                      value="248"
                      icon="👥"
                      iconClass="bg-blue-50 text-blue-600"
                    />

                    <DashboardCard
                      title="Present Today"
                      value="231"
                      icon="✓"
                      iconClass="bg-emerald-50 text-emerald-600"
                    />

                    <DashboardCard
                      title="On Leave"
                      value="12"
                      icon="◷"
                      iconClass="bg-amber-50 text-amber-600"
                    />

                    <DashboardCard
                      title="Departments"
                      value="14"
                      icon="▦"
                      iconClass="bg-indigo-50 text-indigo-600"
                    />
                  </div>

                  <div className="mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                    <p className="text-sm text-blue-100">
                      Workforce overview
                    </p>

                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold">93.1%</p>
                        <p className="mt-1 text-xs text-blue-100">
                          Attendance rate
                        </p>
                      </div>

                      <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">
                        +4.2%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-slate-200 bg-white px-6 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Features
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage your workforce.
              </h2>

              <p className="mt-4 text-slate-600">
                Start with the essentials and expand your HR operations
                as your organization grows.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon="👥"
                title="Employee Management"
                description="Maintain employee information, roles, departments, and employment details in one centralized system."
                iconClass="bg-blue-50 text-blue-600"
              />

              <FeatureCard
                icon="✓"
                title="Attendance"
                description="Track employee attendance and maintain a clear view of workforce availability."
                iconClass="bg-emerald-50 text-emerald-600"
              />

              <FeatureCard
                icon="◷"
                title="Leave Management"
                description="Manage leave requests, approvals, balances, and employee leave history."
                iconClass="bg-indigo-50 text-indigo-600"
              />

              <FeatureCard
                icon="▦"
                title="Departments"
                description="Organize employees into departments and maintain a structured workforce."
                iconClass="bg-blue-50 text-blue-600"
              />

              <FeatureCard
                icon="▣"
                title="HR Dashboard"
                description="Get a quick overview of important workforce information and HR activities."
                iconClass="bg-indigo-50 text-indigo-600"
              />

              <FeatureCard
                icon="↗"
                title="Scalable Platform"
                description="Built with a foundation that can grow alongside your organization."
                iconClass="bg-blue-50 text-blue-600"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Simple by design
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              HR management without unnecessary complexity.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-600">
              HR teams should spend their time managing people, not
              fighting complicated software. HRMS focuses on providing
              the tools your organization actually needs while keeping
              the experience straightforward.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-20 text-white sm:py-24">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to simplify your HR operations?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Create your organization and start managing your workforce
              from one place.
            </p>

            <button className="mt-8 rounded-lg bg-white px-6 py-3 font-medium text-blue-700 shadow-sm transition hover:bg-blue-50">
              Get Started
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-8 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
              H
            </div>

            <span className="font-semibold text-white">
              HRMS
            </span>
          </div>

          <p className="text-sm">
            © 2026 HRMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  iconClass,
}) => {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg text-lg ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
  iconClass,
}) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default LandingPage;
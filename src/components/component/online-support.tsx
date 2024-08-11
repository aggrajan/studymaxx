import { Button } from "../ui/button";

export function OnlineSupport() {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
      <div className="flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
        <div className="space-y-2 mb-0 sm:mb-5 md:mb-8 lg:mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Online Support</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover our top-selling and most popular books across various genres.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-md border bg-background p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary p-3 text-primary-foreground">
                  <SchoolIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Student Support</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Get help with assignments, study tips, and more. Our team is available to assist you 24/7.
              </p>
            </div>
            <Button className="mt-4 w-auto mx-auto">Get Support</Button>
          </div>
          <div className="rounded-md border bg-background p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-secondary p-3 text-secondary-foreground">
                  <SchoolIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Teacher Support</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Access lesson plans, grading tools, and professional development resources. We&apos;re here to help you succeed.
              </p>
            </div>
            <Button className="mt-4 w-auto mx-auto">Get Support</Button>
          </div>
          <div className="rounded-md border bg-background p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-muted p-3 text-muted-foreground">
                  <BabyIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Parent Support</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Get guidance on supporting your child&apos;s learning, managing schedules, and more. We&apos;re here for you.
              </p>
            </div>
            <Button className="mt-4 w-auto mx-auto">Get Support</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BabyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>
  );
}

function SchoolIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M18 5v17" />
      <path d="m4 6 8-4 8 4" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

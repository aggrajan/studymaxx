import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-blue-700 text-gray-300 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container max-w-[100rem]">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <BookIcon className="h-6 w-6" />
            <span className="text-xl font-bold">StudyMaxx</span>
          </Link>
          <p className="text-sm">Discover your next great read with our curated selection of books.</p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Facebook" prefetch={false}>
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter" prefetch={false}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512" className="fill-current text-gray-300"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
            </Link>
            <Link href="#" aria-label="Instagram" prefetch={false}>
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn" prefetch={false}>
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
          <div className="grid gap-2">
            <h4 className="text-sm font-medium">Information</h4>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              <span className="text-sm">+1 (555) 555-5555</span>
            </div>
            <div className="flex items-center gap-2">
              <MailOpenIcon className="h-5 w-5" />
              <span className="text-sm">info@studymaxx.com</span>
            </div>
            <div className="flex items-center gap-2">
              <LocateIcon className="h-5 w-5" />
              <span className="text-sm">123 Main St, Anytown USA</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">Quick Links</h4>
            <Link href="/" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Home
            </Link>
            <Link href="/mission" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Vision
            </Link>
            <Link href="/faq" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              FAQs
            </Link>
            <Link href="/#contact-us" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">Information</h4>
            <Link href="/policy#privacy-policy" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="/policy#terms-and-conditions" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Terms and Conditions
            </Link>
            <Link href="/policy#return-policy" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Return Policy
            </Link>
            <Link href="/policy#refund-policy" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Refund Policy
            </Link>
            <Link href="/policy#shipping-policy" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Shipping Policy
            </Link>
            <Link href="/policy#cancellation-policy" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Cancellation Policy
            </Link>
            <Link href="/policy#disclaimer" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              Disclaimer
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">Contact Info</h4>
            <Link href="#" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              [Address]
            </Link>
            <Link href="#" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              [Phone]
            </Link>
            <Link href="#" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
              [Mail]
            </Link>
          </div>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 flex items-center justify-between px-4 md:px-0">
        <p className="text-sm">&copy; 2024 StudyMaxx. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/policy#privacy-policy" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="/policy#terms-and-conditions" className="text-sm hover:underline hover:underline-offset-2" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  )
}

function BookIcon(props: any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function FacebookIcon(props: any) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: any) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: any) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function LocateIcon(props: any) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function MailOpenIcon(props: any) {
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
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  )
}


function PhoneIcon(props: any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

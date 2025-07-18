import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100 relative overflow-hidden">
      {/* Subtle background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 container max-w-[100rem] px-6 md:px-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-6">
            <Link href="/" className="flex items-center gap-3 group" prefetch={false}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <Image 
                  src="/image copy.png" 
                  alt="StudyMaxx Logo" 
                  width={100} 
                  height={100} 
                  className="relative rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>
            
            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              Discover your next great read with our curated selection of educational books and study materials.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <Link href="#" aria-label="Facebook" prefetch={false} className="group">
                <div className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 border border-gray-700 hover:border-blue-500">
                  <FacebookIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
              <Link href="#" aria-label="Twitter" prefetch={false} className="group">
                <div className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 border border-gray-700 hover:border-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 512 512" className="fill-current text-gray-400 group-hover:text-white transition-colors duration-300">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Instagram" prefetch={false} className="group">
                <div className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 border border-gray-700 hover:border-pink-500">
                  <InstagramIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
              <Link href="#" aria-label="LinkedIn" prefetch={false} className="group">
                <div className="w-8 h-8 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 border border-gray-700 hover:border-blue-600">
                  <LinkedinIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                Get in Touch
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 border border-gray-700">
                    <PhoneIcon className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">+91 9211477740</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 border border-gray-700">
                    <MailOpenIcon className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">info@studymaxx.in</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mt-1 border border-gray-700">
                    <LocateIcon className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    146, Deepali, Pitampura, New Delhi-110034
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                Quick Links
              </h4>
              <div className="space-y-3">
                <Link href="/" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Home
                  </span>
                </Link>
                <Link href="/mission" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Mission
                  </span>
                </Link>
                <Link href="/#contact-us" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Contact
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                Policies
              </h4>
              <div className="space-y-3">
                <Link href="/policy#privacy-policy" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Privacy Policy
                  </span>
                </Link>
                <Link href="/policy#terms-and-conditions" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Terms & Conditions
                  </span>
                </Link>
                <Link href="/policy#return-policy" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Return Policy
                  </span>
                </Link>
                <Link href="/policy#refund-policy" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Refund Policy
                  </span>
                </Link>
                <Link href="/policy#shipping-policy" className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group" prefetch={false}>
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    Shipping Policy
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                Contact Info
              </h4>
              <div className="space-y-3">
                <div className="text-gray-400 leading-relaxed text-sm">
                  146, Deepali, Pitampura, New Delhi-110034
                </div>
                <div className="text-gray-400 text-sm">
                  +91 9211477740
                </div>
                <div className="text-gray-400 text-sm">
                  info@studymaxx.in
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="relative mt-16 pt-8 border-t border-gray-800">
          <div className="container max-w-7xl px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <p className="text-gray-500 text-sm">&copy; 2025 StudyMaxx. All rights reserved.</p>
              </div>
              <nav className="flex items-center gap-6">
                <Link href="/policy#privacy-policy" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm" prefetch={false}>
                  Privacy Policy
                </Link>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <Link href="/policy#terms-and-conditions" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm" prefetch={false}>
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
        </div>
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
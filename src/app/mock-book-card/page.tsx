import { ItemCard } from "@/components/component/item-card";
import { Book } from "@/model/Books";

export default function MockBookCardPage() {
  // Sample book data to showcase the design
  const sampleBooks: Book[] = [
    {
      _id: "mock-1",
      title: "Advanced Mathematics for Class 12 - Complete Guide with Practice Problems",
      image: "https://m.media-amazon.com/images/I/71hFMH9hZLL._SL1400_.jpg",
      authors: [
        { name: "R. S. Aggarwal" },
        { name: "Dr. Mathematics Expert" }
      ],
      price: 599,
      discount: 25,
      level: "Class 12",
      subject: "Mathematics",
      board: "CBSE",
      exam: "JEE Main",
      keywords: ["Mathematics", "Class 12", "JEE", "CBSE"],
      language: "English",
      isbn: "9780123456789",
      number_of_pages: 450,
      year: 2024,
      size: "A4",
      binding: "Paperback",
      category: "School",
      about: ["Comprehensive mathematics guide for Class 12 students"],
      salient_features: ["Step-by-step solutions", "Practice problems"],
      useful_for: ["Class 12 students", "JEE aspirants"],
      additional_support: ["Online resources"],
      latest: true,
      pdfUrl: "",
      outOfStock: false,
      previewImages: []
    } as Book,
    {
      _id: "mock-2",
      title: "Quantitative Aptitude for Competitive Exams",
      image: "https://m.media-amazon.com/images/I/81GRND3kghL._SY342_.jpg",
      authors: [
        { name: "R. S. Aggarwal" }
      ],
      price: 450,
      discount: 0,
      level: "Class 12",
      subject: "Mathematics",
      board: "",
      exam: "SSC",
      keywords: ["Quantitative", "Aptitude", "SSC", "Banking"],
      language: "English",
      isbn: "9780987654321",
      number_of_pages: 600,
      year: 2023,
      size: "A4",
      binding: "Paperback",
      category: "Competitive Exam",
      about: ["Complete guide for quantitative aptitude"],
      salient_features: ["Solved examples", "Mock tests"],
      useful_for: ["SSC aspirants", "Banking exam candidates"],
      additional_support: [],
      latest: false,
      pdfUrl: "",
      outOfStock: false,
      previewImages: []
    } as Book,
    {
      _id: "mock-3",
      title: "Physics Fundamentals - Theory and Practice",
      image: "https://m.media-amazon.com/images/I/51SxR1hH27L._SY445_SX342_.jpg",
      authors: [
        { name: "Dr. Physics Master" }
      ],
      price: 750,
      discount: 15,
      level: "Class 11",
      subject: "Physics",
      board: "CBSE",
      exam: "NEET",
      keywords: ["Physics", "Class 11", "NEET", "Theory"],
      language: "English",
      isbn: "9780456789123",
      number_of_pages: 520,
      year: 2024,
      size: "A4",
      binding: "Hardcover",
      category: "School",
      about: ["Comprehensive physics guide with theory and practice"],
      salient_features: ["Detailed explanations", "Diagrams"],
      useful_for: ["Class 11 students", "NEET aspirants"],
      additional_support: ["Video lectures"],
      latest: false,
      pdfUrl: "",
      outOfStock: true,
      previewImages: []
    } as Book,
    {
      _id: "mock-4",
      title: "English Grammar and Composition - Complete Course",
      image: "https://m.media-amazon.com/images/I/41abBFFE47L._SY342_.jpg",
      authors: [
        { name: "Prof. English Expert" },
        { name: "Dr. Grammar Specialist" }
      ],
      price: 399,
      discount: 30,
      level: "Class 10",
      subject: "English",
      board: "CBSE",
      exam: "",
      keywords: ["English", "Grammar", "Composition", "Class 10"],
      language: "English",
      isbn: "9780789123456",
      number_of_pages: 350,
      year: 2024,
      size: "A5",
      binding: "Paperback",
      category: "School",
      about: ["Complete English grammar and composition guide"],
      salient_features: ["Easy explanations", "Practice exercises"],
      useful_for: ["Class 10 students", "English learners"],
      additional_support: ["Audio pronunciation guide"],
      latest: true,
      pdfUrl: "",
      outOfStock: false,
      previewImages: []
    } as Book
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Enhanced Book Card Design Preview
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Here's a preview of the improved book card design with various states including discounts, new arrivals, and out of stock items.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {sampleBooks.map((book) => (
            <div key={book._id} className="transform hover:scale-105 transition-transform duration-300">
              <ItemCard book={book} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Design Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">Visual Enhancements</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Gradient backgrounds and shadows</li>
                  <li>• Smooth hover animations</li>
                  <li>• Modern rounded corners</li>
                  <li>• Enhanced typography</li>
                  <li>• Better color schemes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-600 mb-2">Interactive Elements</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Hover scale effects</li>
                  <li>• Animated buttons</li>
                  <li>• Tooltip interactions</li>
                  <li>• Smooth transitions</li>
                  <li>• Better feedback states</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Content Display</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Better price display</li>
                  <li>• Enhanced discount badges</li>
                  <li>• "NEW" arrival indicators</li>
                  <li>• Out of stock overlays</li>
                  <li>• Improved text truncation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-orange-600 mb-2">User Experience</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Intuitive cart controls</li>
                  <li>• Wishlist integration</li>
                  <li>• Admin edit access</li>
                  <li>• Responsive design</li>
                  <li>• Accessibility improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
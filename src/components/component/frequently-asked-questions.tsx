import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function FrequentlyAskedQuestions() {
  return (
    <div>
      <section className="bg-primary py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-primary-foreground">
              Get answers to all your questions about purchasing math books online.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-lg font-medium">
                  What are your shipping options and timelines?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We offer several shipping options to ensure your math books arrive quickly and safely:</p>
                    <ul className="list-disc space-y-2 pl-6">
                      <li>Standard Shipping (5-10 business days): Free for orders over $50</li>
                      <li>Express Shipping (2-3 business days): $9.99</li>
                      <li>Next-Day Delivery (1 business day): $19.99</li>
                    </ul>
                    <p>
                      All orders are shipped from our warehouse within 1-2 business days. Please note that delivery
                      times may vary depending on your location.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="text-lg font-medium">What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We want you to be completely satisfied with your purchase. If for any reason you are not happy
                      with your math books, you can return them within 30 days of delivery for a full refund.
                    </p>
                    <p>
                      To initiate a return, please contact our customer support team at support@mathbooks.com or
                      1-800-123-4567. We will provide you with a prepaid return label and instructions on how to send
                      the items back to us.
                    </p>
                    <p>
                      Please note that the books must be in their original condition and packaging to be eligible for a
                      refund. We cannot accept returns on damaged, used, or personalized items.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payments">
                <AccordionTrigger className="text-lg font-medium">What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We accept a variety of payment methods to make your shopping experience as convenient as possible:
                    </p>
                    <ul className="list-disc space-y-2 pl-6">
                      <li>Visa</li>
                      <li>Mastercard</li>
                      <li>American Express</li>
                      <li>Discover</li>
                      <li>PayPal</li>
                      <li>Apple Pay</li>
                      <li>Google Pay</li>
                    </ul>
                    <p>
                      All transactions are processed securely to protect your personal and financial information. If you
                      have any questions or concerns about our payment options, please don&apos;t hesitate to contact our
                      customer support team.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="recommendations">
                <AccordionTrigger className="text-lg font-medium">
                  Can you recommend some math books for me?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Absolutely! Our team of math experts has carefully curated a selection of the best math books for
                      students, teachers, and enthusiasts. Here are a few recommendations based on your needs:
                    </p>
                    <ul className="list-disc space-y-2 pl-6">
                      <li>
                        <strong>For Beginners:</strong> &quot;Math for Everyone&quot; by Jane Doe - A comprehensive introduction
                        to the fundamental concepts of mathematics.
                      </li>
                      <li>
                        <strong>For Students:</strong> &quot;Algebra Essentials&quot; by John Smith - A step-by-step guide to
                        mastering algebra, with plenty of practice problems and real-world applications.
                      </li>
                      <li>
                        <strong>For Teachers:</strong> &quot;Engaging Math Lessons&quot; by Sarah Johnson - A collection of
                        innovative teaching strategies and lesson plans to make math fun and engaging for students.
                      </li>
                      <li>
                        <strong>For Enthusiasts:</strong> &quot;The Beauty of Mathematics&quot; by Alex Lee - A captivating
                        exploration of the hidden patterns and elegance of mathematics.
                      </li>
                    </ul>
                    <p>
                      If you need any other recommendations or have specific requirements, please feel free to contact
                      our customer support team, and we&apos;ll be happy to assist you.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="other">
                <AccordionTrigger className="text-lg font-medium">Do you have any other questions?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      If you have any other questions or concerns that haven&apos;t been addressed, please don&apos;t hesitate to
                      reach out to our customer support team. We&apos;re here to help and ensure you have a seamless shopping
                      experience.
                    </p>
                    <p>
                      You can contact us by email at support@mathbooks.com or by phone at 1-800-123-4567. Our support
                      team is available Monday to Friday, 9 AM to 5 PM EST.
                    </p>
                    <p>
                      We&apos;re committed to providing excellent customer service and helping you find the perfect math
                      books for your needs. Thank you for choosing MathBooks!
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

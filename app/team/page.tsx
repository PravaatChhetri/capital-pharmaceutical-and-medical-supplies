import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Linkedin, Mail, Phone } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Chief Executive Officer",
    bio: "Dr. Johnson brings over 20 years of pharmaceutical industry experience, leading our company's vision for innovative healthcare solutions.",
    image: "/images/team/ceo.jpg",
    email: "sarah.johnson@capitalpms.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    phone: "+975-17598338",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Chief Operating Officer",
    bio: "Michael oversees our global operations and supply chain, ensuring efficient delivery of medical supplies worldwide.",
    image: "/images/team/coo.jpg",
    email: "michael.chen@capitalpms.com",
    linkedin: "https://linkedin.com/in/michaelchen",
    phone: "+975-77399393",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Chief Medical Officer",
    bio: "Dr. Rodriguez leads our medical affairs team, ensuring all products meet the highest clinical and safety standards.",
    image: "/images/team/cmo.jpg",
    email: "emily.rodriguez@capitalpms.com",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    phone: "+975-17646431",
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Chief Technology Officer",
    bio: "David drives our digital transformation initiatives and oversees the development of innovative healthcare technologies.",
    image: "/images/team/cto.jpg",
    email: "david.thompson@capitalpms.com",
    linkedin: "https://linkedin.com/in/davidthompson",
    phone: "+975-77646431",
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    title: "Head of Quality Assurance",
    bio: "Dr. Wang ensures all our products meet international quality standards and regulatory compliance requirements.",
    image: "/images/team/qa-head.jpg",
    email: "lisa.wang@capitalpms.com",
    linkedin: "https://linkedin.com/in/lisawang",
    phone: "+975-17598338",
  },
  {
    id: 6,
    name: "Robert Martinez",
    title: "Director of Sales",
    bio: "Robert leads our global sales team, building strong relationships with healthcare providers and distributors.",
    image: "/images/team/sales-director.jpg",
    email: "robert.martinez@capitalpms.com",
    linkedin: "https://linkedin.com/in/robertmartinez",
    phone: "+975-77399393",
  },
  {
    id: 7,
    name: "Dr. Jennifer Kim",
    title: "Head of Research & Development",
    bio: "Dr. Kim leads our R&D efforts, focusing on developing next-generation pharmaceutical and medical device solutions.",
    image: "/images/team/rd-head.jpg",
    email: "jennifer.kim@capitalpms.com",
    linkedin: "https://linkedin.com/in/jenniferkim",
    phone: "+975-17646431",
  },
  {
    id: 8,
    name: "Mark Anderson",
    title: "Chief Financial Officer",
    bio: "Mark oversees our financial operations and strategic planning, ensuring sustainable growth and fiscal responsibility.",
    image: "/images/team/cfo.jpg",
    email: "mark.anderson@capitalpms.com",
    linkedin: "https://linkedin.com/in/markanderson",
    phone: "+975-77646431",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who drive our mission to provide exceptional pharmaceutical and medical
            supply solutions worldwide.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`mailto:${member.email}`}>
                            <Mail className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={member.linkedin} target="_blank">
                            <Linkedin className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`tel:${member.phone}`}>
                            <Phone className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Leadership Message</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
              <blockquote className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 italic">
                "At Capital Pharmaceutical & Medical Supplies, our team is united by a shared commitment to advancing
                healthcare through quality, innovation, and integrity. Every member of our organization plays a vital
                role in ensuring that healthcare providers have access to the medical supplies and pharmaceuticals they
                need to deliver exceptional patient care."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <Image
                  src="/images/team/ceo.jpg"
                  alt="Dr. Sarah Johnson"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-gray-900">Dr. Sarah Johnson</p>
                  <p className="text-blue-600">Chief Executive Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Are you passionate about healthcare and making a difference? We're always looking for talented individuals
            to join our mission.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">View Open Positions</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

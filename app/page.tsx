"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Gift, Mail, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"

export default function WeddingLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [days, setDays] = useState(85)
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(45)
  const [seconds, setSeconds] = useState(30)

  // Intersection Observer for animations
  const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting)
      }, options)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, [ref, options])

    return [ref, isInView]
  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        setSeconds(59)
        if (minutes > 0) {
          setMinutes(minutes - 1)
        } else {
          setMinutes(59)
          if (hours > 0) {
            setHours(hours - 1)
          } else {
            setHours(23)
            if (days > 0) {
              setDays(days - 1)
            }
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [days, hours, minutes, seconds])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Refs for sections
  const [coupleRef, coupleInView] = useInView({ threshold: 0.2 })
  const [detailsRef, detailsInView] = useInView({ threshold: 0.2 })
  const [rsvpRef, rsvpInView] = useInView({ threshold: 0.2 })
  const [galleryRef, galleryInView] = useInView({ threshold: 0.2 })
  const [registryRef, registryInView] = useInView({ threshold: 0.2 })

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrollY > 50 ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="#home" className="font-serif text-xl tracking-wide">
            S <span className="text-xs">&</span> M
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["home", "couple", "details", "rsvp", "gallery", "registry"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="text-sm uppercase tracking-widest hover:text-black/60 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {["home", "couple", "details", "rsvp", "gallery", "registry"].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-sm uppercase tracking-widest py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
          }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <Image
              src="/wedding-landing/placeholder.svg?height=1080&width=1920"
              alt="Wedding background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">Sarah & Michael</h1>
            <div className="h-px w-16 bg-white/60 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-12 font-light tracking-widest uppercase">August 12, 2025</p>
            <Button asChild className="bg-white text-black hover:bg-white/90 border-none rounded-none px-8 py-6">
              <a href="#rsvp" className="text-sm tracking-widest uppercase">
                RSVP
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Countdown Section */}
        <section className="py-20 bg-black text-white">
          <div className="container">
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-light">{days.toString().padStart(2, "0")}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/70">Days</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-light">{hours.toString().padStart(2, "0")}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/70">Hours</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-light">{minutes.toString().padStart(2, "0")}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/70">Minutes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-light">{seconds.toString().padStart(2, "0")}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/70">Seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Couple Section */}
        <motion.section
          ref={coupleRef as React.Ref<HTMLElement>} // Sửa lại kiểu cho đúng
          initial="hidden"
          animate={coupleInView ? "visible" : "hidden"}
          variants={fadeIn}
          id="couple"
          className="py-24 bg-white"
        >
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl mb-4">Our Story</h2>
              <div className="h-px w-12 bg-black/20 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="relative aspect-[3/4] overflow-hidden mb-8">
                  <Image src="/wedding-landing/placeholder.svg?height=600&width=450" alt="Bride" fill className="object-cover" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Sarah Johnson</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">The Bride</p>
                <p className="text-gray-600">
                  Sarah is a kindergarten teacher with a passion for art and nature. Her warm smile and compassionate
                  heart are what drew Michael to her from the very beginning.
                </p>
              </div>
              <div>
                <div className="relative aspect-[3/4] overflow-hidden mb-8">
                  <Image src="/wedding-landing/placeholder.svg?height=600&width=450" alt="Groom" fill className="object-cover" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Michael Thompson</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">The Groom</p>
                <p className="text-gray-600">
                  Michael is an architect who finds beauty in simplicity and structure. His thoughtfulness and quiet
                  confidence are what Sarah admires most about him.
                </p>
              </div>
            </div>
            <div className="mt-20 max-w-2xl mx-auto text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                We met at a gallery opening in the spring of 2020. After discussing our shared appreciation for
                minimalist design and Italian cuisine, we knew there was something special between us. Our first date
                was at a small bistro overlooking the city, and we've been inseparable ever since.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Michael proposed during a private moment at sunset on the coast of Santorini during our vacation. With a
                vintage ring and a heartfelt promise, Sarah said yes without hesitation.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Details Section */}
        <motion.section
          ref={detailsRef as React.Ref<HTMLElement>}
          initial="hidden"
          animate={detailsInView ? "visible" : "hidden"}
          variants={fadeIn}
          id="details"
          className="py-24 bg-gray-50"
        >
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl mb-4">Event Details</h2>
              <div className="h-px w-12 bg-black/20 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={detailsInView ? "visible" : "hidden"}
                className="space-y-12"
              >
                <motion.div variants={item}>
                  <h3 className="font-serif text-2xl mb-4">Ceremony</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">August 12, 2025</p>
                        <p className="text-gray-500 text-sm">Tuesday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">4:00 PM</p>
                        <p className="text-gray-500 text-sm">Doors open at 3:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">The Glass Pavilion</p>
                        <p className="text-gray-500 text-sm">123 Blossom Lane, Meadowville</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={item}>
                  <h3 className="font-serif text-2xl mb-4">Reception</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">August 12, 2025</p>
                        <p className="text-gray-500 text-sm">Following the ceremony</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">6:00 PM - 11:00 PM</p>
                        <p className="text-gray-500 text-sm">Dinner served at 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">The Grand Ballroom</p>
                        <p className="text-gray-500 text-sm">Same location as ceremony</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <div className="relative h-full min-h-[400px] overflow-hidden">
                <Image src="/wedding-landing/placeholder.svg?height=800&width=600" alt="Venue" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
            <div className="mt-20 bg-white p-12 shadow-sm">
              <h3 className="font-serif text-2xl mb-6 text-center">Accommodations</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-2">The Grand Hotel</h4>
                  <p className="text-gray-500 text-sm mb-2">0.5 miles from venue</p>
                  <p className="text-sm mb-4">Use code "SM2025" for 15% discount</p>
                  <Button variant="outline" className="rounded-none text-xs">
                    Book Now
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Riverside Boutique Hotel</h4>
                  <p className="text-gray-500 text-sm mb-2">1.2 miles from venue</p>
                  <p className="text-sm mb-4">Use code "SM2025" for 10% discount</p>
                  <Button variant="outline" className="rounded-none text-xs">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RSVP Section */}
        <motion.section
          ref={rsvpRef as React.Ref<HTMLElement>}
          initial="hidden"
          animate={rsvpInView ? "visible" : "hidden"}
          variants={fadeIn}
          id="rsvp"
          className="py-24 bg-white"
        >
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl mb-4">RSVP</h2>
              <div className="h-px w-12 bg-black/20 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-xl mx-auto">Please respond by July 12, 2025</p>
            </div>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-xs uppercase tracking-wider">
                    First Name
                  </Label>
                  <Input id="first-name" className="rounded-none border-gray-200 focus:border-black focus:ring-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-xs uppercase tracking-wider">
                    Last Name
                  </Label>
                  <Input id="last-name" className="rounded-none border-gray-200 focus:border-black focus:ring-0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="rounded-none border-gray-200 focus:border-black focus:ring-0"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider">Will you be attending?</Label>
                <RadioGroup defaultValue="yes" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="attending-yes" />
                    <Label htmlFor="attending-yes" className="text-sm">
                      Joyfully Accept
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="attending-no" />
                    <Label htmlFor="attending-no" className="text-sm">
                      Regretfully Decline
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-xs uppercase tracking-wider">
                  Number of Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="5"
                  defaultValue="1"
                  className="rounded-none border-gray-200 focus:border-black focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal" className="text-xs uppercase tracking-wider">
                  Meal Preference
                </Label>
                <select
                  id="meal"
                  className="w-full h-10 rounded-none border border-gray-200 focus:border-black focus:ring-0 px-3 py-2"
                >
                  <option value="">Select an option</option>
                  <option value="chicken">Chicken</option>
                  <option value="beef">Beef</option>
                  <option value="fish">Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-wider">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  className="min-h-[100px] rounded-none border-gray-200 focus:border-black focus:ring-0"
                />
              </div>
              <Button className="w-full bg-black hover:bg-black/90 text-white rounded-none">
                <span className="text-xs uppercase tracking-wider">Submit RSVP</span>
              </Button>
            </form>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          ref={galleryRef as React.Ref<HTMLElement>}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          variants={fadeIn}
          id="gallery"
          className="py-24 bg-gray-50"
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl mb-4">Gallery</h2>
              <div className="h-px w-12 bg-black/20 mx-auto"></div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              className="grid grid-cols-2 md:grid-cols-4 gap-1"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={`/wedding-landing/placeholder.svg?height=500&width=500&text=${i + 1}`}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Registry Section */}
        <motion.section
          ref={registryRef as React.Ref<HTMLElement>}
          initial="hidden"
          animate={registryInView ? "visible" : "hidden"}
          variants={fadeIn}
          id="registry"
          className="py-24 bg-white"
        >
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl mb-4">Registry</h2>
              <div className="h-px w-12 bg-black/20 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-xl mx-auto">
                Your presence is our present. However, if you wish to honor us with a gift, we've registered at:
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={registryInView ? "visible" : "hidden"}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { name: "Crate & Barrel", description: "Home essentials" },
                { name: "Honeymoon Fund", description: "Help us create memories" },
                { name: "Charity Donation", description: "Support causes we care about" },
              ].map((registry, i) => (
                <motion.div key={i} variants={item} className="text-center">
                  <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-2">{registry.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{registry.description}</p>
                  <Button variant="outline" className="rounded-none text-xs uppercase tracking-wider">
                    View Registry
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container text-center">
          <h2 className="font-serif text-2xl mb-6">Sarah & Michael</h2>
          <p className="text-white/70 text-sm mb-8">August 12, 2025 • The Glass Pavilion</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:sarahandmichael@wedding.com" className="text-white/70 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
            <a href="tel:+15551234567" className="text-white/70 hover:text-white transition-colors">
              <Phone className="h-5 w-5" />
            </a>
          </div>
          <div className="text-xs text-white/50">&copy; {new Date().getFullYear()} Sarah & Michael</div>
        </div>
      </footer>
    </div>
  )
}

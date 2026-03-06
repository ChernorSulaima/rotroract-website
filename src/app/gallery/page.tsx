"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Filter, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

const categories = [
  { id: "all", name: "All" },
  { id: "community", name: "Community" },
  { id: "meetings", name: "Events" },
  { id: "health", name: "Health" },
  { id: "education", name: "Education" },
  { id: "networking", name: "Networking" },
]

const galleryImages = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2296286c-2f1e-4906-ac81-56820b0cd83c.JPG-cGnNWULoKcN06HlgrraDFqoOrvma4Q.jpeg",
    title: "Community Outreach",
    category: "community",
    description: "Members visiting rural communities to assess needs and provide support",
    date: "2023-11-18",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/36010574-ad13-418c-ae26-34b1a013c062.JPG-bKFYmkdyhemggXa1cMOFMgVXjr4Tvm.jpeg",
    title: "Professional Networking",
    category: "networking",
    description: "Members networking at our annual professional development gathering",
    date: "2023-12-02",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/88b8d7a2-432b-4fd6-9b6a-41273ef6abec.JPG-PEEPqOfvnPniZsWju38FR6J9bAX6RD.jpeg",
    title: "Youth Leadership Workshop",
    category: "education",
    description: "Empowering young people with leadership and entrepreneurship skills",
    date: "2023-10-15",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2020f43e-acab-483c-9408-3a9a198ef097.JPG-PkPI3V3J4t8Lk7friKl3bh3RHFofrB.jpeg",
    title: "Rural Community Project",
    category: "community",
    description: "Visiting rural communities to provide healthcare and educational support",
    date: "2023-11-18",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a5c1c8a7-8744-402a-8e08-dc0aba6e3956.JPG-oGi8CsHjhSbrgSmmEcCK3oiTZK4Gos.jpeg",
    title: "Training Session",
    category: "meetings",
    description: "Professional development and capacity building session for members",
    date: "2023-09-20",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/child%20image-QrJ3WXP4bhDy9c79uXgSMsduc3BTwM.webp",
    title: "Education Support Program",
    category: "education",
    description: "Supporting children's education through our scholarship program",
    date: "2023-09-15",
  },
  {
    id: 7,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-0xuCByYXIOeQgLsvuopjQyz5xNXdBo.jpeg",
    title: "End Polio Now Campaign",
    category: "health",
    description: "Polio awareness campaign and community health initiative",
    date: "2023-10-24",
  },
  {
    id: 8,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/child%20image.jpg-k30ptNMgI2eg80pOn4odjKGwftD4fR.jpeg",
    title: "Back to School Project",
    category: "education",
    description: "Providing school supplies and support to underprivileged children",
    date: "2023-09-15",
  },
  {
    id: 9,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-W5S0xYFVZD5KFIGLmBqnxSVPntuCTw.jpeg",
    title: "Club Meeting",
    category: "meetings",
    description: "Regular club meeting with members and guests",
    date: "2023-12-05",
  },
  {
    id: 10,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
    title: "Community Partnership",
    category: "community",
    description: "Building partnerships with local organizations and community leaders",
    date: "2023-11-25",
  },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeFilter)

  const selectedImageData = selectedImage
    ? galleryImages.find((img) => img.id === selectedImage)
    : null

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (selectedImage === null) return
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
      let newIndex
      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      } else {
        newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      }
      setSelectedImage(filteredImages[newIndex].id)
    },
    [selectedImage, filteredImages]
  )

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "Escape") setSelectedImage(null)
      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, navigateImage])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [selectedImage])

  return (
    <div>
      {/* Header & Filter */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Our Gallery
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Moments from our service projects and events
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-3.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all active:scale-95 ${activeFilter === category.id
                    ? "bg-rcfs-blue text-white shadow-md shadow-rcfs-blue/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="card card-hover cursor-pointer group"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span
                      className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[10px] md:text-xs font-medium text-white ${image.category === "community"
                          ? "bg-rcfs-blue"
                          : image.category === "health"
                            ? "bg-red-500"
                            : image.category === "education"
                              ? "bg-green-500"
                              : image.category === "networking"
                                ? "bg-rcfs-magenta"
                                : "bg-rcfs-gold"
                        }`}
                    >
                      {categories.find((cat) => cat.id === image.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base line-clamp-1">
                    {image.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-1.5 line-clamp-2 hidden sm:block">
                    {image.description}
                  </p>
                  <div className="flex items-center text-[10px] md:text-xs text-gray-500">
                    <Calendar size={10} className="mr-1" />
                    {new Date(image.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && selectedImageData && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null)
          }}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm active:scale-95 transition-all"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm active:scale-95 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm active:scale-95 transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
              <Image
                src={selectedImageData.src}
                alt={selectedImageData.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                {selectedImageData.title}
              </h3>
              <p className="text-gray-300 text-sm mb-1 hidden sm:block">
                {selectedImageData.description}
              </p>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar size={12} className="mr-1.5" />
                {new Date(selectedImageData.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Filter, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Navigation from "@/components/Navigation"
import { NotificationProvider } from "@/components/NotificationProvider"

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { id: "all", name: "All Photos" },
    { id: "community", name: "Community Service" },
    { id: "meetings", name: "Meetings & Events" },
    { id: "health", name: "Health Projects" },
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
      title: "Professional Networking Event",
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

  const filteredImages =
    activeFilter === "all" ? galleryImages : galleryImages.filter((image) => image.category === activeFilter)

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  const selectedImageData = selectedImage ? galleryImages.find((img) => img.id === selectedImage) : null

  return (
    <NotificationProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div className="pt-20">
            {/* Filter Section */}
            <section className="py-8 bg-white border-b border-gray-200">
              <div className="container-custom">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center text-gray-600 mr-4">
                    <Filter size={20} className="mr-2" />
                    <span className="font-medium">Filter by category:</span>
                  </div>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeFilter === category.id
                          ? "bg-rcfs-blue text-white shadow-md"
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="card card-hover cursor-pointer"
                      onClick={() => openLightbox(image.id)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium text-white ${
                              image.category === "community"
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
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1" />
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
            {selectedImage && selectedImageData && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative max-w-4xl max-h-full">
                  {/* Close Button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                  >
                    <X size={24} />
                  </button>

                  {/* Navigation Buttons */}
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image */}
                  <img
                    src={selectedImageData.src || "/placeholder.svg"}
                    alt={selectedImageData.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                    <h3 className="text-xl font-semibold mb-2">{selectedImageData.title}</h3>
                    <p className="text-gray-300 mb-2">{selectedImageData.description}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar size={14} className="mr-2" />
                      {new Date(selectedImageData.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </NotificationProvider>
  )
}

export default GalleryPage

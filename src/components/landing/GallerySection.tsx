import { motion } from "framer-motion"

const GALLERY_IMAGES = [
  {
    id: "g-1",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    alt: "Students collaborating on a project",
    span: "col-span-2 row-span-2",
  },
  {
    id: "g-2",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    alt: "Career fair event",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g-3",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    alt: "Leadership workshop",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g-4",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    alt: "Modern study lounge",
    span: "col-span-1 row-span-2",
  },
  {
    id: "g-5",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    alt: "Guest lecture session",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g-6",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    alt: "Team meeting",
    span: "col-span-2 row-span-1",
  },
  {
    id: "g-7",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    alt: "Students networking",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g-8",
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    alt: "Award ceremony",
    span: "col-span-1 row-span-1",
  },
]

export function GallerySection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
            Campus Life
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            Photo Gallery
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Capturing moments of leadership, learning, and community at the School of Commerce.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`${image.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

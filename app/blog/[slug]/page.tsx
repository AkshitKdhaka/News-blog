import Image from "next/image"
import Link from "next/link"
import { blogPosts, getRelatedPosts, type BlogPost } from "@/data/blog-posts"
import { BlogCard } from "@/components/blog-card"
import type { Metadata } from "next"
import { ShareButton } from "@/components/share-button"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return {
      title: "Post Not Found - Genius Labs Blog",
      description: "The requested blog post could not be found.",
    }
  }

  // Create a clean excerpt without HTML for meta description
  const cleanExcerpt = post.excerpt.replace(/<[^>]*>?/gm, "")

  return {
    title: post.title,
    description: cleanExcerpt.substring(0, 160),
    keywords: `${post.category}, genius labs, education, learning`,
    openGraph: {
      title: post.title,
      description: cleanExcerpt.substring(0, 160),
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: [post.category, "education", "learning"],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanExcerpt.substring(0, 160),
      images: [post.coverImage],
    },
    alternates: {
      canonical: `https://blog.geniuslabs.edu/blog/${post.slug}`,
    },
  }
}

function NotFoundPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🤔 Uh-oh</h1>
          <p className="text-lg text-gray-600 mb-6">We are unable to find the post that you are looking for.</p>
          <Link href="/" className="text-primary hover:underline">
            Click here to view all Blogs
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Blogs you may like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((relatedPost) => (
              <div key={relatedPost.slug} className="rounded-lg overflow-hidden shadow-md">
                <Link href={`/blog/${relatedPost.slug}`}>
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={relatedPost.coverImage || `https://picsum.photos/800/400?random=${relatedPost.slug}`}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-primary text-white px-2 py-1 text-xs rounded mb-2">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-lg mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-600">
                      {relatedPost.author} • {relatedPost.date}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function renderPostContent(post: BlogPost) {
  return (
    <>
      {/* Introduction */}
      {post.content?.introduction && <p id="introduction">{post.content.introduction}</p>}

      {/* Content Sections */}
      {post.content?.sections &&
        post.content.sections.map((section, index) => (
          <div key={index} className="my-8">
            <h2 id={section.title.toLowerCase().replace(/\s+/g, "-")} className="text-2xl font-bold my-4">
              {section.title}
            </h2>
            <p>{section.content}</p>

            {section.image && (
              <figure className="my-6">
                <Image
                  src={section.image.src || `https://picsum.photos/800/400?random=${post.slug}-${index}`}
                  alt={section.image.alt}
                  width={800}
                  height={400}
                  className="rounded-lg"
                />
                {section.image.caption && (
                  <figcaption className="text-center text-gray-500 mt-2">{section.image.caption}</figcaption>
                )}
              </figure>
            )}
          </div>
        ))}

      {/* Quote */}
      {post.content?.quote && (
        <blockquote className="my-8">
          &ldquo;{post.content.quote.text}&rdquo;<cite>— {post.content.quote.author}</cite>
        </blockquote>
      )}

      {/* Conclusion */}
      {post.content?.conclusion && (
        <div className="mt-8">
          <h2 id="looking-ahead" className="text-2xl font-bold my-4">
            Looking Ahead
          </h2>
          <p>{post.content.conclusion}</p>
        </div>
      )}
    </>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return <NotFoundPage />
  }

  // Generate table of contents from sections, including Introduction
  const tableOfContents = [
    // Add Introduction as the first item
    {
      title: "Introduction",
      id: "introduction",
    },
    // Then include all the sections
    ...(post.content?.sections?.map((section) => ({
      title: section.title,
      id: section.title.toLowerCase().replace(/\s+/g, "-"),
    })) || []),
  ]

  if (post.content?.conclusion) {
    tableOfContents.push({
      title: "Looking Ahead",
      id: "looking-ahead",
    })
  }

  // Enhanced JSON-LD for the blog post with more SEO-friendly attributes
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      url: `https://blog.geniuslabs.edu/author/${post.author.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Genius Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.geniuslabs.edu/logo.png",
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.geniuslabs.edu/blog/${post.slug}`,
    },
    keywords: `${post.category}, genius labs, education, learning`,
    articleSection: post.category,
    wordCount:
      post.content?.introduction?.split(" ").length ||
      0 +
        (post.content?.sections?.reduce((acc, section) => acc + section.content.split(" ").length, 0) || 0) +
        (post.content?.conclusion?.split(" ").length || 0),
    inLanguage: "en-US",
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 4)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <div className="relative h-[30vh] md:h-[40vh] min-h-[320px] md:min-h-[400px] bg-black">
          <Image
            src={post.coverImage || `https://picsum.photos/1200/600?random=${post.slug}`}
            alt={`Featured image for article: ${post.title}`}
            fill
            className="object-cover opacity-70"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0">
            {/* Category above author info */}
            <div className="absolute bottom-12 left-4">
              <span className="bg-black/50 text-white px-2 py-2 text-sm font-medium">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>

            {/* Author info in bottom left */}
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2 text-xs text-white">
                <span>{post.author}</span>
                <span>|</span>
                <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                <span>|</span>
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12">
          {/* Title below the image */}
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{post.title}</h1>
            <div className="flex justify-end">
              <ShareButton title={post.title} slug={post.slug} />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h2 className="text-base font-semibold mb-2">Table of Contents</h2>
                <ul className="list-disc pl-5 text-sm">
                  {tableOfContents.map((item, index) => (
                    <li key={index} className="mb-1">
                      <a href={`#${item.id}`} className="text-[#00b2ff] hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-base font-medium mb-6">{post.excerpt}</p>
              {renderPostContent(post)}
            </div>

            {/* Author bio for E-E-A-T signals - only shown if authorBio exists */}
            {post.authorBio && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <svg
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">About {post.author}</h3>
                    <p className="text-gray-600 text-sm">{post.authorBio}</p>
                  </div>
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-bold mb-6">Related Blogs</h3>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <BlogCard key={relatedPost.slug} {...relatedPost} compact={true} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Social Media and engagement */}
            <div className="mt-8 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">Follow us</h4>
                  <div className="flex gap-2">
                    <a
                      href="https://www.youtube.com/@GeniusLabsWorkshops"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on YouTube"
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                    <a
                      href="https://business.facebook.com/latest/home?business_id=1276543033268313&asset_id=119011211298580"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on Facebook"
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/genius-labs-4736ab286/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on LinkedIn"
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-blue-700 hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/genius_labs.live/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on Instagram"
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-pink-600 hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <Link href="/" className="text-primary hover:underline text-sm">
                    ← Back to all Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

import type { MetadataRoute } from "next"
import { blogPosts } from "@/data/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the site
  const baseUrl = "https://blog.geniuslabs.edu"

  // Current date for lastModified
  const currentDate = new Date()

  // Home page
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ]

  // Category pages
  const categories = ["workshops", "camps", "projects", "how-to", "challenges"]

  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/?category=${category}`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })
  })

  // Blog post pages
  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "daily" as const,
      priority: 0.6,
    })
  })

  return routes
}

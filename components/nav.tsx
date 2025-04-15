"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"

// Define navigation categories with improved SEO attributes
const categories = [
  { name: "All Categories", href: "/", description: "View all blog posts across all categories", slug: null },
  {
    name: "Workshops",
    href: "/workshops",
    description: "Explore culinary and educational workshops",
    slug: "workshops",
  },
  {
    name: "Camps",
    href: "/camps",
    description: "Discover educational and adventure camps for children",
    slug: "camps",
  },
  {
    name: "Projects by Genius Kids",
    href: "/projects",
    description: "See innovative projects created by young minds",
    slug: "projects",
  },
  { name: "How To?", href: "/how-to", description: "Learn step-by-step guides and tutorials", slug: "how-to" },
  {
    name: "Thinking Challenges for Home",
    href: "/challenges",
    description: "Find brain teasers and educational challenges",
    slug: "challenges",
  },
]

export function Navigation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentCategory = searchParams.get("category")

  const handleCategoryClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, categoryName: string, categorySlug: string | null) => {
      e.preventDefault()

      // Navigate to appropriate URL based on category
      if (categoryName === "All Categories") {
        // For "All Categories", use a custom approach to ensure client-side navigation
        // Create a new URLSearchParams without the category parameter
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete("category")

        // Use shallow routing to update the URL without a full page reload
        router.push(`/?${newSearchParams.toString()}`, { scroll: false })

        // Force a re-render by dispatching a custom event
        window.dispatchEvent(new CustomEvent("category-changed", { detail: null }))
      } else if (categorySlug) {
        router.push(`/?category=${categorySlug}`, { scroll: false })
      }
    },
    [router, searchParams],
  )

  return (
    <nav aria-label="Blog categories" className="border-b mb-2">
      <div className="container mx-auto overflow-x-auto scrollbar-hide">
        <ul className="flex space-x-2 py-4">
          {categories.map((category) => {
            // Determine if this category is currently active
            const isActive =
              (category.name === "All Categories" && !currentCategory) ||
              (category.slug && category.slug === currentCategory)

            return (
              <li key={category.name}>
                <Link
                  href={category.href}
                  onClick={(e) => handleCategoryClick(e, category.name, category.slug)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap pr-6",
                    isActive ? "text-primary border-b-2 border-primary -mb-[17px] pb-4" : "text-muted-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  title={category.description}
                >
                  {category.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export interface BlogPost {
  title: string
  excerpt: string
  slug: string
  coverImage: string
  author: string
  date: string
  readTime: string
  category: string
  backgroundColor: string
  authorBio?: string
  content?: BlogPostContent
}

export interface BlogPostContent {
  introduction?: string
  sections?: BlogPostSection[]
  quote?: {
    text: string
    author: string
  }
  conclusion?: string
}

export interface BlogPostSection {
  title: string
  content: string
  image?: {
    src: string
    alt: string
    caption?: string
  }
}

export const blogPosts: BlogPost[] = [
  // Workshops Category (3 posts)
  {
    title: "Culinary Workshop: Mastering the Art of South Indian Cuisine",
    excerpt:
      "Join Chef Ravi Kumar for a hands-on workshop exploring the authentic flavors and techniques of traditional South Indian cooking",
    slug: "south-indian-cuisine-workshop",
    coverImage: "https://picsum.photos/800/400?random=2",
    author: "Priya Desai",
    date: "April 5, 2023",
    readTime: "3 min",
    category: "workshops",
    backgroundColor: "bg-orange-100",
  },
  {
    title: "Digital Photography Workshop for Beginners",
    excerpt:
      "Learn the fundamentals of composition, lighting, and camera settings in this comprehensive workshop for aspiring photographers",
    slug: "photography-workshop-beginners",
    coverImage: "https://picsum.photos/800/400?random=3",
    author: "Rahul Sharma",
    date: "May 12, 2023",
    readTime: "5 min",
    category: "workshops",
    backgroundColor: "bg-blue-100",
  },

  // Camps Category (3 posts)
  {
    title: "Idli, spice, and everything nice– Mysore Raman Idli's journey to success!",
    excerpt:
      "Inspired by a chance meeting in a small town, Mysore Raman Idli has built a strong following by serving delicious South Indian dishes rooted in tradition",
    slug: "mysore-raman-idli-story",
    coverImage: "https://picsum.photos/800/400?random=4",
    author: "Shivya Saha",
    date: "February 4, 2023",
    readTime: "4 min",
    category: "camps",
    backgroundColor: "bg-green-100",
    authorBio:
      "Shivya Saha specializes in documenting the stories of traditional food establishments across India. Her work focuses on the intersection of food, culture, and entrepreneurship.",
    content: {
      introduction:
        "In the bustling food landscape of Bangalore, Mysore Raman Idli stands out as a beacon of authentic South Indian cuisine. Founded by Mr. Raman Iyer after a chance encounter with a master chef in Mysore, this restaurant has grown from a tiny street-side stall to a chain of five successful outlets across the city. This is the story of passion, perseverance, and the perfect idli.",
      sections: [
        {
          title: "A Serendipitous Beginning",
          content:
            "The story of Mysore Raman Idli begins not in a kitchen, but on a train journey. In 1995, Raman Iyer, then a young bank employee, was traveling to Mysore for work when he struck up a conversation with an elderly gentleman seated across from him. This man turned out to be Krishnamurthy, a retired chef who had spent decades perfecting the art of making soft, fluffy idlis. Fascinated by Krishnamurthy's stories and passion for food, Raman ended up spending his entire stay in Mysore learning the intricacies of South Indian cooking from the master chef.",
          image: {
            src: "https://picsum.photos/800/400?random=4-1",
            alt: "Mysore train station where Raman met Chef Krishnamurthy",
            caption: "Mysore train station where the fateful meeting occurred (1995)",
          },
        },
        {
          title: "From Hobby to Profession",
          content:
            "Upon returning to Bangalore, Raman continued his day job at the bank but spent his evenings practicing what he had learned. He began inviting friends and family over for dinner, serving them his increasingly perfected idlis and dosas. The positive feedback was overwhelming, with many suggesting he should consider turning his passion into a profession. In 1997, taking a leap of faith, Raman quit his secure banking job and invested his savings in a small food stall near Jayanagar. Named 'Mysore Raman Idli' in honor of where his culinary journey began, the stall specialized in soft, melt-in-your-mouth idlis served with a variety of traditional chutneys.",
        },
        {
          title: "Building a Loyal Following",
          content:
            "The initial months were challenging, with Raman working 16-hour days and barely breaking even. However, the exceptional quality of his food began to attract notice. Word spread about the incredibly soft idlis and the authentic, flavorful chutneys at this small stall. Gradually, a loyal customer base developed, with people willing to queue for up to 30 minutes just to taste Raman's creations. By 1999, the tiny stall had become too small to accommodate the growing number of customers, leading Raman to open his first proper restaurant in the same neighborhood.",
        },
      ],
      quote: {
        text: "I never set out to build a restaurant chain. I just wanted to share the joy of truly authentic South Indian food with as many people as possible. Everything else followed naturally from that simple desire.",
        author: "Raman Iyer, Founder, Mysore Raman Idli",
      },
      conclusion:
        "Today, Mysore Raman Idli operates five successful outlets across Bangalore, each maintaining the same commitment to quality and authenticity that defined that first small stall. Raman still personally oversees the preparation of the idli batter at the central kitchen each morning, ensuring that every idli served meets his exacting standards. As the business continues to grow, with plans for expansion to other cities in southern India, the core philosophy remains unchanged: serve honest, delicious food that respects tradition while delighting the palate. From a chance meeting on a train to a beloved culinary institution, the journey of Mysore Raman Idli reminds us that when passion meets opportunity, truly remarkable things can happen.",
    },
  },
  {
    title: "Summer Science Camp: Exploring the Natural World",
    excerpt:
      "A week-long immersive experience where children conduct experiments, explore ecosystems, and develop a deeper understanding of scientific principles",
    slug: "summer-science-camp",
    coverImage: "https://picsum.photos/800/400?random=5",
    author: "Dr. Anjali Sharma",
    date: "April 20, 2023",
    readTime: "5 min",
    category: "camps",
    backgroundColor: "bg-blue-100",
  },
  {
    title: "Adventure Camp: Wilderness Survival Skills",
    excerpt:
      "Learn essential outdoor survival techniques, navigation, and team-building in this thrilling three-day wilderness adventure camp",
    slug: "wilderness-survival-camp",
    coverImage: "https://picsum.photos/800/400?random=6",
    author: "Raj Kapoor",
    date: "May 15, 2023",
    readTime: "4 min",
    category: "camps",
    backgroundColor: "bg-amber-100",
  },

  // Projects Category (3 posts)
  {
    title: "Building a STEM project: The journey of young innovators",
    excerpt:
      "How a group of students created an award-winning science project that solves real-world problems through innovative thinking",
    slug: "stem-project-journey",
    coverImage: "https://picsum.photos/800/400?random=7",
    author: "Rahul Sharma",
    date: "January 15, 2023",
    readTime: "6 min",
    category: "projects",
    backgroundColor: "bg-blue-100",
  },
  {
    title: "Solar-Powered Water Purification System",
    excerpt:
      "A step-by-step guide to building an affordable solar-powered water purification system for educational or community use",
    slug: "solar-water-purification",
    coverImage: "https://picsum.photos/800/400?random=8",
    author: "Dr. Vikram Singh",
    date: "March 10, 2023",
    readTime: "7 min",
    category: "projects",
    backgroundColor: "bg-yellow-100",
  },
  {
    title: "Building an AI-Powered Plant Health Monitor",
    excerpt:
      "Learn how to create a smart device that uses machine learning to monitor plant health and automate care routines",
    slug: "ai-plant-monitor",
    coverImage: "https://picsum.photos/800/400?random=9",
    author: "Priya Patel",
    date: "April 22, 2023",
    readTime: "8 min",
    category: "projects",
    backgroundColor: "bg-green-100",
  },

  // How To Category (3 posts)
  {
    title: "How to create your first science experiment at home",
    excerpt:
      "A step-by-step guide to setting up safe and educational science experiments using materials you already have in your kitchen",
    slug: "home-science-experiments",
    coverImage: "https://picsum.photos/800/400?random=10",
    author: "Priya Patel",
    date: "December 20, 2022",
    readTime: "5 min",
    category: "how-to",
    backgroundColor: "bg-purple-100",
  },
  {
    title: "How to Build a Simple Robot with Arduino",
    excerpt: "A beginner-friendly guide to creating your first programmable robot using affordable Arduino components",
    slug: "arduino-robot-guide",
    coverImage: "https://picsum.photos/800/400?random=11",
    author: "Arjun Mehta",
    date: "February 15, 2023",
    readTime: "7 min",
    category: "how-to",
    backgroundColor: "bg-blue-100",
  },
  {
    title: "How to Start a School Garden Project",
    excerpt:
      "Practical steps for educators to establish and maintain a successful garden program that enhances curriculum and student engagement",
    slug: "school-garden-guide",
    coverImage: "https://picsum.photos/800/400?random=12",
    author: "Sunita Reddy",
    date: "March 28, 2023",
    readTime: "6 min",
    category: "how-to",
    backgroundColor: "bg-green-100",
  },

  // Challenges Category (3 posts)
  {
    title: "Weekly brain teasers to challenge your family",
    excerpt:
      "A collection of puzzles and brain teasers that will keep your family engaged and thinking critically during weekend gatherings",
    slug: "family-brain-teasers",
    coverImage: "https://picsum.photos/800/400?random=13",
    author: "Amit Kumar",
    date: "November 5, 2022",
    readTime: "3 min",
    category: "challenges",
    backgroundColor: "bg-yellow-100",
  },
  {
    title: "30-Day Coding Challenge for Beginners",
    excerpt:
      "A month-long series of progressive coding exercises designed to build programming skills from the ground up",
    slug: "30-day-coding-challenge",
    coverImage: "https://picsum.photos/800/400?random=14",
    author: "Ravi Sharma",
    date: "February 8, 2023",
    readTime: "4 min",
    category: "challenges",
    backgroundColor: "bg-blue-100",
  },
  {
    title: "Environmental Innovation Challenge for Students",
    excerpt:
      "A competition challenging young minds to develop creative solutions for pressing environmental issues in their communities",
    slug: "environmental-innovation-challenge",
    coverImage: "https://picsum.photos/800/400?random=15",
    author: "Nisha Patel",
    date: "March 15, 2023",
    readTime: "5 min",
    category: "challenges",
    backgroundColor: "bg-green-100",
  },
]

export function getRelatedPosts(currentSlug: string, category: string, limit = 4): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug && post.category === category).slice(0, limit)
}

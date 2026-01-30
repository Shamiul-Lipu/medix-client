import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BLOG_POSTS = [
  {
    title: "How to Boost Your Immune System Naturally",
    category: "Wellness",
    author: "Dr. Sarah Jenkins",
    date: "May 12, 2024",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop",
    readTime: "5 min read",
  },
  {
    title: "Understanding Your Prescription: A Guide",
    category: "Health Tips",
    author: "Pharm. Michael Chen",
    date: "May 10, 2024",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop",
    readTime: "8 min read",
  },
  {
    title: "The Importance of Regular Health Checkups",
    category: "Medical",
    author: "Dr. Robert Smith",
    date: "May 08, 2024",
    image:
      "https://images.unsplash.com/photo-1613796446768-b7366aed3ac6?q=80&w=1470&auto=format&fit=crop",
    readTime: "6 min read",
  },
];

const ExpertAdvices = () => {
  return (
    <>
      <section className="py-16 md:py-24  overflow-hidden ">
        <div className="container-wide relative">
          {/* Header */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Expert <span className="text-primary">Health Insights</span>
              </h2>
              <p className="mt-2  mx-auto max-w-2xl text-muted-foreground">
                Practical advice and tips from trusted medical professionals
              </p>
            </div>

            <Button variant="outline" className="gap-2 self-start sm:self-auto">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Card
                key={post.title}
                className="group overflow-hidden transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Meta */}
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-lg font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {post.author}
                      </span>
                    </div>

                    <Link
                      href="#"
                      className="text-primary transition-colors hover:text-primary/80"
                      aria-label="Read article"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertAdvices;

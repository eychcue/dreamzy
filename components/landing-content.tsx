"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah",
    avatar: "M",
    title: "User",
    description: "I have always been curious about the meaning behind my dreams, and with the help of this dream interpretation service, I finally found some answers. The AI technology used accurately decoded the symbolism in my dreams, providing me with valuable insights into my subconscious mind. I highly recommend this service to anyone seeking to understand the hidden messages within their dreams.",
  },
  {
    name: "Alex",
    avatar: "C",
    title: "User",
    description: "I was skeptical at first, but this dream interpretation service exceeded my expectations. The AI-based analysis was able to connect the dots within my dreams, uncovering patterns and themes that I had never noticed before. It truly provided me with a fresh perspective on my inner thoughts and emotions. I am now a firm believer in the power of AI when it comes to understanding dreams.",
  },
  {
    name: "Aisha",
    avatar: "K",
    title: "User",
    description: "As someone who has always struggled to understand the meaning behind my dreams, I am incredibly grateful for this dream interpretation service. The AI utilized by the platform accurately interpreted the symbols and emotions in my dreams, providing me with profound insights. This service has helped me uncover hidden aspects of myself, and I highly recommend it to anyone seeking self-discovery through their dreams.",
  },
  {
    name: "David",
    avatar: "P",
    title: "User",
    description: "I have always been fascinated with dreams, but interpreting them felt like an impossible task. That's when I discovered this dream interpretation service.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
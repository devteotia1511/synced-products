"use client";

import { useEffect, useState } from "react";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRSS = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          "https://www.thehindu.com/news/national/feeder/default.rss"
        )}`
      );
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = Array.from(xml.querySelectorAll("item")).slice(0, 6);

      const parsed = items.map((item) => ({
        title: item.querySelector("title")?.textContent,
        link: item.querySelector("link")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent,
        description: item.querySelector("description")?.textContent,
      }));

      setNewsItems(parsed);
    } catch (err) {
      console.error("Failed to fetch RSS:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSS();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Synced Todo List</h1>
      <TodoInput />

      <div className="grid md:grid-cols-3 gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-center">All Tasks</h2>
          <TodoList filter="all" />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-center">Active</h2>
          <TodoList filter="active" />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2 text-center">Completed</h2>
          <TodoList filter="completed" />
        </section>
      </div>

      <section className="rounded-lg border shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">🇮🇳 National News</h2>
          <Button onClick={fetchRSS} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh News"}
          </Button>
        </div>

        {loading && newsItems.length === 0 ? (
          <p className="text-gray-500">Loading news...</p>
        ) : (
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <Card key={index} className="p-3 space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Read full article →
                </a>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
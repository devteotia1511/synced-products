"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b shadow-sm">
      <h1 className="text-xl font-bold">Synced App</h1>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Todo</Button>
        </Link>
        <Link href="/products">
          <Button variant="default">Products</Button>
        </Link>
      </div>
    </nav>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tasks", href: "/tasks" },
  { label: "Login", href: "/login" },
];

const DUMMY_USER = {
  name: "Alice Smith",
  email: "alice@example.com",
  initials: "AS",
};

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 h-14">
        <span className="font-semibold text-indigo-600">Task Tracker</span>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-indigo-600">
              {DUMMY_USER.initials}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="rounded-lg h-8 w-8 p-0 text-gray-500"
          >
            {open ? "✕" : "☰"}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col px-4 pb-4 gap-1">
          <div className="px-3 py-3 mb-1">
            <p className="text-xs font-semibold text-gray-700">
              {DUMMY_USER.name}
            </p>
            <p className="text-xs text-gray-400">{DUMMY_USER.email}</p>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toast.success("Signed out successfully");
              setOpen(false);
            }}
            className="mt-1 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
          >
            Sign out
          </button>
        </nav>
      )}
    </div>
  );
}

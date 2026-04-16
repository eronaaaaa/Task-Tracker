"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfileSection() {
  const [name, setName] = useState("Alice Smith");
  const [email, setEmail] = useState("alice@example.com");

  function handleSave() {
    // Will wire to Supabase on Day 18
    console.log("Saving profile:", { name, email });
    toast.success("Profile updated!");
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Update your name and email address
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-50 flex justify-end">
        <Button
          size="sm"
          className="rounded-xl cursor-pointer"
          onClick={handleSave}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

const DUMMY_USER = {
  name: "Alice Smith",
  email: "alice@example.com",
  initials: "AS",
};

export default function UserMenu() {
  const [user] = useState(DUMMY_USER);

  function handleSignOut() {
    console.log("Signing out...");
    toast.success("Signed out successfully");
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-gray-100/80 transition-colors text-left group cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-indigo-600">
              {user.initials}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          <svg
            className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 flex-shrink-0 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-49 p-1.5 rounded-xl border border-gray-100 bg-white shadow-sm ring-0 z-[9999]"
      >
        <div className="px-2.5 py-2 mb-1">
          <p className="text-xs font-semibold text-gray-700">{user.name}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-gray-100 my-1" />

        <DropdownMenuItem
          asChild
          className="rounded-lg px-2.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-600"
        >
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="rounded-lg px-2.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-600"
        >
          <Link href="/tags">Manage tags</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-100 my-1" />

        <DropdownMenuItem
          className="rounded-lg px-2.5 py-2 text-sm cursor-pointer text-red-500 hover:bg-red-50 focus:text-red-500"
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

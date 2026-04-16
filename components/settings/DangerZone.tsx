"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function DangerZone() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  function handleDeleteAccount() {
    if (confirmText !== "delete my account") {
      toast.error("Please type the confirmation text exactly");
      return;
    }
    // Will wire to Supabase on Day 18
    console.log("Deleting account");
    toast.error("Account deletion wired up on Day 18");
    setConfirmOpen(false);
    setConfirmText("");
  }

  return (
    <>
      <div className="rounded-2xl border border-red-100 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-50">
          <h2 className="text-sm font-semibold text-red-600">Danger zone</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Irreversible actions — proceed with caution
          </p>
        </div>

        <div className="px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Delete account</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Permanently delete your account and all your tasks
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 flex-shrink-0 cursor-pointer"
            onClick={() => setConfirmOpen(true)}
          >
            Delete account
          </Button>
        </div>
      </div>

      <Dialog
        open={confirmOpen}
        onOpenChange={(o) => !o && setConfirmOpen(false)}
      >
        <DialogContent className="sm:max-w-md rounded-2xl border border-gray-100 shadow-sm p-0 gap-0 overflow-hidden bg-white ring-0">
          <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-50">
            <DialogTitle className="text-base font-semibold text-gray-900">
              Delete account
            </DialogTitle>
          </DialogHeader>

          <div className="px-5 py-4 flex flex-col gap-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              This will permanently delete your account and all associated
              tasks, tags, and comments. This action{" "}
              <span className="font-semibold text-gray-900">
                cannot be undone.
              </span>
            </p>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirm-delete"
                className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
              >
                Type{" "}
                <span className="text-gray-600 normal-case font-mono">
                  delete my account
                </span>{" "}
                to confirm
              </label>
              <input
                id="confirm-delete"
                type="text"
                placeholder="delete my account"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-colors placeholder:text-gray-300"
              />
            </div>
          </div>

          <DialogFooter className="px-5 py-4 bg-gray-50/60 border-t border-gray-50 flex gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-gray-200 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => setConfirmText("")}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="sm"
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={handleDeleteAccount}
            >
              Delete my account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

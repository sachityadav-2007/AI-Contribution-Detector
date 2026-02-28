import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "../ui/Button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <Search
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 ml-2"
                        aria-hidden="true"
                    />
                    <input
                        id="search-field"
                        className="block h-full w-full border-0 py-0 pl-10 pr-0 bg-transparent text-slate-200 placeholder:text-slate-400 focus:ring-0 sm:text-sm focus:outline-none"
                        placeholder="Search repositories, authors, or commits..."
                        type="search"
                        name="search"
                    />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-300 transition-colors">
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <div className="h-6 w-px bg-slate-700" aria-hidden="true" />

                    <div className="flex items-center gap-x-4">
                        <Button variant="ghost" size="icon" className="rounded-full overflow-hidden bg-slate-800">
                            <User className="h-5 w-5 text-slate-400" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

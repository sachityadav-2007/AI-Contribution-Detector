import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function Layout() {
    return (
        <div className="min-h-screen bg-[#0b1120]">
            <Sidebar />
            <div className="lg:pl-64">
                <Navbar />
                <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

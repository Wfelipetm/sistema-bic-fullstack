"use client"

import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-7xl mx-auto w-full p-4 md:p-8">
      {children}
    </section>
  )
}
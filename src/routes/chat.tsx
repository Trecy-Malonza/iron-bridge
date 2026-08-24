import { createFileRoute } from "@tanstack/react-router";

import { AiChat } from "@/components/site/AiChat";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with IronBridge | Industrial Space Assistant" },
      {
        name: "description",
        content:
          "Chat with the IronBridge AI assistant about industrial land, warehouse leasing, pricing and site visits across Kenya.",
      },
      { property: "og:title", content: "Chat with IronBridge" },
      {
        property: "og:description",
        content: "Ask our AI assistant about industrial land, warehouses and leasing in Kenya.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 lg:px-10">
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">Chat with IronBridge</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Our AI assistant answers questions about our properties, pricing, locations and services.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-surface p-4 shadow-float sm:p-6">
          <AiChat height="h-[420px]" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import SpaceAI from "@/components/space-ai/SpaceAI";

export default function SpaceAIPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          Space AI - Interface de Insights Automatizados
        </h1>
        <SpaceAI />
      </div>
    </main>
  );
}

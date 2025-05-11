

import PredictForm from "@/components/predictForm";

export default function Home() {
  return (
    <section className="flex flex-col justify-between h-screen">
      <header className="h-[80px] w-full bg-blue-400"></header>
      <main className="h-full w-full flex flex-col items-center justify-center ">
        <h2 className="text-4xl font-mono font-extrabold tracking-widest">
          Diabetes Diagnostic Prediction
        </h2>
        <p className="mb-10">
          Diagnose diabetes with confidence. Input key health data to predict
          your condition with precision.
        </p>
        <PredictForm />
      </main>
      <footer className="py-12 px-24 bg-blue-400 h-0.5 flex items-center justify-center text-white">
        Copyright @2025 www.jetpoint.com
      </footer>
    </section>
  );
}

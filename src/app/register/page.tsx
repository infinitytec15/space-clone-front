import RegistrationForm from "@/components/auth/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">SD</span>
          </div>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}

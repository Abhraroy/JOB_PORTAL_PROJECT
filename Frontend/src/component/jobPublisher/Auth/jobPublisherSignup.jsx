import { SignUp } from "@clerk/clerk-react";

export default function JobPublisherSignup() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full h-full flex justify-center items-center",
            card: "bg-blue-500 rounded-lg shadow-lg p-6",
            headerTitle: "text-white text-2xl font-bold",
            headerSubtitle: "text-white text-sm",
            formButtonPrimary:
              "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded",
          },
        }}
        signInUrl="/signin/jobPublisher"
        afterSignUpUrl="/jobPublisher/profile/create"
      />
    </div>
  );
}
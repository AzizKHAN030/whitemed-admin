import { UserButton } from '@clerk/nextjs';

export function SetupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
}

export default SetupPage;

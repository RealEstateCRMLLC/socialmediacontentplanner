'use client';

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  // Demo credentials only exist when explicitly enabled (local dev);
  // in production the authorize() path rejects them, so offering the
  // button there would be a dead end. NEXT_PUBLIC_ALLOW_DEMO_LOGIN=true
  // opts in locally.
  const demoEnabled = process.env['NEXT_PUBLIC_ALLOW_DEMO_LOGIN'] === 'true';

  // Only offer sign-in methods the server actually has configured.
  // Offering "Sign in with GitHub" when no GitHub OAuth app is configured
  // (the production state today) sends users to a NextAuth error page;
  // detect the real provider list and render honestly instead.
  const [providers, setProviders] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch('api/auth/providers')
      .then((r) => (r.ok ? r.json() : {}))
      .then(setProviders)
      .catch(() => setProviders({}));
  }, []);

  const githubConfigured = providers !== null && 'github' in providers;
  const nothingConfigured = providers !== null && !githubConfigured && !demoEnabled;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">ContentCommand AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {providers === null && (
            <p className="text-center text-sm text-gray-500">Checking available sign-in methods…</p>
          )}
          {githubConfigured && (
            <Button onClick={() => signIn('github', { callbackUrl: '/contentplanner/dashboard' })} className="w-full">
              Sign in with GitHub
            </Button>
          )}
          {demoEnabled && (
            <>
              {githubConfigured && (
                <div className="relative border-t my-4">
                  <span className="absolute -top-3 bg-white px-2 left-1/2 -translate-x-1/2 text-sm text-gray-500">or</span>
                </div>
              )}
              <Button onClick={() => signIn('credentials', { email: 'test@example.com', password: 'password', callbackUrl: '/contentplanner/dashboard' })} variant="outline" className="w-full">
                Demo Login (test@example.com)
              </Button>
            </>
          )}
          {nothingConfigured && (
            <div className="space-y-3 text-center">
              <p className="text-sm text-gray-600">
                Sign-in is not configured for ContentPlanner yet. An administrator needs to
                connect a GitHub OAuth app before anyone can log in here.
              </p>
              <a
                href="https://excellegacyrealtygroup.site/dashboard"
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to the main CRM dashboard
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

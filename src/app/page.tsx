"use client"
import type { Liff } from "@line/liff";
import React, { useEffect, useState } from 'react';
import { liff } from '@line/liff';

export default function Home({ 
  liff: initialLiff, 
  liffError: initialLiffError 
}: { 
  liff: Liff | null; 
  liffError: string | null 
}): React.ReactElement {
  const [error, setError] = useState<string | null>(initialLiffError);

  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(() => {
        console.log('LIFF init succeeded');
      })
      .catch((e: Error) => {
        console.error('LIFF init failed:', e);
        setError(e.message);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>create-liff-app</h1>
        {liff  && <p>LIFF init succeeded.</p>}
        {error && (
          <>
            <p>LIFF init failed.</p>
            <p><code>{error}</code></p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>
      </main>
    </div>
  );
}

import { Suspense } from "react";

import InterviewClient from "@/components/interviewClient";

export const dynamic = "force-dynamic";

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading Interview...</div>}>
      <InterviewClient />
    </Suspense>
  );
}
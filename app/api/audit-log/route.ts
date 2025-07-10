import { mockAuditLog } from '@/lib/data';
import { NextResponse } from 'next/server';

// Fetch all audit log entries

export async function GET() {
  // Sort audit logs by timestamp, newest first
  const sortedLogs = [...mockAuditLog].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return NextResponse.json(sortedLogs);
}

import type { AuditLog } from '@/lib/data';

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  try {
    console.log('Service: Fetching audit logs');
    const response = await fetch('/api/audit-log');
    const data = await response.json();
    console.log('Service: Audit logs response:', data);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Service: Error fetching audit logs:', error);
    // Return mock data as fallback
    const { mockAuditLog } = await import('@/lib/data');
    return mockAuditLog;
  }
}

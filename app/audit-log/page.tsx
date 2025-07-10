'use client';

import { DashboardHeader } from '@/components/dashboard-header';
import { RouteGuard } from '@/components/route-guard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AuditLog } from '@/lib/data';
import { fetchAuditLogs } from '@/services/audit';
import { motion } from 'framer-motion';
import { Calendar, RefreshCw, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      console.log('AuditLog Page: Loading audit logs');
      const logs = await fetchAuditLogs();
      console.log('AuditLog Page: Received logs:', logs);

      // Extra safety: make sure logs is an array
      setAuditLogs(Array.isArray(logs) ? logs : []);
    } catch (error) {
      console.error('AuditLog Page: Error loading logs:', error);
      toast.error('Failed to load audit logs');
      setAuditLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case 'approved':
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          >
            Rejected
          </Badge>
        );
      case 'edited':
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            Edited
          </Badge>
        );
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  return (
    <RouteGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
                <p className="text-muted-foreground">
                  Track all administrative actions performed on listings
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={loadAuditLogs}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
                  />
                  Refresh
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Administrative Actions</CardTitle>
                <CardDescription>
                  {auditLogs.length > 0
                    ? `${auditLogs.length} ${
                        auditLogs.length === 1 ? 'entry' : 'entries'
                      } found`
                    : 'No audit entries found'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">
                      Loading audit logs...
                    </p>
                  </div>
                ) : auditLogs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        No audit logs found
                      </h3>
                      <p className="text-muted-foreground">
                        Administrative actions will appear here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Action</TableHead>
                          <TableHead>Listing</TableHead>
                          <TableHead>Admin</TableHead>
                          <TableHead>Timestamp</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditLogs.map((log) => (
                          <TableRow
                            key={log.id}
                            className="hover:bg-muted/50 transition-v0"
                          >
                            <TableCell>{getActionBadge(log.action)}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">
                                  {log.listingTitle}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {log.listingId}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {log.adminEmail}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {new Date(log.timestamp).toLocaleString(
                                    'en-US',
                                    {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    }
                                  )}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </RouteGuard>
  );
}

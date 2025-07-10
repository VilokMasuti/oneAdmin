'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileText, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/audit-log',
      label: 'Audit Log',
      icon: FileText,
    },
  ];

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'h-9 px-3 text-sm font-medium transition-v0',
                isActive && 'bg-muted text-foreground',
                !isActive &&
                  'text-muted-foreground hover:text-foreground  cursor-pointer'
              )}
            >
              <Icon className="h-4 w-4 mr-2  cursor-pointer" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

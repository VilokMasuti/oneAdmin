'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';
import { ChevronDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function AdminProfileDropdown() {
  const { adminEmail, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    router.push('/login');
  };

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map((name) => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const getDisplayName = (email: string) => {
    const name = email.split('@')[0];
    return name
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 px-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback className="text-xs">
                {adminEmail ? getInitials(adminEmail) : 'AD'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium">
                {adminEmail ? getDisplayName(adminEmail) : 'Admin'}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-zinc-950"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {adminEmail ? getDisplayName(adminEmail) : 'Administrator'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {adminEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className=" bg-amber-50" />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600  cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

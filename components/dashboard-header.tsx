'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AdminProfileDropdown } from './admin-profile-dropdown';
import { MobileNav } from './mobile-nav';
import { Navigation } from './navigation';

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <Image
                  src="https://images.unsplash.com/photo-1616277085894-6e4e80b45ccb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxjYXJzJTIwcmVudGFsfGVufDB8fDB8fHww"
                  alt="Logo"
                  width={8}
                  height={8}
                  className="  cursor-pointer  rounded-full h-8 w-8 border-b-2 border-primary  duration-1000"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold antialiased  cursor-pointer   ">
                  CarAdmin
                </h1>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="hidden lg:block">
              <Navigation />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <MobileNav />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AdminProfileDropdown />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

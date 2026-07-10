import { MobileBottomNav } from './MobileBottomNav'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { MainHeader } from './MainHeader'
import { MobileHeader } from './MobileHeader'
import { Sider } from './Sider'

export const Layout = () => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans flex flex-col md:flex-row antialiased">
      <Sider />
      <MobileHeader />
      <main className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        <MainHeader />
        <div className="p-6 pb-24 md:p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Outlet/>
          </AnimatePresence>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  )
}

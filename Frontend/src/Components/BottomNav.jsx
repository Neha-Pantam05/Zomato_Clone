import React from 'react'
import { NavLink } from 'react-router-dom'
import { House, Bookmark } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/', icon: <House /> },
  { label: 'Saved', to: '/saved', icon: <Bookmark /> },
]

const BottomNav = () => {
  return (
    <nav className="bg-transparent">
      <div className="mx-auto flex max-w-md items-center justify-around px-6 py-3 text-white">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs font-semibold transition ${
                isActive ? 'text-red-400' : 'text-white/80 hover:text-white'
              }`
            }
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav;
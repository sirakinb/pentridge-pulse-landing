import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '../../src/components/ui/navigation-menu';
import { Button } from '../../src/components/ui/button';
import { navItems } from '../lib/nav-items';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Your Logo</span>
          </div>
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={item.to}
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button className="ml-4">Book Call</Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.to}
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                <span className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <Button className="w-full">Book Call</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
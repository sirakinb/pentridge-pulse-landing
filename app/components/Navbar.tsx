import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '../../src/components/ui/navigation-menu';
import { Button } from '../../src/components/ui/button';
import { navItems, NavItem } from '../lib/nav-items';
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu>
          <div className="relative z-50 flex w-full items-center justify-between py-4">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Your Logo</span>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <div className={`md:flex ${isOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
              <NavigationMenuList className="flex flex-col md:flex-row list-none items-start md:items-center justify-start md:justify-center space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
                {navItems.map((item: NavItem, index: number) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={item.to}
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
              <div className="md:hidden mt-4 px-4 pb-4">
                <Button className="w-full">Book Call</Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Button>Book Call</Button>
            </div>
          </div>
        </NavigationMenu>
      </div>
    </nav>
  );
}

export default Navbar;
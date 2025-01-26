import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CgProfile } from 'react-icons/cg';
import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext.jsx';

export default function ProfileMenu({  user }) {
  const {logout}=useContext(AuthContext);

    return (
        <Menu as="div" className="relative ml-3">
            <MenuButton className="relative flex rounded-full text-sm focus:outline-none">
                <CgProfile size={36} />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <MenuItem>
                    <p className="text-center font-semibold text-lg">
                        {user?.username}
                    </p>
                </MenuItem>
                <MenuItem>
                    <a
                        href="/users/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                        Your Profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                        Settings
                    </a>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={logout}
                        className="block px-4 py-2 text-base text-black hover:bg-gray-500"
                        role="menuitem"
                    >
                        Logout
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

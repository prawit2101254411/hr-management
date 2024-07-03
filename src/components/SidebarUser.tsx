'use client';
import { menus, menuhr, type Item } from '@/utils/menu';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import { AlignLeft, AlignRight, User } from 'lucide-react';
import clsx from 'clsx';
import Signout from './Signout';


export function SidebarUser({ session }: any) {
    // console.log(session)
    let menu = menus

    const role = session?.user.role
    if (role == "HR" || role == "ADMIN") {
        menu = menuhr;
    } if (role == "USER") {
        menu = menus;
    } else {
    }
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
        <div className="fixed top-0 z-10 flex w-full flex-col border-b shadow-md shadow-gray-300 border-gray-500 bg-white lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-100 ">
            <div className=" items-center px-4 lg:h-auto bg-opacity-25">
                <Link
                    href="#"
                    className="group flex w-full items-center gap-x-2.5"
                    onClick={close}
                >
                    {/* <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
                    </div> */}
                </Link>
            </div>
            <button
                type="button"
                className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* <div className="font-medium text-gray-800 group-hover:text-gray-400">
                    Menu
                </div> */}
                {isOpen ? (
                    <AlignLeft className="block w-6 text-gray-400" />
                ) : (
                    <AlignRight className="block w-6 text-gray-400" />
                )}
            </button>

            <div
                className={clsx('lg:static lg:block', {
                    'fixed inset-x-0 bottom-0 top-14 mt-px bg-white': isOpen,
                    hidden: !isOpen,
                })}
            >
                <nav className=" space-y-6 px-2 pb-24 pt-5 ">
                    <div className=' pt-5 relative h-40 w-40'>
                        <img
                            className="rounded-full object-cover "
                            src={session?.user.image} alt="Trulli"
                        />
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                    </div>
                    <div className=' ml-10 text-xl font-bold'>{session?.user.name}</div>

                    {menu.map((section) => {
                        return (
                            <div key={section.name}>
                                <div className=" group mb-2 px-3 text-md font-semibold uppercase tracking-wider text-gray-300/80">
                                    <div>{section.name}</div>
                                    <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-60 text-white py-1 px-2 rounded mt-2">
                                        {section.Description}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <GlobalNavItem key={item.slug} item={item} close={close} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <Signout />
                </nav>
            </div>
        </div>
    );
}

function GlobalNavItem({item,close,}: {item: Item; close: () => false | void;}) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;

    return (
        <Link
            onClick={close}
            href={`/${item.slug}`}
            className={clsx(
                'group block rounded-md px-3 py-2 text-ms text-black hover:bg-gray-100 hover:text-blue-500 hover:text-lg hover:shadow-md',
                {
                    'text-gray-900  ': !isActive,
                    'text-white': isActive,
                },
            )}
        >
            <div>
                {item.name}
            </div>
            {/* <div className=" fixed ml-20 hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-25 text-opacity-60 text-white py-1 px-2 rounded mt-2">
                {item.description}
            </div> */}
        </Link>
    );
}

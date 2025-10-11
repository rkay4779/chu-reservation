// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
// import { type NavItem } from '@/types';
// import { Link } from '@inertiajs/react';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
// import AppLogo from './app-logo';
// import ThemeToggle from '@/components/ThemeToggle';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon" variant="inset">
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link href={dashboard()} prefetch>
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain items={mainNavItems} />
//             </SidebarContent>
//             <SidebarFooter className="flex flex-col gap-4 items-center p-4">
//         {/* 🌗 Theme Toggle */}
//         <div className="flex items-center gap-2 w-full justify-center">
//           {/* Will show only when sidebar is expanded */}
//           <span className="text-sm text-gray-700 dark:text-gray-300 hidden sidebar-expanded:inline">
//             Mode
//           </span>
//           <ThemeToggle />
//         </div>

//         {/* 👤 User info */}
//          {/*<NavUser />*/}
//       </SidebarFooter>

//             <SidebarFooter>
//                 {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }
// resources/js/components/app-sidebar.tsx
// resources/js/components/app-sidebar.tsx
import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Folder, BookOpen, Users, Home, Calendar } from 'lucide-react';
import AppLogo from './app-logo';
import ThemeToggle from '@/components/ThemeToggle';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

// small local type
type LocalNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
};

// normalize role: remove accents, lowercase, trim
function normalizeRole(raw?: string): string {
  if (!raw) return '';
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// read cookie helper
function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

export function AppSidebar() {
  const page = usePage<{ auth?: { user?: { profil?: { libelle?: string } } } }>();
  const rawRole = page.props.auth?.user?.profil?.libelle ?? '';
  const userRole = normalizeRole(rawRole);

  const menus: Record<string, LocalNavItem[]> = {
    admin: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
      { title: 'Ajouter Utilisateur', href: '/admin/users/create', icon: Users },
      { title: 'Hopitaux', href: '/admin/hopitaux', icon: Home },
      { title: 'Salles', href: '/admin/salles', icon: Folder },
    ],
    secretaire: [
      { title: 'Dashboard', href: '/secretaire/dashboard', icon: LayoutGrid },
      { title: 'Demandes', href: '/secretaire/demandes', icon: Calendar },
      { title: 'Mes salles', href: '/secretaire/salles', icon: Folder },
    ],
    utilisateur: [
      { title: 'Dashboard', href: '/utilisateur/dashboard', icon: LayoutGrid },
      { title: 'Nouvelle demande', href: '/demandes/create', icon: Folder },
      { title: 'Historique', href: '/demandes/historique', icon: BookOpen },
    ],
    default: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    ],
  };

  const items = menus[userRole] ?? menus.default;

  // whether sidebar is expanded: local state driven by cookie/localStorage/document class
  const [expanded, setExpanded] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      const cookie = readCookie('sidebar_state');
      if (cookie === 'true') return true;
      // fallback to localStorage key many apps use
      try {
        const ls = localStorage.getItem('sidebar_state');
        if (ls === 'true') return true;
      } catch (e) { /* ignore */ }
      // fallback to existing document class
      return document.documentElement.classList.contains('sidebar-expanded');
    }
    return false;
  });

  // keep a ref to avoid unnecessary setState calls
  const lastValRef = useRef<boolean>(expanded);

  useEffect(() => {
    // function that determines current expanded state by looking at cookie/localStorage/doc class
    const computeExpanded = (): boolean => {
      try {
        const cookieVal = readCookie('sidebar_state');
        if (cookieVal === 'true') return true;
        if (cookieVal === 'false') return false;

        const ls = localStorage.getItem('sidebar_state');
        if (ls === 'true') return true;
        if (ls === 'false') return false;

        return document.documentElement.classList.contains('sidebar-expanded');
      } catch (e) {
        return document.documentElement.classList.contains('sidebar-expanded');
      }
    };

    const sync = () => {
      const val = computeExpanded();
      if (val !== lastValRef.current) {
        lastValRef.current = val;
        setExpanded(val);
        // also keep document class in sync (good for other code expecting it)
        if (val) document.documentElement.classList.add('sidebar-expanded');
        else document.documentElement.classList.remove('sidebar-expanded');
      }
    };

    // run immediately
    sync();

    // poll every 300ms — cheap and reliable if another component toggles cookie/localStorage
    const timer = setInterval(sync, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <nav className="px-2 py-1">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="mb-1">
                <Link
                  href={it.href}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                  as="a"
                >
                  {/* <-- CHANGE: icon size fixed so it stays identical when collapsed */}
                  <Icon className="w-6 h-6" />

                  {/* title shown only when expanded */}
                  <span className={expanded ? 'ml-2 inline text-sm' : 'ml-2 hidden'}>{it.title}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-4 items-center p-4">
        <div className="flex items-center gap-2 w-full justify-center">
          <span className={expanded ? 'text-sm text-gray-700 dark:text-gray-300 inline' : 'hidden'}>Mode</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

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
import { useEffect, useRef, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LayoutGrid, Folder, BookOpen, Users, Home, Calendar, FolderCheck, CalendarIcon, CalendarPlus, CalendarCheck } from 'lucide-react';
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

type LocalNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
};

function normalizeRole(raw?: string): string {
  if (!raw) return '';
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

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
      { title: 'Liste Utilisateurs', href: '/admin/users', icon: Users },
      { title: 'Ajouter Hôpital', href: '/admin/hopitaux/create', icon: Home },
      { title: 'Ajouter salle', href: '/admin/salles/create', icon: Folder },
      { title: 'Affectation Salle - Secrétaire', href: '/admin/secretairesalle/affectersecretaire', icon: FolderCheck },
      { title: 'Gestion Jours Fériés', icon: CalendarIcon, href: '/admin/joursferies/gestion' },
      { title: 'Gestion Groupes', href: '/admin/groupes', icon: Users }
    ],
    secretaire: [
      { title: 'Dashboard', href: '/secretaire/dashboard', icon: LayoutGrid },
      { title: 'Gestion des demandes', href: '/secretaire/demandes/demandes', icon: Calendar },
      { title: 'Mes salles', href: '/secretaire/mes-salles', icon: Folder },
      {
        title: 'Historique des demandes', href: '/secretaire/demandes/historique', icon: BookOpen,
      }

    ],
    utilisateur: [
      { title: 'Dashboard', href: '/utilisateur/dashboard', icon: LayoutGrid },
      { title: 'Nouvelle demande', href: '/utilisateur/demande-reservation', icon: CalendarPlus },
      {
        title: 'Consultation des disponibilités', href: '/utilisateur/consultation-disponibilite', icon: CalendarCheck,
      },

      { title: 'Historique', href: '/utilisateur/historique-demandes', icon: BookOpen },
    ],
    default: [{ title: 'Dashboard', href: '/dashboard', icon: LayoutGrid }],
  };

  const items = menus[userRole] ?? menus.default;

  const [expanded, setExpanded] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      const cookie = readCookie('sidebar_state');
      if (cookie === 'true') return true;
      try {
        const ls = localStorage.getItem('sidebar_state');
        if (ls === 'true') return true;
      } catch (e) { }
      return document.documentElement.classList.contains('sidebar-expanded');
    }
    return false;
  });

  const lastValRef = useRef<boolean>(expanded);

  useEffect(() => {
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
        if (val) document.documentElement.classList.add('sidebar-expanded');
        else document.documentElement.classList.remove('sidebar-expanded');
      }
    };

    sync();
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
                  {/* ✅ Icon wrapper to keep same size collapsed or expanded */}
                  <div className="min-w-[24px] min-h-[24px] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className={expanded ? 'ml-2 inline text-sm' : 'ml-2 hidden'}>
                    {it.title}
                  </span>
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

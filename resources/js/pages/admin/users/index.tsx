// import React, { useState } from 'react';
// import { Head, Link, router, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   telephone?: string;
//   profil?: { libelle: string };
//   service?: { libelle: string };
//   specialite?: { libelle: string };
// }

// interface FilterOptions {
//   [key: string]: string | undefined;
//   name?: string;
//   service_id?: string;
//   specialite_id?: string;
// }

// interface PageProps {
//   users: {
//     data: User[];
//     links: { url: string | null; label: string; active: boolean }[];
//   };
//   filters: FilterOptions;
//   services: { id: number; libelle: string }[];
//   specialites: { id: number; libelle: string }[];
//   [key: string]: any;
// }

// const UserIndex: React.FC = () => {
//   const { users, filters, services, specialites } = usePage<PageProps>().props;

//   const [formFilters, setFormFilters] = useState<FilterOptions>({
//     name: filters.name || '',
//     service_id: filters.service_id || '',
//     specialite_id: filters.specialite_id || '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormFilters({ ...formFilters, [name]: value });
//   };

//   const handleSearch = () => {
//     router.get('/admin/users', formFilters, {
//       preserveScroll: true,
//     });
//   };

//   return (
//     <AppLayout breadcrumbs={[{ title: 'Utilisateurs', href: '/admin/users' }]}>
//       <Head title="Liste des utilisateurs" />

//       <div className="container mx-auto p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold">Utilisateurs</h1>
//           <Link
//             href="/admin/users/create"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
//           >
//             + Ajouter
//           </Link>
//         </div>

//         {/* Search and Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <input
//             type="text"
//             name="name"
//             value={formFilters.name}
//             onChange={handleChange}
//             placeholder="Rechercher par nom"
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           />

//           <select
//             name="service_id"
//             value={formFilters.service_id}
//             onChange={handleChange}
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           >
//             <option value="">-- Filtrer par service --</option>
//             {services.map((s) => (
//               <option key={s.id} value={s.id.toString()}>
//                 {s.libelle}
//               </option>
//             ))}
//           </select>

//           <select
//             name="specialite_id"
//             value={formFilters.specialite_id}
//             onChange={handleChange}
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           >
//             <option value="">-- Filtrer par spécialité --</option>
//             {specialites.map((s) => (
//               <option key={s.id} value={s.id.toString()}>
//                 {s.libelle}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleSearch}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
//           >
//             🔍 Rechercher
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200 dark:border-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 text-left">Nom</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Téléphone</th>
//                 <th className="px-4 py-2 text-left">Profil</th>
//                 <th className="px-4 py-2 text-left">Service</th>
//                 <th className="px-4 py-2 text-left">Spécialité</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.data.map((user) => (
//                 <tr key={user.id} className="border-t dark:border-gray-700">
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user.telephone || '-'}</td>
//                   <td className="px-4 py-2">{user.profil?.libelle || '-'}</td>
//                   <td className="px-4 py-2">{user.service?.libelle || '-'}</td>
//                   <td className="px-4 py-2">{user.specialite?.libelle || '-'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex flex-wrap gap-2">
//           {users.links.map((link, index) =>
//             link.url ? (
//               <Link
//                 key={index}
//                 href={link.url}
//                 className={`px-3 py-1 rounded-md ${
//                   link.active
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
//                 }`}
//               >
//                 <span dangerouslySetInnerHTML={{ __html: link.label }} />
//               </Link>
//             ) : (
//               <span key={index} className="px-3 py-1 text-gray-400">
//                 <span dangerouslySetInnerHTML={{ __html: link.label }} />
//               </span>
//             )
//           )}
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default UserIndex;
// import React, { useState } from 'react';
// import { Head, Link, router, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';


// interface User {
//   id: number;
//   name: string;
//   email: string;
//   telephone?: string;
//   profil?: { libelle: string };
//   service?: { libelle: string };
//   specialite?: { libelle: string };
// }

// interface FilterOptions {
//   [key: string]: string | undefined;
//   name?: string;
//   service_id?: string;
//   specialite_id?: string;
//   profil_id?: string;
// }

// interface PageProps {
//   users: {
//     data: User[];
//     links: { url: string | null; label: string; active: boolean }[];
//   };
//   filters: FilterOptions;
//   services: { id: number; libelle: string }[];
//   specialites: { id: number; libelle: string }[];
//   profils: { id: number; libelle: string }[];
//   [key: string]: any;
// }

// const UserIndex: React.FC = () => {
//   const { users, filters, services, specialites, profils } = usePage<PageProps>().props;

//   const [formFilters, setFormFilters] = useState<FilterOptions>({
//     name: filters.name || '',
//     service_id: filters.service_id || '',
//     specialite_id: filters.specialite_id || '',
//     profil_id: filters.profil_id || '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormFilters({ ...formFilters, [name]: value });
//   };

//   const handleSearch = () => {
//     router.get('/admin/users', formFilters, {
//       preserveScroll: true,
//     });
//   };

//   return (
//     <AppLayout breadcrumbs={[{ title: 'Utilisateurs', href: '/admin/users' }]}>
//       <Head title="Liste des utilisateurs" />

//       <div className="container mx-auto p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold">Utilisateurs</h1>
//           <Link
//             href="/admin/users/create"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
//           >
//             + Ajouter
//           </Link>
//         </div>

//         {/* Search and Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//           <input
//             type="text"
//             name="name"
//             value={formFilters.name}
//             onChange={handleChange}
//             placeholder="Rechercher par nom"
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           />

//           <select
//             name="profil_id"
//             value={formFilters.profil_id}
//             onChange={handleChange}
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           >
//             <option value="">-- Filtrer par profil --</option>
//             {profils.map((p) => (
//               <option key={p.id} value={p.id.toString()}>
//                 {p.libelle}
//               </option>
//             ))}
//           </select>

//           <select
//             name="service_id"
//             value={formFilters.service_id}
//             onChange={handleChange}
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           >
//             <option value="">-- Filtrer par service --</option>
//             {services.map((s) => (
//               <option key={s.id} value={s.id.toString()}>
//                 {s.libelle}
//               </option>
//             ))}
//           </select>

//           <select
//             name="specialite_id"
//             value={formFilters.specialite_id}
//             onChange={handleChange}
//             className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
//           >
//             <option value="">-- Filtrer par spécialité --</option>
//             {specialites.map((s) => (
//               <option key={s.id} value={s.id.toString()}>
//                 {s.libelle}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleSearch}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
//           >
//             🔍 Rechercher
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200 dark:border-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 text-left">Nom</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Téléphone</th>
//                 <th className="px-4 py-2 text-left">Profil</th>
//                 <th className="px-4 py-2 text-left">Service</th>
//                 <th className="px-4 py-2 text-left">Spécialité</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.data.map((user) => (
//                 <tr key={user.id} className="border-t dark:border-gray-700">
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user.telephone || '-'}</td>
//                   <td className="px-4 py-2">{user.profil?.libelle || '-'}</td>
//                   <td className="px-4 py-2">{user.service?.libelle || '-'}</td>
//                   <td className="px-4 py-2">{user.specialite?.libelle || '-'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex flex-wrap gap-2">
//           {users.links.map((link, index) =>
//             link.url ? (
//               <Link
//                 key={index}
//                 href={link.url}
//                 className={`px-3 py-1 rounded-md ${
//                   link.active
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
//                 }`}
//               >
//                 <span dangerouslySetInnerHTML={{ __html: link.label }} />
//               </Link>
//             ) : (
//               <span key={index} className="px-3 py-1 text-gray-400">
//                 <span dangerouslySetInnerHTML={{ __html: link.label }} />
//               </span>
//             )
//           )}
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default UserIndex;
import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import DataExport from '@/components/DataExport';

interface User {
  id: number;
  name: string;
  email: string;
  telephone?: string;
  profil?: { libelle: string };
  service?: { libelle: string };
  specialite?: { libelle: string };
}

interface FilterOptions {
  [key: string]: string | undefined;
  name?: string;
  service_id?: string;
  specialite_id?: string;
  profil_id?: string;
}

interface PageProps {
  users: {
    data: User[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: FilterOptions;
  services: { id: number; libelle: string }[];
  specialites: { id: number; libelle: string }[];
  profils: { id: number; libelle: string }[];
  [key: string]: any;
}

const UserIndex: React.FC = () => {
  const { users, filters, services, specialites, profils } = usePage<PageProps>().props;

  const [formFilters, setFormFilters] = useState<FilterOptions>({
    name: filters.name || '',
    service_id: filters.service_id || '',
    specialite_id: filters.specialite_id || '',
    profil_id: filters.profil_id || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormFilters({ ...formFilters, [name]: value });
  };

  const handleSearch = () => {
    router.get('/admin/users', formFilters, {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Utilisateurs', href: '/admin/users' }]}>
      <Head title="Liste des utilisateurs" />

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Liste des utilisateurs</h1>
          <Link
            href="/admin/users/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            + Ajouter
          </Link>
        </div>

        {/* Export Buttons Under Table */}
        <div className="flex justify-end mb-4">
          <DataExport
            data={users.data}
            filename="Liste_Utilisateurs"
            title="Liste des Utilisateurs"
            columns={[
              { label: 'Nom', accessor: 'name' },
              { label: 'Email', accessor: 'email' },
              { label: 'Téléphone', accessor: 'telephone' },
              { label: 'Profil', accessor: (row) => row.profil?.libelle || '-' },
              { label: 'Service', accessor: (row) => row.service?.libelle || '-' },
              { label: 'Spécialité', accessor: (row) => row.specialite?.libelle || '-' },
            ]}
          />
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formFilters.name}
            onChange={handleChange}
            placeholder="Rechercher par nom"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
          />

          <select
            name="profil_id"
            value={formFilters.profil_id}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
          >
            <option value="">-- Filtrer par profil --</option>
            {profils.map((p) => (
              <option key={p.id} value={p.id.toString()}>
                {p.libelle}
              </option>
            ))}
          </select>

          <select
            name="service_id"
            value={formFilters.service_id}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
          >
            <option value="">-- Filtrer par service --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id.toString()}>
                {s.libelle}
              </option>
            ))}
          </select>

          <select
            name="specialite_id"
            value={formFilters.specialite_id}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 rounded-md"
          >
            <option value="">-- Filtrer par spécialité --</option>
            {specialites.map((s) => (
              <option key={s.id} value={s.id.toString()}>
                {s.libelle}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            🔍 Rechercher
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
                <th className="px-4 py-2 text-left">Profil</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Spécialité</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user) => (
                <tr key={user.id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.telephone || '-'}</td>
                  <td className="px-4 py-2">{user.profil?.libelle || '-'}</td>
                  <td className="px-4 py-2">{user.service?.libelle || '-'}</td>
                  <td className="px-4 py-2">{user.specialite?.libelle || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-wrap gap-2">
          {users.links.map((link, index) =>
            link.url ? (
              <Link
                key={index}
                href={link.url}
                className={`px-3 py-1 rounded-md ${
                  link.active
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
              </Link>
            ) : (
              <span key={index} className="px-3 py-1 text-gray-400">
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
              </span>
            )
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default UserIndex;

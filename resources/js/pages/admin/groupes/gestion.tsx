// import React, { useEffect, useState } from 'react';
// import { router } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import DataExport from '@/components/DataExport';
// import { Card } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Trash } from 'lucide-react';
// import { usePage } from '@inertiajs/react';





// interface Relation {
//   id: number;
//   libelle: string;
// }

// interface User {
//   id: number;
//   name: string;
//   service?: Relation | null;
//   specialite?: Relation | null;
//   profil?: Relation | null;
// }

// interface Groupe {
//   id: number;
//   nom: string;
//   utilisateurs: User[];
// }

// interface Props {
//   groupes: Groupe[];
//   users: User[];
// }

// export default function GestionGroupes({ groupes, users }: Props) {
//   const [formVisible, setFormVisible] = useState(true);
//   const [nom, setNom] = useState('');
//   const [recherche, setRecherche] = useState('');
//   const [resultats, setResultats] = useState<User[]>([]);
//   const [selectionnes, setSelectionnes] = useState<User[]>([]);

//   const { props } = usePage<{
//   flash?: {
//     [key: string]: any;
//     success?: string;
//   };
// }>();

// const success = props.flash?.success;

//   // 🔎 Filtrage sécurisé (évite les crashs)
//   useEffect(() => {
//     if (recherche.trim() === '') {
//       setResultats([]);
//     } else {
//       const lowerSearch = recherche.toLowerCase();

//       const res = users.filter((u) =>
//         (u.name?.toLowerCase() ?? '').includes(lowerSearch) ||
//         (u.service?.libelle?.toLowerCase() ?? '').includes(lowerSearch) ||
//         (u.specialite?.libelle?.toLowerCase() ?? '').includes(lowerSearch) ||
//         (u.profil?.libelle?.toLowerCase() ?? '').includes(lowerSearch)
//       );

//       setResultats(res);
//     }
//   }, [recherche, users]);

//   const ajouterUtilisateur = (user: User) => {
//     if (!selectionnes.find((u) => u.id === user.id)) {
//       setSelectionnes([...selectionnes, user]);
//     }
//   };

//   const retirerUtilisateur = (id: number) => {
//     setSelectionnes(selectionnes.filter((u) => u.id !== id));
//   };

//   const handleSubmit = () => {
//     router.post(
//       '/admin/groupes',
//       {
//         nom,
//         utilisateurs: selectionnes.map((u) => u.id),
//       },
//       {
//         onSuccess: () => {
//           setNom('');
//           setRecherche('');
//           setSelectionnes([]);
//         },
//       }
//     );
//   };

//   return (
//     <AppLayout>
//       <div className="p-4 space-y-4">
//         {success && (
//   <div className="bg-green-100 text-green-800 p-3 rounded-md border border-green-300">
//     {success}
//   </div>
// )}
//         <Button variant="outline" onClick={() => setFormVisible(!formVisible)}>
//           {formVisible ? 'Afficher la liste' : 'Créer un groupe'}
//         </Button>

//         {formVisible ? (
//           <Card className="p-4 space-y-4">
//             <Input
//               placeholder="Nom du groupe"
//               value={nom}
//               onChange={(e) => setNom(e.target.value)}
//             />
//             <Input
//               placeholder="Rechercher par nom, service, spécialité ou profil..."
//               value={recherche}
//               onChange={(e) => setRecherche(e.target.value)}
//             />

//             <div className="space-y-2">
//               {resultats.map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex justify-between items-center border p-2 rounded"
//                 >
//                   <span>
//                     {user.name} (
//                     {user.profil?.libelle ?? '—'}, {user.service?.libelle ?? '—'},{' '}
//                     {user.specialite?.libelle ?? '—'})
//                   </span>
//                   <Button size="sm" onClick={() => ajouterUtilisateur(user)}>
//                     Ajouter
//                   </Button>
//                 </div>
//               ))}
//             </div>

//             <Separator />

//             <h3 className="text-lg font-semibold">Utilisateurs sélectionnés</h3>
//             <ul className="space-y-1">
//               {selectionnes.map((u) => (
//                 <li key={u.id} className="flex justify-between items-center">
//                   <span>{u.name}</span>
//                   <Button
//                     size="icon"
//                     variant="destructive"
//                     onClick={() => retirerUtilisateur(u.id)}
//                   >
//                     <Trash className="w-4 h-4" />
//                   </Button>
//                 </li>
//               ))}
//             </ul>

//             <Button className="mt-4" onClick={handleSubmit}>
//               Créer le groupe
//             </Button>
//           </Card>
//         ) : (
//           <div className="space-y-6">
//             {groupes.map((groupe) => (
//               <Card key={groupe.id} className="p-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-bold">
//                     {groupe.nom} ({groupe.utilisateurs.length} utilisateurs)
//                   </h2>
//                   <DataExport
//                     data={groupe.utilisateurs.map((u) => ({
//                       id: u.id,
//                       name: u.name,
//                       profil: u.profil?.libelle ?? '',
//                       service: u.service?.libelle ?? '',
//                       specialite: u.specialite?.libelle ?? '',
//                     }))}
//                     filename={`groupe-${groupe.nom}`}
//                     columns={[
//                       { label: 'ID', accessor: 'id' },
//                       { label: 'Nom', accessor: 'name' },
//                       { label: 'Profil', accessor: 'profil' },
//                       { label: 'Service', accessor: 'service' },
//                       { label: 'Spécialité', accessor: 'specialite' },
//                     ]}
//                     title={`Groupe ${groupe.nom}`}
//                   />
//                   <Button
//   variant="destructive"
//   size="sm"
//   onClick={() => {
//     if (confirm(`Supprimer le groupe "${groupe.nom}" ?`)) {
//       router.delete(`/admin/groupes/${groupe.id}`);
//     }
//   }}
//   className="mt-2"
// >
//   Supprimer le groupe
// </Button>

//                 </div>
//                 <Separator className="my-2" />
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="text-left">
//                       <th>Nom</th>
//                       <th>Profil</th>
//                       <th>Service</th>
//                       <th>Spécialité</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {groupe.utilisateurs.map((u) => (
//                       <tr key={u.id}>
//                         <td>{u.name}</td>
//                         <td>{u.profil?.libelle ?? '—'}</td>
//                         <td>{u.service?.libelle ?? '—'}</td>
//                         <td>{u.specialite?.libelle ?? '—'}</td>
//                         <td>
//                           <Button
//                             variant="destructive"
//                             size="icon"
//                             onClick={() =>
//                               router.delete(
//                                 `/admin/groupes/${groupe.id}/utilisateurs/${u.id}`
//                               )
//                             }
//                           >
//                             <Trash className="w-4 h-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// }
import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DataExport from '@/components/DataExport';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Relation {
  id: number;
  libelle: string;
}

interface User {
  id: number;
  name: string;
  service?: Relation | null;
  specialite?: Relation | null;
  profil?: Relation | null;
}

interface Groupe {
  id: number;
  nom: string;
  utilisateurs: User[];
}

interface Props {
  groupes: Groupe[];
  users: User[];
}

export default function GestionGroupes({ groupes, users }: Props) {
  const [formVisible, setFormVisible] = useState(true);
  const [nom, setNom] = useState('');
  const [recherche, setRecherche] = useState('');
  const [resultats, setResultats] = useState<User[]>([]);
  const [selectionnes, setSelectionnes] = useState<User[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroupeId, setSelectedGroupeId] = useState<number | null>(null);
  const [selectedGroupeName, setSelectedGroupeName] = useState<string>('');

  const { props } = usePage<{
    flash?: {
      [key: string]: any;
      success?: string;
    };
  }>();

  const success = props.flash?.success;

  useEffect(() => {
    if (recherche.trim() === '') {
      setResultats([]);
    } else {
      const lowerSearch = recherche.toLowerCase();
      const res = users.filter((u) =>
        (u.name?.toLowerCase() ?? '').includes(lowerSearch) ||
        (u.service?.libelle?.toLowerCase() ?? '').includes(lowerSearch) ||
        (u.specialite?.libelle?.toLowerCase() ?? '').includes(lowerSearch) ||
        (u.profil?.libelle?.toLowerCase() ?? '').includes(lowerSearch)
      );
      setResultats(res);
    }
  }, [recherche, users]);

  const ajouterUtilisateur = (user: User) => {
    if (!selectionnes.find((u) => u.id === user.id)) {
      setSelectionnes([...selectionnes, user]);
    }
  };

  const retirerUtilisateur = (id: number) => {
    setSelectionnes(selectionnes.filter((u) => u.id !== id));
  };

  const handleSubmit = () => {
    router.post(
      '/admin/groupes',
      {
        nom,
        utilisateurs: selectionnes.map((u) => u.id),
      },
      {
        onSuccess: () => {
          setNom('');
          setRecherche('');
          setSelectionnes([]);
        },
      }
    );
  };

  const handleDeleteClick = (groupeId: number, nom: string) => {
    setSelectedGroupeId(groupeId);
    setSelectedGroupeName(nom);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (selectedGroupeId !== null) {
      router.delete(`/admin/groupes/${selectedGroupeId}`);
    }
    setOpenDialog(false);
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md border border-green-300">
            {success}
          </div>
        )}

        <Button variant="outline" onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? 'Afficher la liste' : 'Créer un groupe'}
        </Button>

        {formVisible ? (
          <Card className="p-4 space-y-4">
            <Input
              placeholder="Nom du groupe"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <Input
              placeholder="Rechercher par nom, service, spécialité ou profil..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />

            <div className="space-y-2">
              {resultats.map((user) => (
                <div key={user.id} className="flex justify-between items-center border p-2 rounded">
                  <span>
                    {user.name} ({user.profil?.libelle ?? '—'}, {user.service?.libelle ?? '—'},{' '}
                    {user.specialite?.libelle ?? '—'})
                  </span>
                  <Button size="sm" onClick={() => ajouterUtilisateur(user)}>
                    Ajouter
                  </Button>
                </div>
              ))}
            </div>

            <Separator />

            <h3 className="text-lg font-semibold">Utilisateurs sélectionnés</h3>
            <ul className="space-y-1">
              {selectionnes.map((u) => (
                <li key={u.id} className="flex justify-between items-center">
                  <span>{u.name}</span>
                  <Button size="icon" variant="destructive" onClick={() => retirerUtilisateur(u.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>

            <Button className="mt-4" onClick={handleSubmit}>
              Créer le groupe
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {groupes.map((groupe) => (
              <Card key={groupe.id} className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">
                    {groupe.nom} ({groupe.utilisateurs.length} utilisateurs)
                  </h2>
                  {/* <div className="flex gap-2">
                    <DataExport
                      data={groupe.utilisateurs.map((u) => ({
                        id: u.id,
                        name: u.name,
                        profil: u.profil?.libelle ?? '',
                        service: u.service?.libelle ?? '',
                        specialite: u.specialite?.libelle ?? '',
                      }))}
                      filename={`groupe-${groupe.nom}`}
                      columns={[
                        { label: 'ID', accessor: 'id' },
                        { label: 'Nom', accessor: 'name' },
                        { label: 'Profil', accessor: 'profil' },
                        { label: 'Service', accessor: 'service' },
                        { label: 'Spécialité', accessor: 'specialite' },
                      ]}
                      title={`Groupe ${groupe.nom}`}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(groupe.id, groupe.nom)}
                    >
                      Supprimer le groupe
                    </Button>
                  </div> */}
                  <div className="flex flex-col items-end gap-2">
  {/* Boutons d'exportation au-dessus */}
  <div className="flex gap-2">
    <DataExport
      data={groupe.utilisateurs.map((u) => ({
        id: u.id,
        name: u.name,
        profil: u.profil?.libelle ?? '',
        service: u.service?.libelle ?? '',
        specialite: u.specialite?.libelle ?? '',
      }))}
      filename={`groupe-${groupe.nom}`}
      columns={[
        { label: 'ID', accessor: 'id' },
        { label: 'Nom', accessor: 'name' },
        { label: 'Profil', accessor: 'profil' },
        { label: 'Service', accessor: 'service' },
        { label: 'Spécialité', accessor: 'specialite' },
      ]}
      title={`Groupe ${groupe.nom}`}
    />
  </div>

  {/* Bouton supprimer en dessous */}
  <Button
    variant="destructive"
    size="sm"
    onClick={() => handleDeleteClick(groupe.id, groupe.nom)}
  >
    Supprimer le groupe
  </Button>
</div>

                </div>

                <Separator className="my-2" />
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th>Nom</th>
                      <th>Profil</th>
                      <th>Service</th>
                      <th>Spécialité</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupe.utilisateurs.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.profil?.libelle ?? '—'}</td>
                        <td>{u.service?.libelle ?? '—'}</td>
                        <td>{u.specialite?.libelle ?? '—'}</td>
                        <td>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() =>
                              router.delete(`/admin/groupes/${groupe.id}/utilisateurs/${u.id}`)
                            }
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={confirmDelete}
          message={`Supprimer le groupe "${selectedGroupeName}" ?`}
        />
      </div>
    </AppLayout>
  );
}

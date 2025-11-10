import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import DataExport from '@/components/DataExport';
import { Card } from '@/components/ui/card';

interface Salle {
  nom: string;
}
interface User {
  name: string;
}

interface Demande {
  id: number;
  salle: Salle;
  user: User;
  date_reunion: string;
  heure_debut: string;
  duree: number;
  sujet: string;
  statut: 'attente' | 'validee' | 'refusee';
  motif_refus?: string | null;
}

export default function HistoriqueDemandes() {
  const { demandes } = usePage<{ demandes: Demande[] }>().props;

  // const exportData = demandes.map((d) => ({
  //   salle: d.salle?.nom ?? '',
  //   date_reunion: d.date_reunion,
  //   heure_debut: d.heure_debut,
  //   duree: d.duree + ' min',
  //   sujet: d.sujet,
  //   statut: d.statut,
  //   motif_refus: d.statut === 'refusee' ? d.motif_refus ?? '' : '',
  // }));

  // const columns = [
  //   { label: 'Salle', accessor: 'salle' },
  //   { label: 'Date Réunion', accessor: 'date_reunion' },
  //   { label: 'Heure Début', accessor: 'heure_debut' },
  //   { label: 'Durée', accessor: 'duree' },
  //   { label: 'Sujet', accessor: 'sujet' },
  //   { label: 'Statut', accessor: 'statut' },
  //   { label: 'Motif de Refus', accessor: 'motif_refus' },
  // ];
  const exportData = demandes.map((d) => ({
  utilisateur: d.user?.name ?? '',
  salle: d.salle?.nom ?? '',
  date_reunion: d.date_reunion,
  heure_debut: d.heure_debut,
  duree: d.duree + ' min',
  sujet: d.sujet,
  statut: d.statut,
  motif_refus: d.statut === 'refusee' ? d.motif_refus ?? '' : '',
}));

const columns = [
  { label: 'Utilisateur', accessor: 'utilisateur' }, // ⬅️ new column
  { label: 'Salle', accessor: 'salle' },
  { label: 'Date Réunion', accessor: 'date_reunion' },
  { label: 'Heure Début', accessor: 'heure_debut' },
  { label: 'Durée', accessor: 'duree' },
  { label: 'Sujet', accessor: 'sujet' },
  { label: 'Statut', accessor: 'statut' },
  { label: 'Motif de Refus', accessor: 'motif_refus' },
];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Historique de mes demandes</h1>
          <DataExport
            data={exportData}
            columns={columns}
            filename="historique_demandes"
            title="Historique des demandes"
          />
        </div>

        <Card className="p-4 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Utilisateur</th>
                <th className="text-left p-2">Salle</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Heure</th>
                <th className="text-left p-2">Durée</th>
                <th className="text-left p-2">Sujet</th>
                <th className="text-left p-2">Statut</th>
                <th className="text-left p-2">Motif Refus</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((d) => (
                <tr key={d.id} className="border-b">
                  <td className="p-2">{d.user?.name}</td> 
                  <td className="p-2">{d.salle?.nom}</td>
                  <td className="p-2">{d.date_reunion}</td>
                  <td className="p-2">{d.heure_debut}</td>
                  <td className="p-2">{d.duree} min</td>
                  <td className="p-2">{d.sujet}</td>
                  <td className="p-2 capitalize">
                    {d.statut === 'attente' && <span className="text-yellow-500">En attente</span>}
                    {d.statut === 'validee' && <span className="text-green-500">Validée</span>}
                    {d.statut === 'refusee' && <span className="text-red-500">Refusée</span>}
                  </td>
                  <td className="p-2">{d.statut === 'refusee' ? d.motif_refus : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppLayout>
  );
}
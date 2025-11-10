import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import DataExport from '@/components/DataExport';
import { Card } from '@/components/ui/card';

interface Hopital {
  nom: string;
}

interface Salle {
  id: number;
  nom: string;
  description?: string;
  capacite: number;
  hopital: Hopital;
}

export default function MesSalles() {
  const { salles } = usePage<{ salles: Salle[] }>().props;

  const exportData = salles.map((salle) => ({
    nom_salle: salle.nom,
    capacite: salle.capacite,
    hopital: salle.hopital?.nom ?? '',
  }));

  const columns = [
    { label: 'Nom de la salle', accessor: 'nom_salle' },
    { label: 'Capacité', accessor: 'capacite' },
    { label: 'Hôpital', accessor: 'hopital' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Mes Salles</h1>
          <DataExport
            data={exportData}
            columns={columns}
            filename="mes_salles"
            title="Mes Salles (secrétaire)"
          />
        </div>

        <Card className="p-4 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nom</th>
                <th className="text-left p-2">Capacité</th>
                <th className="text-left p-2">Hôpital</th>
              </tr>
            </thead>
            <tbody>
              {salles.map((salle) => (
                <tr key={salle.id} className="border-b">
                  <td className="p-2">{salle.nom}</td>
                  <td className="p-2">{salle.capacite}</td>
                  <td className="p-2">{salle.hopital?.nom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppLayout>
  );
}

// export default function MesSalles({ salles }: { salles: any[] }) {
//   console.log('Salles reçues:', salles);

//   return (
//     <div className="bg-red-500 text-white p-10">
//       <h1 className="text-2xl">Test direct sans AppLayout</h1>
//     </div>
//   );
// }




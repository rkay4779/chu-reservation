import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';

interface Salle {
  id: number;
  nom: string;
}

interface Reservation {
  salle_id: number;
  heure_debut: string;
  duree: number;
  statut: 'attente' | 'validee' | 'refusee';
}

interface Hopital {
  id: number;
  nom: string;
}

interface Props {
  salles: Salle[];
  reservations: Reservation[];
  date: string;
  hopitaux: Hopital[];
  selectedHopitalId: number | null;
}

export default function ConsultationDisponibilite({ salles, reservations, date, hopitaux, selectedHopitalId }: Props) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [hopitalId, setHopitalId] = useState<number | null>(selectedHopitalId);

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const handleFilter = () => {
    router.get('/utilisateur/consultation-disponibilite', {
      date: selectedDate,
      hopital_id: hopitalId,
    });
  };

  const getReservationColor = (salleId: number, hour: string) => {
    const h = parseInt(hour.split(':')[0]);
    const found = reservations.find((r) => {
      if (r.salle_id !== salleId) return false;
      const start = parseInt(r.heure_debut.split(':')[0]);
      const end = start + r.duree / 60;
      return h >= start && h < end;
    });

    if (!found) return '';
    if (found.statut === 'validee') return 'bg-green-600';
    if (found.statut === 'attente') return 'bg-yellow-400';
    return '';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold">Consultation des Réservations</h1>

          <div className="flex items-center gap-2">
            <select
              className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
              value={hopitalId ?? ''}
              onChange={(e) => setHopitalId(Number(e.target.value))}
            >
              <option value="">-- Sélectionner un hôpital --</option>
              {hopitaux.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.nom}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <button
              onClick={handleFilter}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Filtrer
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Légende :</strong>{' '}
          <span className="inline-block w-4 h-4 bg-green-600 mr-1 rounded-sm" /> Validée
          <span className="inline-block w-4 h-4 bg-yellow-400 ml-4 mr-1 rounded-sm" /> En attente
          <span className="inline-block w-4 h-4 border border-gray-400 ml-4 mr-1 rounded-sm" /> Disponible
        </div>

        <Card className="p-4 overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Salle / Heure</th>
                {hours.map((hour) => (
                  <th key={hour} className="text-left p-2">
                    {hour}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salles.map((salle) => (
                <tr key={salle.id} className="border-b">
                  <td className="p-2 font-semibold">{salle.nom}</td>
                  {hours.map((hour) => (
                    <td
                      key={hour}
                      className={`p-2 border border-gray-200 dark:border-gray-700 ${getReservationColor(
                        salle.id,
                        hour
                      )}`}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppLayout>
  );
}

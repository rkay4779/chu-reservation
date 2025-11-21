import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard() {
  const { latestDemandes }: any = usePage().props;
  //   const [dismissed, setDismissed] = useState<number[]>([]);

  //   const handleDismiss = (id: number) => {
  //     setDismissed((prev) => [...prev, id]);
  //   };
  // --- Gestion des notifications persistantes ---
  const [dismissed, setDismissed] = useState<number[]>(() => {
    const stored = localStorage.getItem('dismissedNotifications');
    return stored ? JSON.parse(stored) : [];
  });

  const handleDismiss = (id: number) => {
    const updated = [...dismissed, id];
    setDismissed(updated);
    localStorage.setItem('dismissedNotifications', JSON.stringify(updated));
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="p-6 text-xl font-bold text-gray-900 dark:text-white">
        Dashboard Utilisateur ✅
      </div>

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Notifications Section */}
        <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-black">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Dernières réponses à vos demandes
          </h2>

          {latestDemandes?.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              Aucune demande traitée récemment.
            </p>
          ) : (
            <ul className="space-y-4">
              {latestDemandes
                .filter((demande: any) => !dismissed.includes(demande.id))
                .map((demande: any) => (
                  <li
                    key={demande.id}
                    className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  >
                    <p><strong>Salle :</strong> {demande.nom_salle}</p>
                    <p><strong>Date :</strong> {demande.date_reunion}</p>
                    <p>
                      <strong>Statut :</strong>
                      <span className={`ml-2 font-semibold ${demande.statut === 'validee' ? 'text-green-600' : 'text-red-500'}`}>
                        {demande.statut}
                      </span>
                    </p>
                    {demande.statut === 'refusée' && (
                      <p><strong>Motif du refus :</strong> {demande.motif_refus}</p>
                    )}
                    <button
                      onClick={() => handleDismiss(demande.id)}
                      className="mt-3 inline-block text-sm text-gray-500 hover:text-red-500 underline transition"
                    >
                      Fermer cette notification
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Placeholder Section */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
          ))}
        </div>

        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
      </div>
    </AppLayout>
  );
}


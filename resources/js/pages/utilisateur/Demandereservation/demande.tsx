import { useForm, usePage, Head } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Salle {
  id: number;
  nom: string;
}

interface Groupe {
  id: number;
  nom: string;
  utilisateurs: any[];
}

interface JourFerie {
  id: number;
  date: string;
  description: string;
  type: string;
}

interface Utilisateur {
  id: number;
  name: string;
  email: string;
  profil_id: number;
  profil?: { id: number; libelle: string }; // relation chargée
}


interface PageProps {
  salles: Salle[];
  groupes: Groupe[];
  joursFeries: JourFerie[];
  utilisateurs: any[]; // ou mieux si tu as les types, exemple: Utilisateur[]
  [key: string]: any; // ← pour éviter l’erreur TS2344
}


export default function DemandeReservation() {
  const { salles, groupes, joursFeries, utilisateurs } = usePage<PageProps>().props;

  const { data, setData, post, processing, reset, errors } = useForm({
    salle_id: '',
    date: '',
    heure_debut: '',
    heure_fin: '',
    ordre_du_jour: '',
    materiel: [] as string[],
    autre_materiel: '',
    commentaire: '',
    typeParticipant: '',
    valeur: '',
    profilSelectionne: '',
    utilisateurSelectionne: '',
    nouveauNom: '',
    nouveauEmail: '',
    participants: [] as { type: string; valeur: string }[], // ✅ NEW LINE
  });


  const addParticipant = () => {
    let valeur = '';

    if (data.typeParticipant === 'profil' && data.utilisateurSelectionne) {
      valeur = data.utilisateurSelectionne;
    } else if (data.typeParticipant === 'groupe' && data.valeur) {
      valeur = data.valeur;
    } else if (data.typeParticipant === 'nom' && data.valeur) {
      valeur = data.valeur;
    } else if (data.typeParticipant === 'nouveau' && data.nouveauNom && data.nouveauEmail) {
      valeur = `${data.nouveauNom} <${data.nouveauEmail}>`;
    } else {
      return; // Rien à ajouter
    }

    const nouveau = { type: data.typeParticipant, valeur };

    setData('participants', [...data.participants, nouveau]);

    // Reset
    setData('typeParticipant', '');
    setData('valeur', '');
    setData('utilisateurSelectionne', '');
    setData('profilSelectionne', '');
    setData('nouveauNom', '');
    setData('nouveauEmail', '');
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newParticipants: { type: string; valeur: string }[] = [];

    if (data.typeParticipant === 'groupe' && data.valeur) {
      newParticipants.push({ type: 'groupe', valeur: data.valeur });
    }

    if (data.typeParticipant === 'profil' && data.utilisateurSelectionne) {
      newParticipants.push({ type: 'profil', valeur: data.utilisateurSelectionne });
    }

    if (data.typeParticipant === 'nom' && data.valeur) {
      newParticipants.push({ type: 'nom', valeur: data.valeur });
    }

    if (data.typeParticipant === 'nouveau' && data.nouveauNom && data.nouveauEmail) {
      newParticipants.push({
        type: 'nouveau',
        valeur: `${data.nouveauNom} <${data.nouveauEmail}>`,
      });
    }

    console.log('🚀 Participants à envoyer :', newParticipants);



    // ✅ Inertia accepte SEULEMENT 2 arguments : (url, options)
    post(
      '/utilisateur/demande-reservation',
      {
        ...(data as any), // ✅ bypass typage strict
        participants: newParticipants, // ✅ ajouté ici
        onSuccess: () => {
          console.log("✅ Participants envoyés avec succès !");
          reset();
        },
        onError: () => {
          console.error("❌ Erreur lors de l'envoi du formulaire");
        },
      } as any // ✅ 2e sécurité : empêche TS de râler sur les clés custom
    );
  };




  return (
    <AppLayout>
      <Head title="Demande de réservation" />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* FORMULAIRE GAUCHE */}
          <div className="w-full md:w-1/2 min-w-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Demande de réservation de salle
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Salle */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">Salle</label>
                <select
                  name="salle_id"
                  value={data.salle_id}
                  onChange={(e) => setData('salle_id', e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">-- Choisir une salle --</option>
                  {salles.map((salle) => (
                    <option key={salle.id} value={salle.id}>
                      {salle.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">Date</label>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setData('date', e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Heure début / fin */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Heure début</label>
                  <input
                    type="time"
                    value={data.heure_debut}
                    onChange={(e) => setData('heure_debut', e.target.value)}
                    className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Heure fin</label>
                  <input
                    type="time"
                    value={data.heure_fin}
                    onChange={(e) => setData('heure_fin', e.target.value)}
                    className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Ordre du jour */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">Ordre du jour</label>
                <input
                  type="text"
                  placeholder="Sujet principal de la réunion"
                  value={data.ordre_du_jour}
                  onChange={(e) => setData('ordre_du_jour', e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Matériel nécessaire */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                  Matériel nécessaire :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-900 dark:text-gray-100">
                  {['Stylo', 'Papier', 'Data Show', 'PC Portable', 'Rallonge', 'Informaticien', 'Cuisine'].map(
                    (item) => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={data.materiel.includes(item)}
                          onChange={(e) => {
                            const selected = [...data.materiel];
                            if (e.target.checked) selected.push(item);
                            else selected.splice(selected.indexOf(item), 1);
                            setData('materiel', selected);
                          }}
                          className="accent-blue-600"
                        />
                        <span>{item}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Autre matériel */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">Autre matériel</label>
                <input
                  type="text"
                  placeholder="Précisez ici le matériel supplémentaire"
                  value={data.autre_materiel}
                  onChange={(e) => setData('autre_materiel', e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Type de participant */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Ajouter participant par :
                </label>
                <select
                  value={data.typeParticipant}
                  onChange={(e) => {
                    setData('typeParticipant', e.target.value);
                    setData('valeur', '');
                    setData('profilSelectionne', '');
                    setData('utilisateurSelectionne', '');
                  }}
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">-- Choisir une méthode --</option>
                  <option value="groupe">Groupe</option>
                  <option value="profil">Profil</option>
                  <option value="nom">Nom</option>
                  <option value="nouveau">Nouveau participant</option>
                </select>
              </div>

              {/* Groupe */}
              {data.typeParticipant === 'groupe' && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mt-2 mb-1">Groupe</label>
                  <select
                    value={data.valeur}
                    onChange={(e) => setData('valeur', e.target.value)}
                    className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">-- Choisir un groupe --</option>
                    {groupes.map((groupe) => (
                      <option key={groupe.id} value={groupe.nom}>
                        {groupe.nom}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Ajouter ce participant
                  </button>

                </div>
              )}
              {/* PROFIL → profil puis utilisateur */}
              {data.typeParticipant === 'profil' && (
                <div className="mt-2">
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Profil</label>
                  <select
                    value={data.profilSelectionne}
                    onChange={(e) => {
                      setData('profilSelectionne', e.target.value);
                      setData('utilisateurSelectionne', ''); // Reset l'utilisateur sélectionné
                    }}
                    className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">-- Choisir un profil --</option>
                    {/* <option value="secretaire">Secrétaire</option> */}
                    <option value="utilisateur">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>

                  {data.profilSelectionne && (
                    <div className="mt-2">
                      <label className="block text-gray-700 dark:text-gray-200 mb-1">
                        Choisir {data.profilSelectionne}
                      </label>
                      <select
                        value={data.utilisateurSelectionne}
                        onChange={(e) => setData('utilisateurSelectionne', e.target.value)}
                        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">-- Sélectionner --</option>
                        {utilisateurs
                          .filter((u) =>
                            u.profil &&
                            u.profil.libelle &&
                            u.profil.libelle.toLowerCase() === data.profilSelectionne.toLowerCase()
                          )
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name} - {user.email}
                            </option>
                          ))}
                      </select>
                      <button
                        type="button"
                        onClick={addParticipant}
                        className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      >
                        Ajouter ce participant
                      </button>
                    </div>
                  )}
                </div>
              )}


              {/* NOM → auto-suggestion */}
              {data.typeParticipant === 'nom' && (
                <div className="mt-2">
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Nom du participant</label>
                  <input
                    type="text"
                    value={data.valeur}
                    onChange={(e) => setData('valeur', e.target.value)}
                    placeholder="Nom du participant"
                    className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                    list="suggestions"
                  />
                  <datalist id="suggestions">
                    {utilisateurs
                      .filter((u) =>
                        `${u.name} ${u.email}`.toLowerCase().includes(data.valeur.toLowerCase())
                      )
                      .map((u) => (
                        <option key={u.id} value={u.name} />
                      ))}
                  </datalist>
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Ajouter ce participant
                  </button>
                </div>
              )}

              {/* NOUVEAU participant */}
              {data.typeParticipant === 'nouveau' && (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-1">Nom</label>
                    <input
                      type="text"
                      value={data.nouveauNom}
                      onChange={(e) => setData('nouveauNom', e.target.value)}
                      placeholder="Nom"
                      className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
                    <input
                      type="email"
                      value={data.nouveauEmail}
                      onChange={(e) => setData('nouveauEmail', e.target.value)}
                      placeholder="Email"
                      className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <input type="hidden" name="profil" value="invite" />
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Ajouter ce participant
                  </button>
                </div>
              )}

              {/* Commentaire */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">Commentaire</label>
                <textarea
                  value={data.commentaire}
                  onChange={(e) => setData('commentaire', e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                  rows={3}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>

          {/* TABLEAU DROITE */}
          <div className="w-full md:w-1/2 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Jours fériés</h3>
            <div className="overflow-x-auto max-w-full">
              <table className="w-full table-fixed border border-collapse border-gray-300 dark:border-gray-700 rounded-md shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white">
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Date</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                      Description
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {joursFeries.map((jf) => (
                    <tr
                      key={jf.id}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-black dark:even:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <td className="border border-gray-300 dark:border-gray-700 p-3">{jf.date}</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">{jf.description}</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3 capitalize">{jf.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

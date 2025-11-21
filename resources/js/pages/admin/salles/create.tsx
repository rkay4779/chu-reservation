import { FormEventHandler } from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface Hopital {
  id: number;
  nom: string;
}

export default function CreateSalle() {
  const { hopitaux, success } = usePage<{ hopitaux: Hopital[]; success?: string }>().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    nom: '',
    description: '',
    capacite: '',
    hopital_id: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/salles', {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Ajouter une Salle" />

      <div className="px-6 py-10 max-w-4xl ml-0">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Ajouter une Salle</h1>

        {/* ✅ Message de succès affiché après création */}
        {success && (
          <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
            ✅ {success}
          </div>
        )}

        <form onSubmit={submit} className="w-full max-w-2xl flex flex-col gap-6">
          {/* Nom */}
          <div>
            <Label htmlFor="nom">Nom de la Salle</Label>
            <Input
              id="nom"
              placeholder="Entrez le nom de la salle"
              value={data.nom}
              onChange={(e) => setData('nom', e.target.value)}
              className="mt-1 block w-full border focus:border-white"
              required
            />
            <InputError message={errors.nom} className="mt-2" />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            {/* <textarea
              id="description"
              placeholder="Entrez une description (optionnelle)"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="mt-1 block w-full rounded-md border border-white bg-black text-white shadow-sm focus:ring focus:ring-white"
              rows={4}
            /> */}
            <textarea
              id="description"
              placeholder="Entrez une description (optionnelle)"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="mt-1 block w-full rounded-md border shadow-sm focus:ring dark:bg-black dark:text-white dark:border-white dark:focus:ring-white"
              rows={4}
            />

            <InputError message={errors.description} className="mt-2" />
          </div>

          {/* Capacité */}
          <div>
            <Label htmlFor="capacite">Capacité</Label>
            <Input
              type="number"
              id="capacite"
              placeholder="Entrez la capacité (nombre de places)"
              value={data.capacite}
              onChange={(e) => setData('capacite', e.target.value)}
              className="mt-1 block w-full border focus:border-white"
              required
            />
            <InputError message={errors.capacite} className="mt-2" />
          </div>

          {/* Hôpital */}
          <div>
            <Label htmlFor="hopital_id">Hôpital</Label>
            {/* <select
              id="hopital_id"
              value={data.hopital_id}
              onChange={(e) => setData('hopital_id', e.target.value)}
              className="mt-1 block w-full rounded-md border border-white bg-black text-white shadow-sm focus:ring focus:ring-white"
              required
            > */}
            <select
              id="hopital_id"
              value={data.hopital_id}
              onChange={(e) => setData('hopital_id', e.target.value)}
              className="mt-1 block w-full rounded-md border shadow-sm focus:ring dark:bg-black dark:text-white dark:border-white dark:focus:ring-white"
              required
            >

              <option value="">-- Sélectionnez un hôpital --</option>
              {hopitaux.map((hopital) => (
                <option key={hopital.id} value={hopital.id}>
                  {hopital.nom}
                </option>
              ))}
            </select>
            <InputError message={errors.hopital_id} className="mt-2" />
          </div>

          {/* Boutons */}
          <div className="flex justify-start gap-4 mt-2">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Réinitialiser
            </Button>
            <Button type="submit" disabled={processing}>
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

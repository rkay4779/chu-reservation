// import { FormEventHandler } from 'react';
// import { useForm, Head } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import InputError from '@/components/input-error';

// export default function CreateHopital() {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     nom: '',
//     description: '',
//   });

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault();
//     post('/hopitaux', {
//       onSuccess: () => reset(),
//     });
//   };

//   return (
//     <AppLayout>
//       <Head title="Ajouter un Hôpital" />

//       <div className="px-6 py-10 mx-auto max-w-7xl">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold dark:text-white">Ajouter un Hôpital</h1>
//         </div>

//         <form
//           onSubmit={submit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background p-6 rounded-lg shadow-md"
//         >
//           <div>
//             <Label htmlFor="nom">Nom de l’Hôpital</Label>
//             <Input
//               id="nom"
//               placeholder="Entrez le nom de l’hôpital"
//               value={data.nom}
//               onChange={(e) => setData('nom', e.target.value)}
//               className="mt-1 block w-full"
//               required
//             />
//             <InputError message={errors.nom} className="mt-2" />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Input
//               id="description"
//               placeholder="Entrez une description (optionnelle)"
//               value={data.description}
//               onChange={(e) => setData('description', e.target.value)}
//               className="mt-1 block w-full"
//             />
//             <InputError message={errors.description} className="mt-2" />
//           </div>

//           <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => reset()}
//               className="bg-muted text-foreground"
//             >
//               Réinitialiser
//             </Button>
//             <Button type="submit" disabled={processing}>
//               Enregistrer
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AppLayout>
//   );
// }
// import { FormEventHandler } from 'react';
// import { useForm, Head } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import InputError from '@/components/input-error';

// export default function CreateHopital() {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     nom: '',
//     description: '',
//   });

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault();
//     post('/hopitaux', {
//       onSuccess: () => reset(),
//     });
//   };

//   return (
//     <AppLayout>
//       <Head title="Ajouter un Hôpital" />

//       <div className="px-6 py-10 max-w-4xl ml-0">
//         <h1 className="text-2xl font-bold mb-6 dark:text-white">Ajouter un Hôpital</h1>

//         <form onSubmit={submit} className="w-full max-w-2xl flex flex-col gap-6">
//           {/* Nom */}
//           <div>
//             <Label htmlFor="nom">Nom de l’Hôpital</Label>
//             <Input
//               id="nom"
//               placeholder="Entrez le nom de l’hôpital"
//               value={data.nom}
//               onChange={(e) => setData('nom', e.target.value)}
//               className="mt-1 block w-full"
//               required
//             />
//             <InputError message={errors.nom} className="mt-2" />
//           </div>

//           {/* Description */}
//           <div>
//             <Label htmlFor="description">Description</Label>
//             <textarea
//               id="description"
//               placeholder="Entrez une description (optionnelle)"
//               value={data.description}
//               onChange={(e) => setData('description', e.target.value)}
//               className="mt-1 block w-full rounded-md border border-input bg-white text-black dark:bg-black dark:text-white shadow-sm focus:ring focus:ring-ring"
//               rows={4}
//             />
//             <InputError message={errors.description} className="mt-2" />
//           </div>

//           {/* Boutons */}
//           <div className="flex justify-start gap-4 mt-2">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => reset()}
//               className="bg-muted text-foreground"
//             >
//               Réinitialiser
//             </Button>
//             <Button type="submit" disabled={processing}>
//               Enregistrer
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AppLayout>
//   );
// }
import { FormEventHandler } from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CreateHopital() {
  const { data, setData, post, processing, errors, reset } = useForm({
    nom: '',
    description: '',
  });

  const { props } = usePage<{ success?: string }>();

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/hopitaux', {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Ajouter un Hôpital" />

      <div className="px-6 py-10 max-w-4xl ml-0">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Ajouter un Hôpital</h1>

        {/* ✅ Message de succès affiché après création */}
        {props.success && (
          <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
            ✅ {props.success}
          </div>
        )}

        <form onSubmit={submit} className="w-full max-w-2xl flex flex-col gap-6">
          <div>
            <Label htmlFor="nom">Nom de l’Hôpital</Label>
            <Input
              id="nom"
              placeholder="Entrez le nom de l’hôpital"
              value={data.nom}
              onChange={(e) => setData('nom', e.target.value)}
              className="mt-1 block w-full border focus:border-white"
              required
            />
            <InputError message={errors.nom} className="mt-2" />
          </div>

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

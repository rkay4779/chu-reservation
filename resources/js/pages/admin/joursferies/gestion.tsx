// import { FormEventHandler, useState } from 'react';
// import { useForm, Head, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import InputError from '@/components/input-error';

// interface JourFerie {
//   id: number;
//   date: string;
//   description: string;
//   type: string;
// }

// export default function GestionJoursFeries() {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     date: '',
//     description: '',
//     type: 'national',
//   });

//   const { props } = usePage<{ joursFeries: JourFerie[]; success?: string }>();
//   const [showForm, setShowForm] = useState(false);

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault();
//     post('/admin/joursferies', {
//       onSuccess: () => {
//         reset();
//         setShowForm(false);
//       },
//     });
//   };

//   return (
//     <AppLayout>
//       <Head title="Gestion des Jours Fériés" />

//       <div className="px-6 py-10 max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 dark:text-white">Gestion des Jours Fériés</h1>

//         {props.success && (
//           <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
//             ✅ {props.success}
//           </div>
//         )}

//         <div className="flex justify-end mb-4">
//           <Button variant="default" onClick={() => setShowForm(!showForm)}>
//             {showForm ? 'Fermer le formulaire' : '+ Ajouter'}
//           </Button>
//         </div>

//         {showForm && (
//           <form onSubmit={submit} className="mb-6 w-full max-w-3xl flex flex-col gap-6">
//             <div>
//               <Label htmlFor="date">Date</Label>
//               <Input
//                 type="date"
//                 id="date"
//                 value={data.date}
//                 onChange={(e) => setData('date', e.target.value)}
//                 required
//               />
//               <InputError message={errors.date} className="mt-2" />
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Input
//                 id="description"
//                 placeholder="Entrez une description"
//                 value={data.description}
//                 onChange={(e) => setData('description', e.target.value)}
//                 required
//               />
//               <InputError message={errors.description} className="mt-2" />
//             </div>

//             <div>
//               <Label htmlFor="type">Type</Label>
//               <select
//                 id="type"
//                 value={data.type}
//                 onChange={(e) => setData('type', e.target.value)}
//                 className="w-full rounded-md border py-2 px-3 dark:bg-black dark:text-white"
//               >
//                 <option value="national">National</option>
//                 <option value="religieux">Religieux</option>
//                 <option value="autre">Autre</option>
//               </select>
//               <InputError message={errors.type} className="mt-2" />
//             </div>

//             <div className="flex justify-start gap-4 mt-2">
//               <Button type="button" variant="secondary" onClick={() => reset()}>
//                 Réinitialiser
//               </Button>
//               <Button type="submit" disabled={processing}>
//                 Enregistrer
//               </Button>
//             </div>
//           </form>
//         )}

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border border-collapse border-gray-300 dark:border-gray-700">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-gray-700">
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {props.joursFeries.map((jf) => (
//                 <tr
//                   key={jf.id}
//                   className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-gray-800"
//                 >
//                   <td className="border p-2">{jf.date}</td>
//                   <td className="border p-2">{jf.description}</td>
//                   <td className="border p-2">{jf.type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }
// import { FormEventHandler, useState } from 'react';
// import { useForm, Head, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import InputError from '@/components/input-error';

// interface JourFerie {
//   id: number;
//   date: string;
//   description: string;
//   type: string;
// }

// export default function GestionJoursFeries() {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     date: '',
//     description: '',
//     type: 'national',
//   });

//   const { props } = usePage<{ joursFeries: JourFerie[]; success?: string }>();
//   const [showForm, setShowForm] = useState(false);

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault();
//     post('/admin/joursferies', {
//       onSuccess: () => {
//         reset();
//         setShowForm(false);
//       },
//     });
//   };

//   return (
//     <AppLayout>
//       <Head title="Gestion des Jours Fériés" />

//       <div className="px-6 py-10 max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 dark:text-white">Gestion des Jours Fériés</h1>

//         {props.success && (
//           <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
//             ✅ {props.success}
//           </div>
//         )}

//         <div className="flex justify-end mb-4">
//           <Button variant="default" onClick={() => setShowForm(!showForm)}>
//             {showForm ? 'Fermer le formulaire' : '+ Ajouter'}
//           </Button>
//         </div>

//         <div className="w-full md:w-1/2 min-w-0">
//   <div className="overflow-x-auto max-w-full">
//     <table className="w-full min-w-full table-fixed border border-collapse border-gray-600 dark:border-gray-700">
//       <thead>
//         <tr className="bg-gray-800 text-white">
//           <th className="border border-gray-700 p-2">Date</th>
//           <th className="border border-gray-700 p-2">Description</th>
//           <th className="border border-gray-700 p-2">Type</th>
//         </tr>
//       </thead>
//       <tbody>
//         {props.joursFeries.map((jf) => (
//           <tr
//             key={jf.id}
//             className="odd:bg-gray-900 even:bg-gray-800 text-white hover:bg-gray-700 transition"
//           >
//             <td className="border border-gray-700 p-2">{jf.date}</td>
//             <td className="border border-gray-700 p-2">{jf.description}</td>
//             <td className="border border-gray-700 p-2 capitalize">{jf.type}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//           {/* FORMULAIRE DROITE */}
//           {showForm && (
//             <form
//               onSubmit={submit}
//               className="md:w-1/3 w-full bg-black border border-gray-700 p-6 rounded-md shadow-md flex flex-col gap-6"
//             >
//               <h2 className="text-lg font-semibold text-white mb-2">Ajouter un Jour Férié</h2>

//               <div>
//                 <Label htmlFor="date" className="text-white">Date</Label>
//                 <Input
//                   type="date"
//                   id="date"
//                   value={data.date}
//                   onChange={(e) => setData('date', e.target.value)}
//                   required
//                 />
//                 <InputError message={errors.date} className="mt-2" />
//               </div>

//               <div>
//                 <Label htmlFor="description" className="text-white">Description</Label>
//                 <Input
//                   id="description"
//                   placeholder="Entrez une description"
//                   value={data.description}
//                   onChange={(e) => setData('description', e.target.value)}
//                   required
//                 />
//                 <InputError message={errors.description} className="mt-2" />
//               </div>

//               <div>
//                 <Label htmlFor="type" className="text-white">Type</Label>
//                 <select
//                   id="type"
//                   value={data.type}
//                   onChange={(e) => setData('type', e.target.value)}
//                   className="w-full rounded-md border py-2 px-3 bg-black text-white border-gray-600"
//                 >
//                   <option value="national">National</option>
//                   <option value="religieux">Religieux</option>
//                   <option value="autre">Autre</option>
//                 </select>
//                 <InputError message={errors.type} className="mt-2" />
//               </div>

//               <div className="flex justify-start gap-4 mt-4">
//                 <Button type="button" variant="secondary" onClick={() => reset()}>
//                   Réinitialiser
//                 </Button>
//                 <Button type="submit" disabled={processing}>
//                   Enregistrer
//                 </Button>
//               </div>
//             </form>
//           )}
//         </div>
//     </AppLayout>
//   );
// }

{/* FORMULAIRE DROITE */}
          {/* {showForm && (
            <div className="w-full md:w-1/2 pl-4 flex justify-center">
              <form
                onSubmit={submit}
                className="w-full bg-black dark:bg-black border border-gray-700 p-6 rounded-md shadow-md flex flex-col gap-6 max-w-md"
              >
                <h2 className="text-lg font-semibold text-white mb-2">Ajouter un Jour Férié</h2>

                <div>
                  <Label htmlFor="date" className="text-white">
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    required
                    className="bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700"
                  />
                  <InputError message={errors.date} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Entrez une description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                    className="bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700"
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="type" className="text-white">
                    Type
                  </Label>
                  <select
                    id="type"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="w-full rounded-md border py-2 px-3 bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700"
                  >
                    <option value="national">National</option>
                    <option value="religieux">Religieux</option>
                    <option value="autre">Autre</option>
                  </select>
                  <InputError message={errors.type} className="mt-2" />
                </div>

                <div className="flex justify-start gap-4 mt-4">
                  <Button type="button" variant="secondary" onClick={() => reset()}>
                    Réinitialiser
                  </Button>
                  <Button type="submit" disabled={processing}>
                    Enregistrer
                  </Button>
                </div>
              </form>
            </div>
          )} */}


// import { FormEventHandler, useState } from 'react';
// import { useForm, Head, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import InputError from '@/components/input-error';

// interface JourFerie {
//   id: number;
//   date: string;
//   description: string;
//   type: string;
// }

// export default function GestionJoursFeries() {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     date: '',
//     description: '',
//     type: 'nationale',
//   });

//   const { props } = usePage<{ joursFeries: JourFerie[]; success?: string }>();
//   const [showForm, setShowForm] = useState(false);

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault();
//     post('/admin/joursferies', {
//       onSuccess: () => {
//         reset();
//         setShowForm(false);
//       },
//     });
//   };

//   return (
//     <AppLayout>
//       <Head title="Gestion des Jours Fériés" />

//       <div className="px-6 py-10 max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 dark:text-white">Gestion des Jours Fériés</h1>

//         {props.success && (
//           <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
//             ✅ {props.success}
//           </div>
//         )}

//         <div className="flex justify-end mb-4">
//           <Button variant="default" onClick={() => setShowForm(!showForm)}>
//             {showForm ? 'Fermer le formulaire' : '+ Ajouter'}
//           </Button>
//         </div>

//         {/* ✅ Zone principale divisée en 2 moitiés */}
//         <div className="flex flex-col md:flex-row w-full">
//           {/* TABLEAU GAUCHE */}
//           <div className="w-full md:w-1/2 min-w-0 pr-4">
//             <div className="overflow-x-auto max-w-full">
//               <table className="w-full min-w-full table-fixed border border-collapse border-gray-300 dark:border-gray-700 rounded-md shadow-md">
//                 <thead>
//                   <tr className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white">
//                     <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Date</th>
//                     <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Description</th>
//                     <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Type</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {props.joursFeries.map((jf) => (
//                     <tr
//                       key={jf.id}
//                       className="odd:bg-white even:bg-gray-50 dark:odd:bg-black dark:even:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                     >
//                       <td className="border border-gray-300 dark:border-gray-700 p-3">{jf.date}</td>
//                       <td className="border border-gray-300 dark:border-gray-700 p-3">{jf.description}</td>
//                       <td className="border border-gray-300 dark:border-gray-700 p-3 capitalize">{jf.type}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {showForm && (
//   <div className="w-full md:w-1/2 pl-4 flex justify-center">
//     <form
//       onSubmit={submit}
//       className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-8 rounded-lg shadow-md flex flex-col gap-6 max-w-2xl"
//     >
//       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//         Ajouter un Jour Férié
//       </h2>

//       <div>
//         <Label htmlFor="date" className="text-gray-800 dark:text-white">
//           Date
//         </Label>
//         <Input
//           type="date"
//           id="date"
//           value={data.date}
//           onChange={(e) => setData('date', e.target.value)}
//           required
//           className="bg-white dark:bg-black text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700"
//         />
//         <InputError message={errors.date} className="mt-2" />
//       </div>

//       <div>
//         <Label htmlFor="description" className="text-gray-800 dark:text-white">
//           Description
//         </Label>
//         <Input
//           id="description"
//           placeholder="Entrez une description"
//           value={data.description}
//           onChange={(e) => setData('description', e.target.value)}
//           required
//           className="bg-white dark:bg-black text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700"
//         />
//         <InputError message={errors.description} className="mt-2" />
//       </div>

//       <div>
//         <Label htmlFor="type" className="text-gray-800 dark:text-white">
//           Type
//         </Label>
//         <select
//           id="type"
//           value={data.type}
//           onChange={(e) => setData('type', e.target.value)}
//           className="w-full rounded-md border py-2 px-3 bg-white dark:bg-black text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
//         >
//         <option value="nationale">Nationale</option>
//   <option value="religieuse">Religieuse</option>
//   <option value="scolaire">Scolaire</option>

//         </select>
//         <InputError message={errors.type} className="mt-2" />
//       </div>

//       <div className="flex justify-start gap-4 mt-4">
//         <Button type="button" variant="secondary" onClick={() => reset()}>
//           Réinitialiser
//         </Button>
//         <Button type="submit" disabled={processing}>
//           Enregistrer
//         </Button>
//       </div>
//     </form>
//   </div>
// )}

//         </div>
//       </div>
//     </AppLayout>
//   );
// }


import { FormEventHandler, useState } from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import DataExport from '@/components/DataExport'; // ✅ Import DataExport

interface JourFerie {
  id: number;
  date: string;
  description: string;
  type: string;
}

export default function GestionJoursFeries() {
  const { data, setData, post, processing, errors, reset } = useForm({
    date: '',
    description: '',
    type: 'nationale',
  });

  const { props } = usePage<{ joursFeries: JourFerie[]; success?: string }>();
  const [showForm, setShowForm] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/joursferies', {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  };

  // ✅ Correct DataExport columns format
  const columns = [
    { label: 'Date', accessor: 'date' },
    { label: 'Description', accessor: 'description' },
    { label: 'Type', accessor: 'type' },
  ];

  return (
    <AppLayout>
      <Head title="Gestion des Jours Fériés" />

      <div className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Gestion des Jours Fériés</h1>

        {props.success && (
          <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
            ✅ {props.success}
          </div>
        )}

        {/* ✅ Boutons d’export + Ajouter en haut à droite */}
        {/* <div className="flex justify-end items-center gap-2 mb-4"> */}
        {/* <div className="flex justify-start items-center gap-2 mb-4">
          <DataExport
            data={props.joursFeries}
            filename="jours_feries"
            title="Liste des Jours Fériés"
            columns={columns}
          />
          <Button variant="default" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Fermer le formulaire' : '+ Ajouter'}
          </Button>
        </div> */}
        <div className="flex justify-between items-center mb-4">
  {/* Boutons d'export à gauche */}
  <DataExport
    data={props.joursFeries}
    filename="jours_feries"
    title="Liste des Jours Fériés"
    columns={[
      { label: 'Date', accessor: 'date' },
      { label: 'Description', accessor: 'description' },
      { label: 'Type', accessor: 'type' },
    ]}
  />

  {/* Bouton + Ajouter à droite */}
  <Button variant="default" onClick={() => setShowForm(!showForm)}>
    {showForm ? 'Fermer le formulaire' : '+ Ajouter'}
  </Button>
</div>


        {/* ✅ Zone principale divisée en 2 moitiés */}
        <div className="flex flex-col md:flex-row w-full">
          {/* TABLEAU GAUCHE */}
          <div className="w-full md:w-1/2 min-w-0 pr-4">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-full table-fixed border border-collapse border-gray-300 dark:border-gray-700 rounded-md shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white">
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Date</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Description</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {props.joursFeries.map((jf) => (
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

          {/* FORMULAIRE DROITE */}
          {showForm && (
            <div className="w-full md:w-1/2 pl-4 flex justify-center">
              <form
                onSubmit={submit}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-8 rounded-lg shadow-md flex flex-col gap-6 max-w-2xl"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Ajouter un Jour Férié
                </h2>

                <div>
                  <Label htmlFor="date" className="text-gray-800 dark:text-white">
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    required
                    className="bg-white dark:bg-black text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700"
                  />
                  <InputError message={errors.date} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-800 dark:text-white">
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Entrez une description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                    className="bg-white dark:bg-black text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700"
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="type" className="text-gray-800 dark:text-white">
                    Type
                  </Label>
                  <select
                    id="type"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="w-full rounded-md border py-2 px-3 bg-white dark:bg-black text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                  >
                    <option value="nationale">Nationale</option>
                    <option value="religieuse">Religieuse</option>
                    <option value="scolaire">Scolaire</option>
                  </select>
                  <InputError message={errors.type} className="mt-2" />
                </div>

                <div className="flex justify-start gap-4 mt-4">
                  <Button type="button" variant="secondary" onClick={() => reset()}>
                    Réinitialiser
                  </Button>
                  <Button type="submit" disabled={processing}>
                    Enregistrer
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

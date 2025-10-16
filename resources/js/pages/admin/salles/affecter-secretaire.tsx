// import { useForm, usePage, Head } from '@inertiajs/react'
// import AppLayout from '@/layouts/app-layout'
// import { FormEventHandler } from 'react'
// import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
// import InputError from '@/components/input-error'

// interface User {
//   id: number
//   name: string
// }

// interface Salle {
//   id: number
//   nom: string
// }

// export default function AffectationSalleSecretaire() {
//   const { secretaires, salles, success } = usePage<{
//     secretaires: User[]
//     salles: Salle[]
//     success?: string
//   }>().props

//   const { data, setData, post, processing, errors, reset } = useForm({
//     secretaire_id: '',
//     salle_id: '',
//   })

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault()
//     post('/admin/salles/affecter-secretaire', { onSuccess: () => reset() })
//   }

//   return (
//     <AppLayout>
//       <Head title="Affectation Salle - Secrétaire" />

//       <div className="px-6 py-10 max-w-3xl">
//         <h1 className="text-2xl font-bold mb-6 dark:text-white">Affecter une Salle à un Secrétaire</h1>

//         {success && (
//           <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
//             ✅ {success}
//           </div>
//         )}

//         <form onSubmit={submit} className="space-y-6">
//           {/* Secrétaire */}
//           <div>
//             <Label htmlFor="secretaire_id">Sélectionner un Secrétaire</Label>
//             <select
//               id="secretaire_id"
//               value={data.secretaire_id}
//               onChange={(e) => setData('secretaire_id', e.target.value)}
//               className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-black shadow-sm focus:ring focus:ring-indigo-500 dark:bg-black dark:text-white dark:border-white"
//               required
//             >
//               <option value="">-- Choisir un secrétaire --</option>
//               {secretaires.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name}
//                 </option>
//               ))}
//             </select>
//             <InputError message={errors.secretaire_id} className="mt-2" />
//           </div>

//           {/* Salle */}
//           <div>
//             <Label htmlFor="salle_id">Sélectionner une Salle</Label>
//             <select
//               id="salle_id"
//               value={data.salle_id}
//               onChange={(e) => setData('salle_id', e.target.value)}
//               className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-black shadow-sm focus:ring focus:ring-indigo-500 dark:bg-black dark:text-white dark:border-white"
//               required
//             >
//               <option value="">-- Choisir une salle --</option>
//               {salles.map((salle) => (
//                 <option key={salle.id} value={salle.id}>
//                   {salle.nom}
//                 </option>
//               ))}
//             </select>
//             <InputError message={errors.salle_id} className="mt-2" />
//           </div>

//           {/* Bouton */}
//           <Button type="submit" disabled={processing}>
//             Affecter
//           </Button>
//         </form>
//       </div>
//     </AppLayout>
//   )
// }
import { useForm, usePage, Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { FormEventHandler } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'

interface User {
  id: number
  name: string
}

interface Salle {
  id: number
  nom: string
}

export default function Affectationsallesecretaire() {
  const { secretaires, salles, success } = usePage<{
    secretaires: User[]
    salles: Salle[]
    success?: string
  }>().props

  const { data, setData, post, processing, errors, reset } = useForm({
    secretaire_id: '',
    salle_id: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/admin/salles/affecter-secretaire', {
      onSuccess: () => reset(),
    })
  }

  return (
    <AppLayout>
      <Head title="Affectation Salle - Secrétaire" />

      <div className="px-6 py-10 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Affecter une Salle à un Secrétaire</h1>

        {success && (
          <div className="mb-4 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium animate-fade-in-out">
            ✅ {success}
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          {/* Secrétaire */}
          <div>
            <Label htmlFor="secretaire_id">Sélectionner un Secrétaire</Label>
            <select
              id="secretaire_id"
              value={data.secretaire_id}
              onChange={(e) => setData('secretaire_id', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-black shadow-sm focus:ring focus:ring-indigo-500 dark:bg-black dark:text-white dark:border-white"
              required
            >
              <option value="">-- Choisir un secrétaire --</option>
              {secretaires.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <InputError message={errors.secretaire_id} className="mt-2" />
          </div>

          {/* Salle */}
          <div>
            <Label htmlFor="salle_id">Sélectionner une Salle</Label>
            <select
              id="salle_id"
              value={data.salle_id}
              onChange={(e) => setData('salle_id', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-black shadow-sm focus:ring focus:ring-indigo-500 dark:bg-black dark:text-white dark:border-white"
              required
            >
              <option value="">-- Choisir une salle --</option>
              {salles.map((salle) => (
                <option key={salle.id} value={salle.id}>
                  {salle.nom}
                </option>
              ))}
            </select>
            <InputError message={errors.salle_id} className="mt-2" />
          </div>

          {/* Bouton */}
          <Button type="submit" disabled={processing}>
            Affecter
          </Button>
        </form>
      </div>
    </AppLayout>
  )
}

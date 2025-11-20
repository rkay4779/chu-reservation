// import React, { useState } from 'react'
// import { Head } from '@inertiajs/react'
// import AppLayout from '@/layouts/app-layout';

// interface PageProps {
//   [key: string]: any
// }

// interface Demande {
//   id: number
//   date: string
//   heure: string
//   salle: string
//   demandeur: string
//   service: string
//   sujet: string
//   statut: 'En Attente' | 'Acceptée' | 'Refusée'
//   motif_refus?: string
// }

// interface JourFerie {
//   id: number
//   date: string
//   description: string
//   type: string
// }

// interface Props extends PageProps {
//   demandes: Demande[]
//   joursFeries: JourFerie[]
// }

// export default function GestionDemandes({ demandes, joursFeries }: Props) {
//   const [motifs, setMotifs] = useState<{ [id: number]: string }>({})
//   const [showMotifInput, setShowMotifInput] = useState<{ [id: number]: boolean }>({})

//   const handleAccept = (id: number) => {
//     console.log(`Accepté: ${id}`)
//     // TODO: call backend
//   }

//   const handleRefuse = (id: number, withMotif = false) => {
//     if (withMotif) {
//       setShowMotifInput({ ...showMotifInput, [id]: true })
//     } else {
//       console.log(`Refusé: ${id} sans motif`)
//       // TODO: call backend
//     }
//   }

//   const submitMotif = (id: number) => {
//     console.log(`Refusé avec motif: ${id} -> ${motifs[id]}`)
//     // TODO: call backend
//   }

//   return (
//     <AppLayout>
//       <Head title="Gestion des demandes" />

//       <div className="flex flex-col md:flex-row gap-4 px-4 py-6">
//         {/* Table demandes */}
//         <div className="w-full md:w-2/3 overflow-x-auto bg-black text-white rounded-xl shadow-md border border-gray-700 p-4">
//           <h2 className="text-xl font-semibold mb-4">📋 Demandes de réservation</h2>
//           <table className="w-full table-fixed">
//             <thead className="text-white">
//               <tr className="border-b border-gray-700">
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Heure</th>
//                 <th className="p-2">Salle</th>
//                 <th className="p-2">Demandeur</th>
//                 <th className="p-2">Service</th>
//                 <th className="p-2">Sujet</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {demandes.map((d) => (
//                 <tr key={d.id} className="border-b border-gray-700">
//                   <td className="p-2">{d.date}</td>
//                   <td className="p-2">{d.heure}</td>
//                   <td className="p-2">{d.salle}</td>
//                   <td className="p-2">{d.demandeur}</td>
//                   <td className="p-2">{d.service}</td>
//                   <td className="p-2">{d.sujet}</td>
//                   <td className="p-2 space-y-2">
//                     {d.statut === 'En Attente' ? (
//                       <>
//                         <button
//                           onClick={() => handleAccept(d.id)}
//                           className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
//                         >
//                           Accepter
//                         </button>
//                         <button
//                           onClick={() => handleRefuse(d.id)}
//                           className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 ml-1"
//                         >
//                           Refuser
//                         </button>
//                         <button
//                           onClick={() => handleRefuse(d.id, true)}
//                           className="border border-red-500 text-red-500 px-2 py-1 rounded ml-1 hover:bg-red-800/20"
//                         >
//                           Refuser avec motif
//                         </button>
//                         {showMotifInput[d.id] && (
//                           <div className="mt-2">
//                             <input
//                               type="text"
//                               placeholder="Motif de refus"
//                               className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
//                               value={motifs[d.id] || ''}
//                               onChange={(e) =>
//                                 setMotifs({ ...motifs, [d.id]: e.target.value })
//                               }
//                             />
//                             <button
//                               onClick={() => submitMotif(d.id)}
//                               className="mt-1 bg-red-700 px-2 py-1 rounded hover:bg-red-800"
//                             >
//                               Envoyer
//                             </button>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <span className={d.statut === 'Acceptée' ? 'text-green-500' : 'text-red-500'}>
//                         {d.statut}
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Table jours fériés */}
//         <div className="w-full md:w-1/3 bg-black text-white rounded-xl shadow-md border border-gray-700 p-4">
//           <h3 className="text-xl font-semibold mb-4">📅 Jours fériés & Congés</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full table-fixed">
//               <thead>
//                 <tr className="border-b border-gray-600">
//                   <th className="p-2">Date</th>
//                   <th className="p-2">Événement</th>
//                   <th className="p-2">Type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {joursFeries.map((jf) => (
//                   <tr key={jf.id} className="border-b border-gray-800 hover:bg-gray-800">
//                     <td className="p-2">{jf.date}</td>
//                     <td className="p-2">{jf.description}</td>
//                     <td className="p-2 capitalize">{jf.type}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   )
// }

import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

interface PageProps {
  [key: string]: any
}

type Statut = 'attente' | 'validee' | 'refusée'

interface Demande {
  id: number
  date: string
  heure: string
  salle: string
  demandeur: string
  service: string
  sujet: string
  statut: Statut
  motif_refus?: string
}

interface JourFerie {
  id: number
  date: string
  description: string
  type: string
}

interface Props extends PageProps {
  demandes: Demande[]
  joursFeries: JourFerie[]
}

export default function GestionDemandes({ demandes, joursFeries }: Props) {
  const [motifs, setMotifs] = useState<{ [id: number]: string }>({})
  const [showMotifInput, setShowMotifInput] = useState<{ [id: number]: boolean }>({})
  const [localStatus, setLocalStatus] = useState<{ [id: number]: Statut }>({})

  const handleAccept = (id: number) => {
  router.post(`/secretaire/demandes/${id}/accepter`, {}, {
    onSuccess: () => {
      setLocalStatus({ ...localStatus, [id]: 'validee' })
    },
  })
}


// const handleAccept = (id: number) => {
//   router.post(`/secretaire/demandes/${id}/accepter`, {}, {
//     preserveState: true,
//     preserveScroll: true,
//     onSuccess: () => {
//       setLocalStatus((prev) => ({ ...prev, [id]: 'validee' }))
//     },
//   })
// }

  const handleRefuse = (id: number) => {
    // Hide all buttons and show input field
    setShowMotifInput({ ...showMotifInput, [id]: true })
  }

  const submitMotif = (id: number) => {
  router.post(`/secretaire/demandes/${id}/refuser`, {
    motif_refus: motifs[id],
  }, {
    onSuccess: () => {
      setLocalStatus({ ...localStatus, [id]: 'refusée' })
      setShowMotifInput({ ...showMotifInput, [id]: false })
    },
  })
}

  const getStatutDisplay = (statut: Statut) => {
    switch (statut) {
      case 'attente':
        return { label: 'En attente', color: 'text-yellow-400' }
      case 'validee':
        return { label: 'Acceptée', color: 'text-green-500' }
      case 'refusée':
        return { label: 'Refusée', color: 'text-red-500' }
      default:
        return { label: statut, color: 'text-gray-400' }
    }
  }

  return (
    <AppLayout>
      <Head title="Gestion des demandes" />

      <div className="flex flex-col md:flex-row gap-4 px-4 py-6">
        {/* Table demandes */}
        {/* <div className="w-full md:w-2/3 overflow-x-auto bg-black text-white rounded-xl shadow-md border border-gray-700 p-4"> */}
        <div className="w-full md:w-2/3 overflow-x-auto bg-white text-gray-900 dark:bg-black dark:text-white rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold mb-4">📋 Demandes de réservation</h2>
          <table className="w-full table-fixed">
            {/* <thead className="text-white">
              <tr className="border-b border-gray-700"> */}
              <thead className="text-gray-900 dark:text-white">
  <tr className="border-b border-gray-300 dark:border-gray-700">

                <th className="p-2">Date</th>
                <th className="p-2">Heure</th>
                <th className="p-2">Salle</th>
                <th className="p-2">Demandeur</th>
                <th className="p-2">Service</th>
                <th className="p-2">Sujet</th>
                <th className="p-2">Statut / Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {demandes.map((d) => { */}
              {demandes
  .filter((d) => {
    const currentStatus = localStatus[d.id] || d.statut
    return currentStatus === 'attente'
  })
  .map((d) => {

                const currentStatus = localStatus[d.id] || d.statut
                const { label, color } = getStatutDisplay(currentStatus)

                return (
                  // <tr key={d.id} className="border-b border-gray-700">
                  <tr key={d.id} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="p-2">{d.date}</td>
                    <td className="p-2">{d.heure}</td>
                    <td className="p-2">{d.salle}</td>
                    <td className="p-2">{d.demandeur}</td>
                    <td className="p-2">{d.service}</td>
                    <td className="p-2">{d.sujet}</td>
                    <td className="p-2 space-y-2">
                      {currentStatus === 'attente' && !showMotifInput[d.id] ? (
                        <>
                          <span className={`${color} font-semibold block mb-1`}>{label}</span>
                          {/* <button
                            onClick={() => handleAccept(d.id)}
                            className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
                          >
                            Accepter
                          </button>
                          <button
                            onClick={() => handleRefuse(d.id)}
                            className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 ml-1"
                          >
                            Refuser
                          </button> */}
                          <button
  onClick={() => handleAccept(d.id)}
  className="bg-green-600 text-white dark:text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
>
  Accepter
</button>
<button
  onClick={() => handleRefuse(d.id)}
  className="bg-red-600 text-white dark:text-white px-2 py-1 rounded hover:bg-red-700 ml-1 transition-colors"
>
  Refuser
</button>

                        </>
                      ) : showMotifInput[d.id] ? (
                        <div className="flex flex-col space-y-2">
                          <input
                            type="text"
                            placeholder="Motif de refus"
                            // className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                            className="w-full p-2 rounded bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            value={motifs[d.id] || ''}
                            onChange={(e) =>
                              setMotifs({ ...motifs, [d.id]: e.target.value })
                            }
                          />
                          {/* <button
                            onClick={() => submitMotif(d.id)}
                            className="bg-red-700 px-2 py-1 rounded hover:bg-red-800"
                          >
                            Entrer
                          </button> */}
                          <button
  onClick={() => submitMotif(d.id)}
  className="bg-red-700 text-white dark:text-white px-2 py-1 rounded hover:bg-red-800 transition-colors"
>
  Entrer
</button>

                        </div>
                      ) : (
                        // <span className={`${color} font-semibold`}>{label}</span>
                        <>
  <span className={`${color} font-semibold`}>{label}</span>
  {currentStatus === 'refusée' && d.motif_refus && (
    <div className="text-sm text-red-400">Motif: {d.motif_refus}</div>
  )}
</>

                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Table jours fériés */}
        {/* <div className="w-full md:w-1/3 bg-black text-white rounded-xl shadow-md border border-gray-700 p-4"> */}
        <div className="w-full md:w-1/3 bg-white text-gray-900 dark:bg-black dark:text-white rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-semibold mb-4">📅 Jours fériés & Congés</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="p-2">Date</th>
                  <th className="p-2">Événement</th>
                  <th className="p-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {joursFeries.map((jf) => (
                  // <tr key={jf.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <tr key={jf.id} className="border-b border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="p-2">{jf.date}</td>
                    <td className="p-2">{jf.description}</td>
                    <td className="p-2 capitalize">{jf.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

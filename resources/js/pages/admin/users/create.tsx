import React, { useMemo, useState } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";

interface Profil {
  id: number;
  libelle: string;
}

interface Service {
  id: number;
  libelle: string;
}

interface Specialite {
  id: number;
  libelle: string;
  service_id: number | null;
}

interface PageProps {
  profils: Profil[];
  services: Service[];
  specialites: Specialite[];
  flash?: { success?: string };
  [key: string]: any;
}

const breadcrumbs = [
  { title: "Utilisateurs", href: "/admin/users" },
  { title: "Ajouter", href: "/admin/users/create" },
];

const CreateUser: React.FC = () => {
  const { profils, services, specialites, flash } = usePage<PageProps>().props;

  const [serviceFilter, setServiceFilter] = useState<number | "">("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const filteredSpecialites = useMemo(() => {
    if (!serviceFilter) return specialites;
    return specialites.filter((s) => s.service_id === serviceFilter);
  }, [serviceFilter, specialites]);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    telephone: "",
    profil_id: "",
    service_id: "",
    specialite_id: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/admin/users", {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajouter un utilisateur" />

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
          <Link
            href="/admin/users"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Retour à la liste
          </Link>
        </div>

        {flash?.success && (
          <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200">
            {flash.success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Nom */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Nom complet</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md"
              placeholder="Entrez votre nom complet"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md"
              placeholder="Entrez votre email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Téléphone */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Téléphone (optionnel)</label>
            <input
              type="text"
              value={data.telephone}
              onChange={(e) => setData("telephone", e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md"
              placeholder="Entrez votre numéro de téléphone"
            />
            {errors.telephone && (
              <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
            )}
          </div>

          {/* Profil */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Profil</label>
            <select
              value={data.profil_id}
              onChange={(e) => setData("profil_id", e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md"
            >
              <option value="">-- Sélectionnez votre profil --</option>
              {profils.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.libelle}
                </option>
              ))}
            </select>
            {errors.profil_id && (
              <p className="mt-1 text-sm text-red-600">{errors.profil_id}</p>
            )}
          </div>

          {/* Service */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Service (optionnel)</label>
            <select
              value={data.service_id}
              onChange={(e) => {
                const val = e.target.value;
                setData("service_id", val);
                setServiceFilter(val ? Number(val) : "");
                setData("specialite_id", "");
              }}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md"
            >
              <option value="">-- Sélectionnez votre service --</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.libelle}
                </option>
              ))}
            </select>
            {errors.service_id && (
              <p className="mt-1 text-sm text-red-600">{errors.service_id}</p>
            )}
          </div>

          {/* Spécialité */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Spécialité (optionnel)</label>
            <select
              value={data.specialite_id}
              onChange={(e) => setData("specialite_id", e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md"
              disabled={!!serviceFilter && filteredSpecialites.length === 0}
            >
              <option value="">-- Sélectionnez votre spécialité --</option>
              {filteredSpecialites.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.libelle}
                </option>
              ))}
            </select>
            {errors.specialite_id && (
              <p className="mt-1 text-sm text-red-600">{errors.specialite_id}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md pr-10"
              placeholder="Entrer votre mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirmation */}
          <div className="flex flex-col relative">
            <label className="mb-1 text-sm">Confirmer le mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              value={data.password_confirmation}
              onChange={(e) =>
                setData("password_confirmation", e.target.value)
              }
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-md pr-10"
              placeholder="Confirmer votre mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 mt-2 flex items-center justify-end gap-2">
            {/* Réinitialiser */}
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              disabled={processing}
            >
              Réinitialiser
            </button>

            {/* Enregistrer */}
            <button
              type="submit"
              disabled={processing}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {processing ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateUser;


<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    // public function rules(): array
    // {
    //     return [
    //         //
    //     ];
    // }
    public function rules(): array
    {
        $rules = [
            'name'          => ['required', 'string', 'max:100'],
            'email'         => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'      => ['required', 'string', 'min:8', 'confirmed'],
            'telephone'     => ['nullable', 'string', 'max:20'],
            'profil_id'     => ['required', Rule::exists('profils', 'id')],
            'service_id'    => ['nullable', Rule::exists('services', 'id')],
            'specialite_id' => ['nullable', Rule::exists('specialites', 'id')],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required'      => 'Le nom est obligatoire.',
            'email.required'     => "L'email est obligatoire.",
            'email.email'        => "Format d'email invalide.",
            'email.unique'       => "Cet email est déjà utilisé.",
            'password.required'  => 'Le mot de passe est obligatoire.',
            'password.min'       => 'Le mot de passe doit contenir au moins :min caractères.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'profil_id.required' => 'Le profil est obligatoire.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($v) {
            $data = $this->all();

            // Si la colonne specialites.service_id existe, on s'assure que la spécialité correspond au service choisi
            if (
                Schema::hasColumn('specialites', 'service_id')
                && !empty($data['specialite_id'])
                && !empty($data['service_id'])
            ) {
                $ok = \App\Models\Specialite::where('id', $data['specialite_id'])
                    ->where(function ($q) use ($data) {
                        $q->where('service_id', $data['service_id'])
                          ->orWhereNull('service_id');
                    })
                    ->exists();

                if (!$ok) {
                    $v->errors()->add('specialite_id', "La spécialité choisie n'appartient pas au service sélectionné.");
                }
            }
        });
    }
}

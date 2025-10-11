<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'name'           => ['required', 'string', 'max:100'],
            'email'          => ['required', 'email', 'unique:users,email'],
            'password'       => ['required', 'string', 'min:8', 'confirmed'],
            'telephone'      => ['nullable', 'string', 'max:20'],
            'profil_id'      => ['required', 'exists:profils,id'],
            'specialite_id'  => ['nullable', 'exists:specialites,id'],
            'service_id'     => ['nullable', 'exists:services,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'profil_id.required' => 'Le profil est obligatoire.',
            'profil_id.exists'   => 'Profil invalide.',
            'specialite_id.exists' => 'Spécialité invalide.',
            'service_id.exists'    => 'Service invalide.',
        ];
    }
}

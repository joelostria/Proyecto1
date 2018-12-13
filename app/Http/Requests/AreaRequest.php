<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AreaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'area_conocimiento'=>'required',
            'informacion_general' => 'required|mimes:pdf',
            'video_general' => 'required|mimes:mp4',
            'imagen_general' => 'required|mimes:png'
        ];
    }
}

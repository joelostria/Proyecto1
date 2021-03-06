<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Pregunta;

use App\Examen;

use App\Nivel;

use App\Respuesta;

use App\Http\Requests\PreguntaRequest;

class SimuladorExamenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('admin.simulador.index');
    }

    public function getPreguntas(){
        $preguntas = Pregunta::all();
        $preguntas->each(function($preguntas){
            $preguntas->examen;
        });
        return response()->json(
            $preguntas->toArray()
        );
    }


    public function getNiveles(){
        $niveles = Nivel::all();
        $niveles->each(function($niveles){
            $niveles->examenes;
        });
        return response()->json(
            $niveles->toArray()
        );
    }


    public function getExamenes(Request $request,$id){
        /*if($request->ajax()){
            $examenes = Examen::examenes($id);
            return response()->json($examenes);
        }*/

        $examenes = Examen::examenes($id);
            return response()->json($examenes);
    }

    public function setPreguntas(PreguntaRequest $request){


        $pregunta = new Pregunta($request->all());
        $pregunta->examen_id = $request->examen_id;
        $pregunta->save();

        $respuesta = $request->all();
        $correcta=$request->correcta;
        for($i=0;$i<=3;$i++){
          $respuesta = new Respuesta();
          $respuesta->pregunta_id=$pregunta->id;
          $respuesta->respuesta=$request->respuesta[$i];

          if($request->correcta[$i] === null)
            $respuesta->correcta=0;
          else
            $respuesta->correcta=1;

            $respuesta->save();
        }

        /*$respuesta = $request->all();
        $correcta=$request->correcta;
        for($i=0;$i<=3;$i++){
          $respuesta = new Respuesta();
          $respuesta->pregunta_id=$pregunta->id;
          $respuesta->respuesta=$request->respuesta[$i];
          if($i!=$correcta[0])
            $respuesta->correcta=0;
          else
            $respuesta->correcta=1;
          $respuesta->save();
        }*/

        $preguntas = Pregunta::all();
            return response()->json(
                $preguntas->toArray()
        );
    }


    public function deletePreguntas($id){
         $pregunta = Pregunta::find($id);
         $pregunta->delete();
    }

    public function getPreguntas1($id){
         $preguntas = Pregunta::find($id);
         $respuestas=Respuesta::where('pregunta_id', $id)->get();
         $preguntas->each(function($preguntas){
             $preguntas->examen;
         });
         return response()->json(
             $respuestas->toArray()
         );
    }

    public function getPreguntas2($id){
         $preguntas = Pregunta::find($id);
         $respuestas=Respuesta::where('pregunta_id', $id)->get();
         $preguntas->each(function($preguntas){
             $preguntas->examen;
         });
         return response()->json(
             $preguntas->toArray()
         );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        /*$niveles = Nivel::all();*/
        return view('admin.simulador.create');/*->with('niveles', $niveles);*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('admin.simulador.edit');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        return view('admin.simulador.edit');
    }

    /*
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
      $pregunta=Pregunta::find($id);
      $pregunta->pregunta=$request->pregunta;
      $pregunta->examen_id = $request->examen_id;
      $pregunta->save();

      $respuesta = Respuesta::where('pregunta_id', $id)->get();
      $correcta=$request->correcta;
      for($i=0;$i<=3;$i++){
        $respuesta[$i]->pregunta_id=$pregunta->id;
        $respuesta[$i]->respuesta=$request->respuesta[$i];

        if($request->correcta[$i] == 0)
          $respuesta[$i]->correcta=0;
        else
          $respuesta[$i]->correcta=1;

          $respuesta[$i]->save();
      }


    /*  $respuesta = $request->all();
      $correcta=$request->correcta;
      for($i=0;$i<=3;$i++){
        $respuesta = Respuesta::where('pregunta_id', $id)->get();;
        $respuesta->pregunta_id=$pregunta->id;
        $respuesta->respuesta=$request->respuesta[$i];

        if($request->correcta[$i] === null)
          $respuesta->correcta=0;
        else
          $respuesta->correcta=1;

          $respuesta->save();
      }*/


          //$area = Area::find($id);
          //$area->area_conocimiento = $request->area_conocimiento;
          //$area->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }
public function testExample()
    {
        $this->assertTrue(true);
    }
public function testWelcome()
    {
        $response = $this->get('/');
        $response->assertStatus(200);

        $response2 = $this->get('/');
        $response2->assertStatus(200);

        $response3 = $this->get('/');
        $response3->assertStatus(200);
    }

    function testRegistro(){
        $respuesta = $this->get('/registro');
        $respuesta->assertSee('Nombre de usuario');
        $respuesta->assertSee('Contraseña');
    }

    function testLogin(){
        $response = $this->get('/ingresar');
        $response->assertSuccessful();
        $response->assertViewIs('index.login');
    }

    function testUsuarioAuthViewLogin(){
        
        //Crear un usuario temporal
        $user = factory(User::class)->make();
        //Afirmar que el usuario autenticado puedo ingresar al formulario de login
        $response = $this->actingAs($user)->get('/login');
        //Afirmar que lo redirecciona a inicio
        $response->assertRedirect('/inicio');
    }

    function testUserAuthLogin(){
        //Crear un usuario
        $user = factory(User::class)->create([
            //Se asigna un password
            'password' => bcrypt($password = 'qwerty1234567890!'),
            //Se asigna un tipo, se define por el controlador
            'tipo' => '1',
        ]);
        //Si el login del usuario es correcto
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        //Si se redireccionó al usuario a la url Inicio
        $response->assertRedirect('/inicio');

        //Si el usuario logueado esta autenticado
        $this->assertAuthenticatedAs($user);
    }

    function testUserErrorEnAuth(){

        $user = factory(User::class)->create([
            'password' => bcrypt('qwerty1234567890!'),
            'tipo' => '3',
        ]);
        
        $response = $this->from('/login')->post('/login', [
            'email' => $user->email,
            'password' => 'qwerty1234567890!',
        ]);
        
        //Afirmó que como respuesta el formulario lo redirecciono a login por contraseña invalida
        $response->assertRedirect('/login');

        //Afirma que "sesion" tiene un error en el campo email
        $response->assertSessionHasErrors('email');
        //Afirma si en "sesion" se envió como valor old el campo email
        $this->assertTrue(session()->hasOldInput('email'));
        //Afirma que en "sesion" no se envió como valor old el campo password
        $this->assertFalse(session()->hasOldInput('password'));
        //Afirma que el usuario no está autenticado aún.
        $this->assertGuest();
    }
}

}


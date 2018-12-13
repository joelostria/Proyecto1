<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5be3a7710e6b3311cb785c2f/1crtegrt9';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
<div class="container">
	<h1 style="margin-top: 0px;">Curso: @{{curso.area_conocimiento}}</h1>
    <div class="row">
     	<div class="col-md-12">
            <ul class="nav nav-tabs">
              <li class="active"><a href="!#adress-tab" data-toggle="tab">Introducción al curso <i class="fa"></i></a></li>
              <li><a href="!#info-tab" data-toggle="tab">Información general<i class="fa"></i></a></li>
              <li><a href="!#profesional-tab" data-toggle="tab">Módulos del curso <i class="fa"></i></a></li>
            </ul>
          	<div class="tab-content">
	            <div class="tab-pane active" id="adress-tab" style="padding-top: 10px;">
	                <div class="embed-responsive embed-responsive-16by9">
					  <iframe class="embed-responsive-item" ng-src="@{{curso.video_general}}" allowfullscreen="true" ></iframe>
					</div>
	            </div>
	            
	            <div class="tab-pane" id="profesional-tab" style="padding-top: 10px;">
	                <div ng-repeat="contenido in curso.contenidos">
						<div class="row" style="border: solid 1px #ccc;margin-bottom: 10px;">
							<a ng-click="goContenido(contenido)"><div class="col-md-8 col-xs-8">
								<h4><span class="fa-stack fa-lg">
					  				<i class="fa fa-circle fa-stack-2x"></i>
					  				<i class="fa fa-bell-o fa-stack-1x fa-inverse"></i>
									</span>
									@{{$index+1}} @{{contenido.titulo}} 
								</h4>
							</div>
							<div class="col-md-4 col-xs-4" style="text-align: center;padding: 15px;">
								<h4>ir a curso</h4>
							</div>
							</a>
						</div>
					</div>
	            </div>
	            
	            <div class="tab-pane" id="info-tab" style="padding-top: 10px;">
	                <div class="embed-responsive embed-responsive-16by9">
					  <iframe class="embed-responsive-item" ng-src="@{{curso.informacion_general}}" allowfullscreen></iframe>
					</div>
	            </div>
            </div>
    	</div>
    </div>
</div>
<p></p>
<br>
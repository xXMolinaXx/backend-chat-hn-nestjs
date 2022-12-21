# INDICE
1. [ Instalacion ](#intro)
2. [ responsabilidad única ](#responsabilidadUnica)
3. [ service-intro](#service-intro)
---
 <p> Nest js es un framework de node con base a abstraciones</p>
<a name="intro"></a>

## instalacion

- npm i -g @nestjs/cli
    - nest --version
    - nest --help
-  crear nuevo proyecto : **nest new -nombre-**
- npm start : iniciar

<a name="responsabilidadUnica">

## responsabilidad unica
<p>
La S de SOLID hace referencia a “Single Responsibility” y recomienda que cada pieza de software debe tener una única función. Por ejemplo, un controlador de productos no debería encargarse de categorías o de usuarios. Se debe crear un controlador para cada entidad que la aplicación necesite.

En NestJS, una buena práctica es crear un directorio llamado controllers donde se agruparán todos los controladores que tu aplicación necesite. Ese ya es un buen paso para mantener el orden en tu proyecto.
</p>
-  nest generate controller  **directorio/controller-name**
  - --flat:bandera para que no cre una carpeta con el nombre asignado  

<a name="service-intro ">

## SERVICE INTRO
- nest g s services/products --flat
## PIPE
- https://docs.nestjs.com/pipes
- https://docs.nestjs.com/pipes#built-in-pipes
<p> ParseIntPipe - verifica y transforma a number </p>
- nest g pipe common/-nombre-

## data transfer object
- 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

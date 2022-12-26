# INDICE

1. [ Instalacion ](#intro)
2. [ responsabilidad única ](#responsabilidadUnica)
3. [ service-intro](#service-intro)

- go to [chapter 2](#chapter2)

---

 <p> Nest js es un framework de node con base a abstraciones</p>
<a name="intro"></a>

## instalacion

- npm i -g @nestjs/cli
  - nest --version
  - nest --help
- crear nuevo proyecto : **nest new -nombre-**
- npm start : iniciar

<a name="responsabilidadUnica"></a>

## responsabilidad unica

<p>
La S de SOLID hace referencia a “Single Responsibility” y recomienda que cada pieza de software debe tener una única función. Por ejemplo, un controlador de productos no debería encargarse de categorías o de usuarios. Se debe crear un controlador para cada entidad que la aplicación necesite.

En NestJS, una buena práctica es crear un directorio llamado controllers donde se agruparán todos los controladores que tu aplicación necesite. Ese ya es un buen paso para mantener el orden en tu proyecto.

</p>

- nest generate controller **directorio/controller-name**
- --flat:bandera para que no cre una carpeta con el nombre asignado

<a name="service-intro "></a>

---

## SERVICE INTRO

- nest g s services/products --flat
-  The @Injectable() decorator attaches metadata, which declares that **name**Service is a class that can be managed by the Nest IoC container

## PIPE

- https://docs.nestjs.com/pipes
- https://docs.nestjs.com/pipes#built-in-pipes
<p> ParseIntPipe - verifica y transforma a number </p>
- nest g pipe common/-nombre-

---

## data transfer object

<h5>DTO instead of interface</h5>
<p>

But first (if you use TypeScript), we need to determine the DTO (Data Transfer Object) schema. A DTO is an object that defines how the data will be sent over the network. We could determine the DTO schema by using TypeScript interfaces, or by simple classes. Interestingly, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable at runtime.

</p>
- app.useGlobalPipes(new ValicationPipe())

<a name="chapter2"></a>

# Chapter 2

## INDICE

- para buscar el ejemplodel tema apreta ctrl+shift+f y busca el tema de la lectura

## module

- nest g mo **nameModule**

## interacion entre modulos

- se debe de hacer un import y export


## useValue and useClass
- usa esta etiqueta para buscar los ejemplos
- use value nos sirve para tener valores constantes y poder inyectarlo en los otros modulos

## useFactory
- use factory nos permite tener asincronia y inyection de valores
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

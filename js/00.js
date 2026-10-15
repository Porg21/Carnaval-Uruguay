'use strict';

const APP = document.getElementById('app');
const SUPA_URL = 'https://afgfbxfalvsjtvflmjzy.supabase.co';
const SUPA_KEY = 'sb_publishable_rLV9T45TyuRYHY_A-7HNnQ_atzOzroL';
const AUTH_URL = `${SUPA_URL}/functions/v1/auth-username`;
const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const CAT = {
  Murga:{icon:'🎭',count:22,liguilla:10,label:'Murgas'},
  Parodistas:{icon:'🎬',count:6,liguilla:4,label:'Parodistas'},
  Humoristas:{icon:'😂',count:5,liguilla:3,label:'Humoristas'},
  Revista:{icon:'💃',count:5,liguilla:3,label:'Revistas'},
  Lubolos:{icon:'🥁',count:6,liguilla:4,label:'Negros y Lubolos'}
};
const DIF = {'Desde abajo':220000,'Equilibrado':480000,'Libre':1100000};
const MONTHS = ['Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre','Enero'];
const DAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const RUBRICS = ['Voces / Musicalidad','Textos / Interpretación','Puesta en escena','Coreografía / Bailes','Vestuario / Maquillaje','Rodaje general'];
const REHEARSAL_PARTS = ['Voces / Musicalidad','Textos / Interpretación','Puesta en escena','Coreografía / Bailes','Ensayo completo'];
const PRO_TYPES = ['Arreglador coral','Letrista','Puestista','Coreógrafo','Vestuarista','Maquillador'];
const PRIMARY_AREA = {
  'Arreglador coral':'Voces / Musicalidad','Letrista':'Textos / Interpretación','Puestista':'Puesta en escena',
  'Coreógrafo':'Coreografía / Bailes','Vestuarista':'Vestuario / Maquillaje','Maquillador':'Vestuario / Maquillaje'
};
const ROLES = {
  Murga:['Segundo','Primo','Sobreprimo','Bombo','Platillos','Redoblante'],
  Parodistas:['Actor-cantante','Actor','Cantante','Bailarín / Actor'],
  Humoristas:['Humorista / Actor','Actor-cantante','Cantante'],
  Revista:['Bailarín','Cantante','Actor','Bailarín / Cantante'],
  Lubolos:['Tamborilero','Bailarina','Vedette','Escobero','Gramillero','Mama Vieja','Portabandera','Portaestandarte','Portaestrella','Portamedialuna']
};
const NAMES = {
  Murga:['La Contracara','Los Desvelados','Falta Una Noche','La Farola','Los del Andén','La Vuelta Entera','Contramano Sur','La Madrugada','Salpicón','Los Vecinos','La Bohemia','La Esquina','A Contraluz','Los Inquietos','La Banda Nueva','De Rebote','La Compañera','La Penúltima','Calle Adentro','La Resaca','Los del Fondo','La Trasnochada'],
  Parodistas:['Los Galantes','Cabaret Oriental','Los del Telón','Parodia Sur','Los Viajeros','La Compañía'],
  Humoristas:['Los Reidores','La Otra Mitad','Los Improvisados','Humor de Barrio','Los de Siempre'],
  Revista:['Brillo Oriental','Fantasía Sur','Nueva Estrella','Magnolia','Luz de Carnaval'],
  Lubolos:['Raíz Morena','Candombe Sur','La Estirpe','Barrio Tambor','Alma Negra','Herencia']
};
const FN = ['Agustín','Valentina','Martín','Lucía','Bruno','Camila','Santiago','Florencia','Nicolás','Sofía','Mateo','Martina','Joaquín','Micaela','Facundo','Julieta','Emiliano','Clara','Thiago','Renata','Franco','Agustina','Sebastián','Victoria','Gonzalo','Malena','Federico','Paula','Ignacio','Belén','Rodrigo','Antonella'];
const LN = ['Silva','Pereira','Rodríguez','Gómez','Fernández','Suárez','Acosta','Sosa','Cabrera','Martínez','Viera','Méndez','López','Ramos','Cardozo','Olivera','Techera','González','Díaz','Núñez'];
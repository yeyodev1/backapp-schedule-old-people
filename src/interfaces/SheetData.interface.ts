export interface SedeInfo {
  ciudad: string;
  sedes: { nombre: string; direccion: string }[];
  diasDisponibles: string[];
}

interface Sede {
  nombre: string;
  direccion: string;
}

export interface CiudadInfo {
  ciudad: string;
  sedes: Sede[];
  diasDisponibles: string[];
}
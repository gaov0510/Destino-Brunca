export interface Destination {
  title: string | null;
  body: string | null;
  canton: string | null;
  categoria:
    | string
    | null
    | {
        [key: number]: string;
      };
  email: string | null;
  distrito: string | null;
  servicios: {
    [key: number]: string;
  };
  telefono: {
    [key: number]: string;
  };
  tipo_alimentos: {
    [key: number]: string;
  };
  author: {
    uid: string;
    name: string;
    email: string;
  };
  creado: Date | string;
  actualizado: Date | string;
  map: {
    lat: string | null;
    lon: string | null;
  };
  horario: {
    1: {
      tipo: string; // Ej: "Entrada";
      hora: string; // Ej: "12:00M";
    };
    2: {
      tipo: string; // Ej :Salida
      hora: string; // Ej :11:00AM
    };
  };
  montaña: {
    title: string | null;
    canton: string | null;
    description: string | null;
    distrito: string | null;
    map: {
      lat: string | null;
      lon: string | null;
    };
  };
  playa: {
    title: string | null;
    canton: string | null;
    description: string | null;
    distrito: string | null;
    map: {
      lat: string | null;
      lon: string | null;
    };
  };
  images: {
    [key: number]: {
      url: string;
    };
  };
}

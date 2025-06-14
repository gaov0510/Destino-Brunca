export interface News {
  id: string;
  title: string;
  body: string;
  categoria:
    | string
    | null
    | {
        [key: number]: string;
      };
  author: {
    uid: string;
    name: string;
    email: string;
  };
  creado: string;
  actualizado: string;
  imagen_principal: {
    images: {
      [key: number]: {
        url: string;
      };
    };
  };
}

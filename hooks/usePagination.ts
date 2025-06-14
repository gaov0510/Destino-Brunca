import { useEffect, useState } from "react";

interface Page {
  current: number;
  length: number;
  buttons: number[];
}

interface UsePagination<T> {
  rows: T[];
  page: Page;
  dataPerPage: number;
  setData: (data: T[]) => void;
  setPage: (page: number) => void;
  setDataPerPage: (amount: string) => void;
}

const initPage = (): Page => ({
  current: 1,
  length: 1,
  buttons: [],
});

export default function usePagination<T>(initData?: T[]): UsePagination<T> {
  const [data, setData] = useState(initData || []);
  const [page, setPage] = useState(initPage());
  const [rows, setRows] = useState<T[]>([]);
  const [dataPerPage, setDataPerPage] = useState(5);

  const maxButtonsToShow = 5;

  useEffect(() => {
    // Calcular la nueva longitud de página
    const newPageLength = Math.ceil(data.length / dataPerPage);

    // Si no hay datos, reiniciar el estado
    if (data.length === 0) {
      setPage({ current: 1, length: 0, buttons: [] });
      setRows([]);
      return;
    }

    // Si la página actual excede la nueva longitud, ajustar a la última página válida
    const currentPage =
      page.current > newPageLength ? newPageLength : page.current;

    handleUpdatePage(currentPage);
  }, [data, dataPerPage]);

  function handleButtons(current: number, length: number): number[] {
    if (length === 0) return [];

    let startPage: number;
    let endPage: number;

    if (length <= maxButtonsToShow) {
      startPage = 1;
      endPage = length;
    } else {
      if (current <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (current + 2 >= length) {
        startPage = length - 4;
        endPage = length;
      } else {
        startPage = current - 2;
        endPage = current + 2;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  function handleUpdatePage(pageNumber: number) {
    const pageLength = Math.ceil(data.length / dataPerPage);
    const validatedPage = Math.max(1, Math.min(pageNumber, pageLength));

    if (pageLength === 0) {
      setPage({ current: 1, length: 0, buttons: [] });
      setRows([]);
      return;
    }

    setPage({
      current: validatedPage,
      length: pageLength,
      buttons: handleButtons(validatedPage, pageLength),
    });

    handleUpdateData(validatedPage);
  }

  function handleUpdateData(pageNumber: number) {
    const start = (pageNumber - 1) * dataPerPage;
    const end = pageNumber * dataPerPage;
    setRows(data.slice(start, end));
  }

  function handleChangeAmount(amount: string) {
    console.log(amount, isNaN(Number(amount)));
    if (!isNaN(Number(amount))) setDataPerPage(Number(amount));
  }

  return {
    rows,
    page,
    dataPerPage,
    setData,
    setPage: handleUpdatePage,
    setDataPerPage: handleChangeAmount,
  };
}

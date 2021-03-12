import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch(url);
      const facturasJSON = await resp.json();
      setDatos(facturasJSON);
    })();
  }, [url]);

  return {
    datos
  };
};

export default useFetch;

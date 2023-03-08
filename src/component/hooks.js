import { useEffect, useState } from "react";
import { _getNfts } from "../script";

export const useNfts = (walletOwner = "") => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      await _getNfts(walletOwner || "")
        .then((e) => {
          console.log(e);
          if (e && e.ownedNfts) {
            setNfts(e.ownedNfts);
          }
          setLoading(true);
        })
        .catch((e) => {
          setError(e);
           setNfts([]);
        //  alert(e)
          setLoading(true);
        });
    })();
  }, [walletOwner]);

  return { nfts, loading, error };
};

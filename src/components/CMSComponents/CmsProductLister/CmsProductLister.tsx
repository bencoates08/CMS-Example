import { useEffect, useState } from "react";
import { useCmsContent } from "../CmsProvider";
import type {
  CmsProductLister as CmsProductListerProps,
  IngridAd,
} from "../../../api/cms/cms.types";
import { Product, fetchCannedSearch } from "../../../api/product/product";
import { fetchAds } from "../../../api/cms/cms";
import styles from "../CmsComponent.module.css";

const formatter = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "GBP",
});

const getIngridStyle = (placement: string, productsLength: number): string => {
  if (placement === "ingrid1" && productsLength >= 3) {
    return styles.ingrid1;
  }
  if (placement === "ingrid2" && productsLength >= 6) {
    return styles.ingrid2;
  }

  return styles.none;
};

export const CmsProductLister = ({
  searchControlId,
  defaultCannedSearch,
}: CmsProductListerProps) => {
  const [products, setProducts] = useState<Product[]>();
  const [ads, setAds] = useState<IngridAd[]>();
  const [cannedSearchTerm] = useCmsContent<string>(searchControlId);

  useEffect(() => {
    fetchCannedSearch(cannedSearchTerm ?? defaultCannedSearch)
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cannedSearchTerm, defaultCannedSearch]);

  useEffect(() => {
    fetchAds()
      .then((ads) => {
        setAds(ads);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul className={styles.productList}>
      {products?.map((product) => (
        <li key={product.id} className={styles.product}>
          <h3>{product.name}</h3>
          <img className={styles.productImage} src={product.imgUrl} alt="alt" />
          <b>{formatter.format(Number(product.price) / 100)}</b>
        </li>
      ))}
      {ads?.map((ad) => {
        return (
          <li
            key={ad.id}
            className={`${getIngridStyle(
              ad.placement,
              products?.length ?? 0
            )} ${styles.product}`}
          >
            <img className={styles.adImage} src={ad.imgURL} alt="Product" />
            <h2 className={styles.adTitle}>{ad.title}</h2>
          </li>
        );
      })}
    </ul>
  );
};

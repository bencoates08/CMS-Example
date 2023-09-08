import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { CmsQuickLinks as CmsQuickLinksProps } from "../../../api/cms/cms.types";
import { useCmsContent } from "../CmsProvider";
import styles from "../CmsComponent.module.css";

export const CmsQuickLinks = ({ id, cannedSearches }: CmsQuickLinksProps) => {
  const [selectedPill, dispatch] = useCmsContent<string>(id);
  const [searchParams, setSearchParams] = useSearchParams();

  const facet = `facet-${id}`;
  const searchParam = searchParams.get(facet);

  useEffect(() => {
    if (searchParam) {
      dispatch({
        type: "set",
        state: searchParam,
      });
    }
  }, [searchParam, id, dispatch]);

  const handleClick = (cannedSearch: string) => {
    dispatch({
      type: "set",
      state: cannedSearch,
    });
    setSearchParams((params) => {
      params.set(facet, cannedSearch);
      return params;
    });
  };

  const handleClear = () => {
    dispatch({
      type: "set",
      state: undefined,
    });
    setSearchParams((params) => {
      params.delete(facet);
      return params;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.quickLinks}>
        {selectedPill && (
          <button
            key="clear"
            className={`${styles.quickLinkPill} ${styles.quickLinkPillClear}`}
            onClick={handleClear}
          >
            Clear
          </button>
        )}
        {cannedSearches.map((search) => {
          return (
            <button
              key={search.name}
              className={`${styles.quickLinkPill} ${
                selectedPill === search.term && styles.selectedPill
              }`}
              onClick={() => handleClick(search.term)}
            >
              {search.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

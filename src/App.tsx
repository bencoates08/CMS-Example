import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { fetchCMS } from "./api/cms/cms";
import { CmsContent } from "./api/cms/cms.types";
import { CmsComponent } from "./components/CmsComponents/CmsComponent";
import { CmsProvider } from "./components/CmsComponents/CmsProvider";
import "./styles.css";

export default function App() {
  const [cmsContent, setCmsContent] = useState<CmsContent[]>();

  useEffect(() => {
    fetchCMS("")
      .then((content) => {
        setCmsContent(content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className="container">
                <CmsProvider>
                  {cmsContent?.map((content) => {
                    return <CmsComponent key={content.id} content={content} />;
                  })}
                </CmsProvider>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

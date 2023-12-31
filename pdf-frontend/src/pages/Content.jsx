import "./content.css";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../../../server/uploads/1.pdf";
import { useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Navbar from "../components/navbar";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const checkList = Array(200).fill(false);

const Content = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isclick, setisclick] = useState(false);

  const [check, ischeck] = useState(false);
  const [width, height] = useWindowSize();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleChange = (page, event) => {
    ischeck(event.target.checked);
    checkList[page] = !checkList[page];
  };

  const save = () => {
    setisclick(true);
   
    // console.log("bt1n", data);

    window.print();
  };

  return (
    <>
    <Navbar/>
      <div className="content" id="content">
        <div className="btn noprint">
          <button onClick={save}>Save file</button>
        </div>

        <div className="pdf-div" id="pdf-div">
          <p className="noprint">
            Page {pageNumber} of {numPages}
          </p>

          {/* Displaying the file */}

          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => {

                return (
                  <>
                    <input
                      className="noprint"
                      type="checkbox"
                      onChange={(e) => handleChange(page, e)}
                    />
                    {checkList[page] ? (
                      <Page
                        key={page}
                        pageNumber={page}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        width={
                          width > 900 ? 800 : width < 400 ? 400 : 0.8 * width
                        }
                      />
                    ) : (
                      <div></div>
                    )}
                  </>
                );
              })}
          </Document>
        </div>
      </div>
    </>
  );
};

export default Content;

import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlights from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);

  async function codeReview() {
    const resp = await axios.post("https://code-reviewer-z9xy.onrender.com/ai/get-response", {code});
    if (!resp.data) {
      setReview("Something went wrong");
    } else {
      setReview(resp.data);
    }
  }

  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={6}
              style={{
                overflow: "auto",
                width: "100%",
                height: "100%",
                
              }}
            />
          </div>
          <div className="btn" onClick={codeReview}>
            Review
          </div>
        </div>
        <div className="right">
          <ErrorBoundary>
            <Markdown rehypePlugins={[rehypeHighlights]}>{review}</Markdown>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
}

export default App;
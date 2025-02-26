import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlights from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  async function codeReview() {
    setLoading(true);
    try {
      const resp = await axios.post(
        "https://code-reviewer-z9xy.onrender.com/ai/get-response",
        { code }
      );
      setReview(resp.data || "Something went wrong");
    } catch (error) {
      setReview("Error fetching review.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <>
      <main>
        {/* Left Panel */}
        <div className="left">
          <h2 className="panel-title">Add Code Here to Review</h2>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                overflow: "auto",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <button className="btn" onClick={codeReview}>
            Review
          </button>
        </div>

        {/* Right Panel */}
        <div className="right">
          <h2 className="panel-title">Output</h2>
          <ErrorBoundary>
            {loading ? (
              <div className="skeleton-loader"></div>
            ) : (
              <Markdown rehypePlugins={[rehypeHighlights]}>{review}</Markdown>
            )}
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
}

export default App;

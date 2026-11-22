
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function pasteLink() {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setMessage("");
    } catch {
      setMessage("Please paste your link into the box.");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!url.trim()) {
      setMessage("Please enter a video link first.");
      return;
    }

    try {
      const parsed = new URL(url.trim());

      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid link");
      }

      setLoading(true);
      setMessage(
        "Link received. Media processing will be connected in a later development step."
      );
    } catch {
      setMessage("Please enter a valid video URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header>
        <div className="container nav">
          <a href="/" className="logo">QuickSave.</a>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#platforms">Platforms</a>
            <a href="#how-it-works">How it works</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero container" id="home">
          <h1>
            Save your favourite
            <br />
            media with <span>QuickSave.</span>
          </h1>

          <p>
            A simple way to access supported public media
            from your favourite social platforms.
            Fast, easy and convenient.
          </p>

          <form className="downloader" onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="Paste your video link here..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setMessage("");
              }}
              aria-label="Video URL"
            />

            <button
              type="button"
              className="download-btn"
              onClick={pasteLink}
            >
              Paste link
            </button>

            <button
              type="submit"
              className="download-btn"
              disabled={loading}
            >
              {loading ? "Checking..." : "Get media"}
            </button>
          </form>

          {message && (
            <p role="status" aria-live="polite">{message}</p>
          )}

          <div className="platforms" id="platforms">
            <span className="platform">TikTok</span>
            <span className="platform">Instagram</span>
            <span className="platform">Facebook</span>
            <span className="platform">YouTube</span>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="container">
            <h2>How QuickSave works</h2>
            <p className="section-intro">
              Three simple steps to get started.
            </p>

            <div className="features">
              <article className="feature">
                <h3>01. Copy a link</h3>
                <p>
                  Copy the link of supported public
                  content from your chosen platform.
                </p>
              </article>

              <article className="feature">
                <h3>02. Paste your link</h3>
                <p>
                  Place your copied link into the
                  QuickSave input box.
                </p>
              </article>

              <article className="feature">
                <h3>03. Access your media</h3>
                <p>
                  Use the available supported media
                  retrieval options when connected.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>One simple platform</h2>
            <p className="section-intro">
              QuickSave is being developed to support
              multiple media platforms in one place.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 QuickSave. All rights reserved.</p>
          <p>Use media responsibly and respect creators' rights.</p>
        </div>
      </footer>
    </>
  );
}

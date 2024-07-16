import "./App.css";

import { useEffect, useMemo, useState } from "react";

import client from "./sanityClient";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lang, setLang] = useState<"en" | "pl" | "fr">("en");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]
        `
      )
      .then((data) => {
        setPosts(data);
        console.log(data);
      });
  }, []);

  const localePosts = useMemo(
    () =>
      posts.filter((p) => {
        return p.title[lang] !== undefined && p.body[lang] !== undefined;
      }),
    [posts, lang]
  );

  return (
    <div className="body">
      <h1>Language:</h1>
      <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "pl" | "fr")}>
        <option value="en">English</option>
        <option value="pl">Polski</option>
        <option value="fr">Français</option>
      </select>
      <h1>Posts:</h1>
      <div>
        {localePosts.length
          ? localePosts.map((post, i) => {
              return (
                <div key={post._id} className="post" style={{ backgroundColor: i % 2 ? "darkgray" : "gray" }}>
                  <h1>{post.title[lang]}</h1> <p>{post.body[lang]}</p>
                </div>
              );
            })
          : "No posts!"}
      </div>
    </div>
  );
}

export default App;

interface LocaleString {
  en: string;
  pl?: string;
  fr?: string;
}

export interface Post {
  _id: string;
  _type: "post";
  title: LocaleString;
  body: LocaleString;
}

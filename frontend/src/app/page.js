"use client"
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      if (data.contents) setResponse(data.contents);

      console.log(data.contents);

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const textAreaAdjust = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="text-center space-y-3">
        <div className="text-4xl font-bold text-white tracking-tight">AI Generator</div>
      </div>

      <div className="flex items-center justify-center">
        <div className="">{response}</div>
      </div>

      <div className="flex h-[calc(100vh-200px)] items-end justify-center">
        <div className="w-full max-w-2xl bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-800">

          <form className="flex flex-col gap-4">
            <textarea
              className="w-full resize-none max-h-64 overflow-y-auto rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => {textAreaAdjust(e.currentTarget); setContent(e.target.value)}}
              rows={1}
              cols={30}
              value={content}
              placeholder="Enter your production query..."
            />

            <button onClick={handleSubmit} type="button" 
            className="self-end mt-2 px-6 py-2 rounded-lg bg-indigo-600 
            hover:bg-indigo-500 text-white font-medium 
            transition cursor-pointer">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
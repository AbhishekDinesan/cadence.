import React, { useEffect, useRef, useState } from "react";
import { Factory } from "vexflow";

const ComposerPage = () => {
  const containerRef = useRef(null);
  const [inputNotes, setInputNotes] = useState("C#5/q, B4, A4, G#4"); 
  const [renderedNotes, setRenderedNotes] = useState("C#5/q, B4, A4, G#4"); 
  const [error, setError] = useState("");

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; 
      try {
        const vf = new Factory({
          renderer: { elementId: containerRef.current, width: 400, height: 200 }
        });

        const score = vf.EasyScore();
        const system = vf.System({ width: 300 });

        system
          .addStave({
            voices: [score.voice(score.notes(renderedNotes, { stem: "up" }))],
          })
          .addClef("treble")
          .addTimeSignature("4/4");

        vf.draw();
        setError(""); // Clear error on success
      } catch (err) {
        setError("Invalid input! Please enter notes in the correct format.");
      }
    }
  }, [renderedNotes]); // Re-render only when "Submit" is clicked

  const handleSubmit = () => {
    setRenderedNotes(inputNotes); // Render notes only on submit
  };

  return (
    <div>
      <input
        type="text"
        value={inputNotes}
        onChange={(e) => setInputNotes(e.target.value)}
        placeholder="Enter notes (e.g., C4/q, D4, E4)"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={containerRef} />
    </div>
  );
};

export default ComposerPage;

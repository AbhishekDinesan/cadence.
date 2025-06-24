import React, { useEffect, useRef, useState } from "react";
import { Factory } from "vexflow";

const ComposerPage = () => {
  const containerRef = useRef(null);
  const [inputNotes, setInputNotes] = useState("C#5/q, B4, A4, G#4");
  const [renderedNotes, setRenderedNotes] = useState("C#5/q, B4, A4, G#4");
  const [measures, setMeasures] = useState([0, 1, 2]); 
  const [measurePositions, setMeasurePositions] = useState([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    if (containerRef.current) {
      try {
        containerRef.current.innerHTML = "";

        const factory = new Factory({
          renderer: { elementId: containerRef.current, width: window.innerWidth, height: window.innerHeight }
        });

        const score = factory.EasyScore();
        let x = 10, y = 40;
        const measureWidth = window.innerWidth / 4;
        let positions = [];

        measures.forEach((_, i) => {
          const system = factory.System({ x, y, width: measureWidth, spaceBetweenStaves: 10 });
          const newNotes = score.voice(score.notes(renderedNotes, { stem: "up" }));
          const stave = system.addStave({ voices: [newNotes] });

          if (i === 0) {
            stave.addClef("treble").addTimeSignature("4/4");
          }

          positions.push(x);
          x += measureWidth;
          if (x > window.innerWidth){
            x = 10
            y += window.innerHeight / 4;
          }
        });

        setMeasurePositions(positions); 
        factory.draw();
        setError("");

      } catch (err) {
        setError(`Invalid input! ${err.message}`);
      }
    }
  }, [renderedNotes, measures]);

  const addMeasure = (index) => {
    setMeasures((prev) => [
      ...prev.slice(0, index + 1),
      prev.length, 
      ...prev.slice(index + 1),
    ]);
  };

  const deleteMeasure = (index) => {
    if (measures.length > 1) {
      setMeasures((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={{position: "relative", width: "1000px", height: "300px" }}>
      <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} > This is the name of your piece</h1>
      <div ref={containerRef} style={{ position: "relative", zIndex: 1 }} />
      {measurePositions.map((x, i) => (
        <div
          key={i}
          className="measure-container"
          style={{
            position: "absolute",
            top: "40px",
            left: `${x + 280}px`,
            width: "30px",
            height: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            borderRadius: "5px",
            padding: "5px",
            opacity: 0,
            transition: "opacity 0.2s",
            zIndex: 10, // Make sure it's above the SVG
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <button
            onClick={() => addMeasure(i)}
            style={{ background: "green", color: "white", marginBottom: "5px", cursor: "pointer", border: "none", padding: "3px" }}
          >
            ➕
          </button>
          <button
            onClick={() => deleteMeasure(i)}
            style={{ background: "red", color: "white", cursor: "pointer", border: "none", padding: "3px" }}
          >
            ❌
          </button>
        </div>
      ))}

      <input
        type="text"
        value={inputNotes}
        onChange={(e) => setInputNotes(e.target.value)}
        placeholder="Enter notes (e.g., C4/q, D4, E4)"
      />
      <button onClick={() => setRenderedNotes(inputNotes)}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ComposerPage;

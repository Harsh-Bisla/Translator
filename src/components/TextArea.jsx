import React, { useContext, useState } from "react";
import "./TextArea.css";
import { IoMicOutline } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { store } from "../context/LanguageContext";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { PiRecord } from "react-icons/pi";
import { FaExchangeAlt } from "react-icons/fa";

const TextArea = () => {
  const {
    translateText,
    startHindiSpeechRecognition,
    clearText,
    speakText,
    copyText,
    speakBtn,
    stopSpeaking,
    textCopied,
    listenBtn,
    mode,
  } = useContext(store);
  const [language1, setLanguage1] = useState("hi");
  const [language2, setLanguage2] = useState("en");
  const [langCode, setLangCode] = useState("hi-IN");

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const exchangeLanguage = (e) => {
    setLanguage1(language1 === "hi" ? "en" : "hi");
    setLanguage2(language2 === "hi" ? "en" : "hi");
    setLangCode(language1 === "hi" ? "en" : "hi" === "hi" ? "hi-IN" : "en-US");
  };

  return (
    <section className={`text-section ${mode ? "text-section-dark" : ""}`}>
      <div className="header">
        <h1>Enter your text to Translate</h1>
        <button
          onClick={() =>
            startHindiSpeechRecognition({
              setText1,
              text1,
              language1,
              language2,
              setText2,
              langCode,
            })
          }
        >
          {listenBtn ? <PiRecord /> : <IoMicOutline />}
        </button>
      </div>
      <div className="textarea-box">
        <div className="textbox-1">
          <select
            id="lang-1"
            value={language1}
            onChange={(e) => {
              setLanguage1(e.target.value);
              setLangCode(e.target.value === "hi" ? "hi-IN" : "en-US");
            }}
          >
            <option value="hi">Hindi</option>
            <option value="en">English</option>
          </select>
          <textarea
            rows={10}
            className={`text-area ${mode ? "text-area-light" : ""}`}
            placeholder="Enter your text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          ></textarea>
        </div>
        <p onClick={exchangeLanguage} className="exchange-icon">
          {" "}
          <FaExchangeAlt />
        </p>
        <div className="textbox-1">
          <select
            id="lang-1"
            value={language2}
            onChange={(e) => {
              setLanguage2(e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <textarea
            rows={10}
            className={`text-area ${mode ? "text-area-light" : ""}`}
            placeholder="Review your text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="all-btns">
        <button
          onClick={() =>
            translateText({ text1, setText1, language1, language2, setText2 })
          }
        >
          Translate <MdGTranslate />
        </button>

        {speakBtn && (
          <button onClick={() => speakText(text2)}>
            Listen <HiSpeakerWave />
          </button>
        )}

        {!speakBtn && (
          <button onClick={stopSpeaking}>
            Stop <IoVolumeMuteOutline />
          </button>
        )}

        <button onClick={() => clearText({ setText1, setText2 })}>
          Clear <RiDeleteBinLine />
        </button>

        {!textCopied && (
          <button onClick={() => copyText(text2)}>
            Copy <FaRegCopy />
          </button>
        )}

        {textCopied && (
          <button>
            Copied <FaRegCopy />
          </button>
        )}
      </div>
      <div className="summary">
        <h1>Your text Summary</h1>
        <p>
          {text1.trim() === "" ? 0 : text1.trim().split(/\s+/).length} words and{" "}
          {text1.length} characters
        </p>{" "}
        <p>
          {text1.trim() === "" ? 0 : text1.trim().split(/\s+/).length / 200}{" "}
          minutes to read
        </p>
      </div>
      <h2 id="preview">Preview</h2>
      <p>{text1 === "" ? "nothing to preview..." : text1}</p>
    </section>
  );
};

export default TextArea;

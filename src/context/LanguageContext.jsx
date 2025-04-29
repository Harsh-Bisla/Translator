import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const store = createContext();

function LanguageContext({ children }) {
  const succMsg = (msg) => toast.success(msg);
  const warnMsg = (msg) => toast.warn(msg);
  const [mode, setMode] = useState(
    localStorage.getItem("mode") === "true" || false
  );
  const [speakBtn, setSpeakBtn] = useState(true);
  const [textCopied, setTextCopied] = useState(false);
  const [listenBtn, setListenBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  // fucntion to translate text
  const translateText = async ({ text1, language1, language2, setText2 }) => {
    if (text1 === "") warnMsg("Please enter the text!");
    else {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${text1}&langpair=${language1}|${language2}`
        );
        const data = await res.json();
        setLoading(false);
        if (data.responseStatus === 200) {
          setText2(data.responseData.translatedText);
        } else {
          warnMsg("Failed to translate text");
        }
      } catch (error) {
        warnMsg(error.message);
      }
    }
  };

  // function to listen text
  function startHindiSpeechRecognition({
    setText1,
    language1,
    language2,
    setText2,
    text1,
    langCode,
  }) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      warnMsg("Speech recognition is not supported in this browser.");
      return;
    }

    succMsg("Listening...");
    setListenBtn(true);

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    console.log(langCode);
    recognition.lang = langCode;

    let accumulatedText = text1 || "";
    let debounceTimer;

    recognition.onstart = () => {
      console.log("Speech recognition started.");
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      accumulatedText = transcript;
      setText1(transcript);

      // Debounce translation to avoid too many API calls
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        translateText({
          text1: accumulatedText,
          language1,
          language2,
          setText2,
        });
      }, 800); // 800ms debounce
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      warnMsg(event.error);
      setListenBtn(false);
    };

    recognition.onspeechend = () => {
      recognition.stop(); // Auto-stop when user stops talking
      console.log("Speech ended and recognition stopped.");
    };

    recognition.onend = () => {
      setListenBtn(false);
      console.log("Speech recognition service stopped.");
    };

    recognition.start();
  }

  // clear all text
  const clearText = ({ setText1, setText2 }) => {
    succMsg("Text Cleared");
    setText1("");
    setText2("");
  };

  // speak text function
  function speakText(text) {
    succMsg("Listen carefully");
    if (text === "") warnMsg("Please write something to listen!");
    else {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "hi-IN"; // Hindi language (change if needed)
        utterance.pitch = 1; // Default pitch
        utterance.rate = 1; // Default speed
        utterance.volume = 1; // Default volume

        setSpeakBtn(false);
        window.speechSynthesis.speak(utterance);

        utterance.onend = function () {
          setSpeakBtn(true);
        };
      } else {
        console.log("Speech Synthesis API not supported in this browser.");
      }
    }
  }

  // stop speaking
  const stopSpeaking = () => {
    setSpeakBtn(true);
    speechSynthesis.cancel();
  };

  // copy text
  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTextCopied(true);
        setTimeout(() => {
          setTextCopied(false);
        }, 1500);
        succMsg("Text Copied");
      })
      .catch(() => {
        warnMsg("Failed to copy text");
      });
  };

  useEffect(() => {
    const Mode = localStorage.getItem("mode") === "true";
    if (Mode) {
      setMode(Mode);
    }
  }, []);

  return (
    <store.Provider
      value={{
        translateText,
        startHindiSpeechRecognition,
        clearText,
        speakText,
        copyText,
        speakBtn,
        stopSpeaking,
        textCopied,
        listenBtn,
        loading,
        mode,
        setMode,
      }}
    >
      {children}
    </store.Provider>
  );
}

export default LanguageContext;

// src/App.jsx

import React, { useEffect, useState } from "react";
import photo1 from "./img/1st.jpeg";
import photo2 from "./img/2nd.jpeg";
import photo3 from "./img/3rd.jpeg";
import photo4 from "./img/4th.jpeg";
import photo5 from "./img/5th.jpeg";
import photo6 from "./img/6th.jpeg";

import {
  Heart,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Gift,
  Music2,
  RotateCcw,
  PartyPopper,
  Terminal,
} from "lucide-react";

const photos = [
  {
    src: photo1,
    caption: "Birthday girl energy ✨",
  },
  {
    src: photo2,
    caption: "Cute? Unfortunately, yes. 💗",
  },
  {
    src: photo3,
    caption: "Main character. No debate.",
  },
  {
    src: photo4,
    caption: "Certified favourite human ♡",
  },
  {
    src: photo5,
    caption: "A little more of your main-character era ✨",
  },
  {
    src: photo6,
    caption: "One more reason to smile ♡",
  },
];

const bootMessages = [
  "Finding birthday girl...",
  "Checking friendship status...",
  "Loading daily calls...",
  "Analyzing reply speed...",
];

const resultMessages = [
  "Reply speed: CRITICALLY LOW 💀",
  "Bakchodi detected: MAXIMUM",
  "Realationship status: UNREPLACEABLE ♡",
  "Heart Connect Ready 💞.",
];

const questions = [
  {
    eyebrow: "QUESTION 01 / VIBE CHECK",
    title: "Choose your birthday-girl setting.",
    options: [
      "Cute & innocent 😇",
      "Drama department 🎭",
      "Flirty menace 💋",
      "All of the above 💅",
    ],
    response:
      "Correct. Divya contains multitudes. Mostly drama. 💗",
  },
  {
    eyebrow: "QUESTION 02 / FRIENDSHIP AUDIT",
    title: "What happens when you try to have a serious conversation with me?",
    options: [
      "I listen properly 🥹",
      "I start bakchodi 💀",
      "Both, somehow 🤝",
      "File a complaint immediately 📢",
    ],
    response:
      "Complaint received. It will be ignored with affection. 😂",
  },
  {
    eyebrow: "QUESTION 03 / FINAL EXAM",
    title: "How long will you tolerate me?",
    options: [
      "One more call 📞",
      "At least another year 🎂",
      "Lifetime subscription ♾️",
      "Need to check my calendar 🗓️",
    ],
    response:
      "Subscription renewed. Cancellation policy: no refunds. ♡",
  },
];

const floatingStickers = [
  { icon: "🦋", className: "butterfly butterfly-one" },
  { icon: "🦋", className: "butterfly butterfly-two" },
  { icon: "🎂", className: "sticker cake-sticker" },
  { icon: "🎁", className: "sticker gift-sticker" },
  { icon: "🌷", className: "sticker flower-sticker" },
  { icon: "✨", className: "sticker sparkle-sticker" },
  { icon: "💗", className: "sticker heart-sticker" },
];

export default function App() {
  const [page, setPage] = useState(() => {
    const requestedPage = window.location.hash.replace("#", "");
    const validPages = ["loading", "origin", "quiz", "photos", "chaos", "letter", "voice"];
    return validPages.includes(requestedPage) ? requestedPage : "loading";
  });

const [bootIndex, setBootIndex] = useState(0);
const [bootPhase, setBootPhase] = useState("scanning");
const [resultIndex, setResultIndex] = useState(0);
const [bootComplete, setBootComplete] = useState(false);

const [photoIndex, setPhotoIndex] = useState(0);
const [photoLoaded, setPhotoLoaded] = useState(true);
const [answers, setAnswers] = useState({});
const [questionIndex, setQuestionIndex] = useState(0);
const [showVoice, setShowVoice] = useState(false);
const [reaction, setReaction] = useState("");

useEffect(() => {
  if (page !== "loading" || bootComplete) return;
  const timer = setTimeout(() => {
    if (bootPhase === "scanning") {
      if (bootIndex < bootMessages.length - 1) setBootIndex((index) => index + 1);
      else { setBootPhase("results"); setResultIndex(0); }
    } else if (resultIndex < resultMessages.length - 1) {
      setResultIndex((index) => index + 1);
    } else {
      setBootComplete(true);
    }
  }, bootPhase === "scanning" ? 1050 : 750);
  return () => clearTimeout(timer);
}, [page, bootPhase, bootIndex, resultIndex, bootComplete]);

  useEffect(() => {
    if (page !== "photos") return;

    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
      setPhotoLoaded(true);
    }, 4000);

    return () => clearInterval(interval);
  }, [page]);

  useEffect(() => {
    if (!window.location.hash) window.history.replaceState({ birthdayPage: "loading" }, "", "#loading");
    const handlePopState = () => {
      setPage(window.location.hash.replace("#", "") || "loading");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const go = (next) => {
    if (next !== page) window.history.pushState({ birthdayPage: next }, "", `#${next}`);
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const movePhoto = (step) => {
    setPhotoIndex(
      (current) => (current + step + photos.length) % photos.length
    );
    setPhotoLoaded(true);
  };

  const currentQuestion = questions[questionIndex];

  const chooseAnswer = (option) => {
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: option,
    }));
  };

  return (
    <main className="app-shell">
      <div className="grain" />
      <div className="ambient-sparkles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ "--i": index }}>✦</span>)}
      </div>

      <div className="floating-background" aria-hidden="true">
        {floatingStickers.map((sticker, index) => (
          <span
            key={index}
            className={sticker.className}
            style={{ "--delay": `${index * -1.3}s` }}
          >
            {sticker.icon}
          </span>
        ))}
      </div>

      <nav className="topbar">
        <button
          className="wordmark"
          onClick={() => {
            setBootIndex(0);
            setBootPhase("scanning");
            setResultIndex(0);
            setBootComplete(false);
            go("loading");
          }}
        >
          <span className="wordmark-dot" />
          DIVYA.LOVE❤️
        </button>

        <span className="topbar-note">
          <Heart size={13} fill="currentColor" />
          made with suspicious effort
        </span>
      </nav>

      {/* FIRST PAGE: CINEMATIC LOADING ANIMATION */}

      {page === "loading" && (
        <section className="loading-screen section-wrap">
          <div className="loading-symbol">
            <Heart size={35} fill="currentColor" />
            <span className="loading-ring ring-one" />
            <span className="loading-ring ring-two" />
            <span className="loading-spark">✦</span>
          </div>

          <p className="terminal-label">
            <Terminal size={14} />
            BIRTHDAY.EXE / SYSTEM BOOT
          </p>

          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dots">
                <i />
                <i />
                <i />
              </span>
              <span>divya_birthday.sh</span>
              <span className="terminal-live">● LIVE</span>
            </div>

            <div className="terminal-content">
              <p className="terminal-command">
                <span className="terminal-prompt">$</span>{" "}
                INITIALIZING DIVYA.EXE...
              </p>

              <div className="terminal-log">
                {bootPhase === "scanning" && !bootComplete && (
                  <p className="terminal-line scanning-line" key={bootIndex}>
                    <span className="line-arrow">&gt;</span>{bootMessages[bootIndex]}<span className="typing-cursor">▋</span>
                  </p>
                )}
                {(bootPhase === "results" || bootComplete) && resultMessages.slice(0, bootComplete ? 4 : resultIndex + 1).map((message, index) => (
                  <p className={`terminal-line terminal-highlight ${index === resultIndex && !bootComplete ? "new-line" : ""}`} key={message}>
                    <span className="line-arrow">&gt;</span>{message}
                    {index === resultIndex && !bootComplete && <span className="typing-cursor">▋</span>}
                  </p>
                ))}
              </div>

              <div className="terminal-progress">
                <div
                  className={`terminal-progress-fill ${bootComplete ? "progress-complete" : ""}`}
                  style={{ width: bootComplete ? "100%" : bootPhase === "scanning" ? `${((bootIndex + 1) / bootMessages.length) * 45}%` : `${45 + ((resultIndex + 1) / resultMessages.length) * 55}%` }}
                />
              </div>

              <div className="terminal-footer">
                <span>{bootComplete ? "ALL SYSTEMS READY" : bootPhase === "scanning" ? "SCANNING..." : "VERIFYING FRIENDSHIP..."}</span>
                <span>MADE WITH ♥</span>
              </div>
            </div>
          </div>

          {bootComplete && (
            <div className="birthday-reveal">
              <div className="reveal-badge">
                <Sparkles size={13} />
                TODAY IS ALL ABOUT YOU
                <Sparkles size={13} />
              </div>

          <h1>
            Happy Birthday,
            <br />
            <em>Divyaaa.</em>
          </h1>

              <p className="reveal-message">
                One random conversation.
                <br />
                One unexpected friendship.
                <br />
                And one person who became so important. 💗
              </p>

              <button
                className="primary-button reveal-button"
                onClick={() => go("origin")}
              >
                <span>START THE CHAOS</span>
                <span className="button-icon">↗</span>
              </button>

              <p className="tiny-note">
                Warning: may contain feelings and terrible jokes.
              </p>
            </div>
          )}
        </section>
      )}

      {/* PAGE 2: YOUR ORIGIN STORY */}

      {page === "origin" && (
        <section className="story-section section-wrap page-enter">
          <div className="eyebrow">
            <BookOpen size={14} />
            CHAPTER 01 · THE ORIGIN STORY
          </div>

          <h1 className="section-title">
            All because
            <br />
            <em>of one book.</em>
          </h1>

          <div className="story-card animated-card">
            <div className="story-icon">
              <BookOpen size={27} />
            </div>

            <p className="story-kicker">STUDY LAB · JEE PREPARATION</p>

            <h2>The Brahmastra incident. 📚</h2>

            <p>
              I bought a book called <em>Brahmastra</em> for JEE preparation
              and left it on my desk. You noticed it, asked me about it,
              and found out I was preparing for JEE too.
            </p>

            <p>
              Then we started talking. I had no idea that one random
              conversation in a study lab would turn into daily calls,
              endless bakchodi, and a friendship I care about this much.
            </p>

            <div className="story-stamp">THE PLOT TWIST WAS YOU ✦</div>
          </div>

          <button className="primary-button" onClick={() => go("quiz")}>
            <span>Take a very important quiz</span>
            <span className="button-icon">♡</span>
          </button>
        </section>
      )}

      {/* PAGE 3: INTERACTIVE QUIZ */}

      {page === "quiz" && (
        <section className="quiz-section section-wrap page-enter">
          <div className="eyebrow">
            <PartyPopper size={14} />
            INTERACTIVE FRIENDSHIP TEST
          </div>

          <div className="quiz-progress">
            {questions.map((question, index) => (
              <span
                key={question.eyebrow}
                className={
                  index <= questionIndex
                    ? "progress-dot active"
                    : "progress-dot"
                }
              />
            ))}
          </div>

          <p className="question-eyebrow">{currentQuestion.eyebrow}</p>

          <h1 className="section-title question-title">
            {currentQuestion.title}
          </h1>

          <div className="option-list">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`option-button ${
                  answers[questionIndex] === option ? "selected" : ""
                }`}
                onClick={() => chooseAnswer(option)}
              >
                <span>{option}</span>
                <span className="option-check">
                  {answers[questionIndex] === option ? "✓" : "＋"}
                </span>
              </button>
            ))}
          </div>

          {answers[questionIndex] && (
            <div className="quiz-response" key={questionIndex}>
              <Sparkles size={16} />
              <p>{currentQuestion.response}</p>
            </div>
          )}

          <div className="quiz-nav">
            <button
              className="outline-button"
              disabled={questionIndex === 0}
              onClick={() => setQuestionIndex((index) => index - 1)}
            >
              <ChevronLeft size={16} />
              Back
            </button>

            {questionIndex < questions.length - 1 ? (
              <button
                className="primary-button"
                disabled={!answers[questionIndex]}
                onClick={() => setQuestionIndex((index) => index + 1)}
              >
                Next question
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="primary-button"
                disabled={!answers[questionIndex]}
                onClick={() => go("photos")}
              >
                Unlock photos
                <Gift size={16} />
              </button>
            )}
          </div>

          <p className="tiny-note">
            Your answers stay here. No database. No tracking.
          </p>
        </section>
      )}

      {/* PAGE 4: SWIPEABLE PHOTO GALLERY */}

      {page === "photos" && (
        <section className="photo-section section-wrap page-enter">
          <div className="eyebrow">
            <Heart size={14} fill="currentColor" />
            CHAPTER 02 · THE BIRTHDAY GIRL
          </div>

          <h1 className="section-title">
            A whole gallery
            <br />
            <em>for you.</em>
          </h1>

          <p className="gallery-intro">
            Swipe through your photos. Main character privileges. ✨
          </p>

          <div className="gallery">
            <button
              className="gallery-arrow"
              aria-label="Previous photo"
              onClick={() => movePhoto(-1)}
            >
              <ChevronLeft />
            </button>


            <div
              className="photo-card"
              key={photoIndex}
              onTouchStart={(event) => {
                window.galleryTouchX = event.changedTouches[0].screenX;
              }}
              onTouchEnd={(event) => {
                const delta =
                  event.changedTouches[0].screenX -
                  (window.galleryTouchX || 0);

                if (Math.abs(delta) > 45) {
                  movePhoto(delta < 0 ? 1 : -1);
                }
              }}
            >
              {photoLoaded ? (
                <img
                  key={photos[photoIndex].src}
                  src={photos[photoIndex].src}
                  alt={`Divyaaa photo ${photoIndex + 1}`}
                  onError={() => setPhotoLoaded(false)}
                />
              ) : (
                <div className="photo-placeholder">
                  <Heart size={34} />
                  <strong>Your photo goes here</strong>
                  <span>
                    Add <code>public/photos/divya-{photoIndex + 1}.jpg</code>
                  </span>
                </div>
              )}

              <span className="photo-number">
                {String(photoIndex + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </span>

              <span className="photo-heart-sticker">♡</span>
            </div>

            <button
              className="gallery-arrow"
              aria-label="Next photo"
              onClick={() => movePhoto(1)}
            >
              <ChevronRight />
            </button>
          </div>

          <p className="gallery-caption" key={photoIndex}>
            {photos[photoIndex].caption}
          </p>

          <div className="gallery-dots">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                aria-label={`Show photo ${index + 1}`}
                className={
                  index === photoIndex ? "gallery-dot active" : "gallery-dot"
                }
                onClick={() => {
                  setPhotoIndex(index);
                  setPhotoLoaded(true);
                }}
              />
            ))}
          </div>

          <button className="primary-button" onClick={() => go("chaos")}>
            More evidence against you
            <span className="button-icon">↗</span>
          </button>
        </section>
      )}

      {/* PAGE 5: FRIENDSHIP JOKES */}

      {page === "chaos" && (
        <section className="chaos-section section-wrap page-enter">
          <div className="eyebrow">
            <Sparkles size={14} />
            FRIENDSHIP RESEARCH DEPARTMENT
          </div>

          <h1 className="section-title">
            The Divya
            <br />
            <em>effect.</em>
          </h1>

          <div className="finding-grid">
            <article className="finding-card animated-card">
              <span className="finding-number">FINDING 001</span>
              <h2>Reply speed 📱</h2>
              <p>Daily calls? Absolutely.</p>
              <p>Replies to messages? Please allow 3–5 business days. 💀</p>
            </article>

            <article className="finding-card animated-card">
              <span className="finding-number">FINDING 002</span>
              <h2>Seriousness compatibility 🎭</h2>
              <p>Divyaaa: trying to have a serious conversation.</p>
              <p>Me: starting bakchodi for absolutely no reason.</p>
              <p className="finding-result">
                Result: Divyaaa angry. Me laughing. Friendship continues.
              </p>
            </article>

            <article className="finding-card animated-card">
              <span className="finding-number">FINDING 003</span>
              <h2>The best-friend equation 💋</h2>
              <p>Two people flirting with each other.</p>
              <p>Both saying, "We're just best friends."</p>
              <p className="finding-result">
                Scientists remain confused. 😂
              </p>
            </article>
          </div>

          <button className="primary-button" onClick={() => go("letter")}>
            One serious minute
            <Heart size={16} />
          </button>
        </section>
      )}

      {/* PAGE 6: PERSONAL LETTER */}

      {page === "letter" && (
        <section className="letter-section section-wrap page-enter">
          <div className="eyebrow">
            <Heart size={14} fill="currentColor" />
            NO BAKCHODI FOR A MINUTE
          </div>

          <h1 className="section-title">
            A little truth
            <br />
            <em>from me to you.</em>
          </h1>

          <div className="letter-card">
            <div className="letter-topline">
              <span>FOR DIVYAAA</span>
              <span>30 · 10</span>
            </div>

            <div className="letter-decoration">♡</div>

            <p className="letter-greeting">Hey Divyaaa,</p>

            <p>
              Happy birthday, idiot. ❤️ I genuinely didn't expect that the
              girl who asked about a book on my desk would become someone
              this important to me.
            </p>

            <p>
              Thank you for listening to me, for being there when I need to
              talk, and for making me feel like I can share what's on my
              mind without pretending I'm okay all the time. That means
              more to me than I probably say out loud.
            </p>

            <p>
              I love our daily calls, our random conversations, our flirting
              that we keep calling best-friend behaviour, and even the
              moments when you get annoyed because I refuse to be serious.
              I'm lucky that a random conversation turned into you being
              part of my life.
            </p>

            <p>
              I hope this year gives you so many reasons to smile, people
              who show up for you the way you show up for others, and all
              the little things you've been wishing for.
            </p>

            <p className="letter-signoff">
              Stay happy. Stay amazing. Stay a little annoyed at me.
              <br />
              <span>your favourite headache ♡</span>
            </p>

            <div className="letter-footer">
              WRITTEN WITH CARE. AND A LITTLE TOO MUCH CSS.
            </div>
          </div>

          <div className="next-step">
            <p>Last unlock. And yes, I practised this part.</p>

            <button className="outline-button" onClick={() => go("voice")}>
              <Music2 size={16} />
              Hear my message ♡
            </button>
          </div>
        </section>
      )}

      {/* PAGE 7: YOUR VOICE MESSAGE */}

      {page === "voice" && (
        <section className="voice-section section-wrap page-enter">
          <div className="eyebrow">
            <Music2 size={14} />
            FINAL UNLOCK
          </div>

          <h1 className="section-title">
            Okay, Divyaaa.
            <br />
            <em>Listen up.</em>
          </h1>

          <div className="voice-card">
            <div className="voice-wave">
              {Array.from({ length: 13 }, (_, index) => (
                <span key={index} />
              ))}
            </div>

            <Music2 size={26} className="voice-icon" />

            <h2>A message from me</h2>

            <p>
              "You read all this? Happy birthday, Divyaaa!"
            </p>

            <p className="voice-instruction">
              Save your recording as public/voice-message.mp3
            </p>

            <button
              className="outline-button"
              onClick={() => setShowVoice((current) => !current)}
            >
              {showVoice ? "Hide player" : "Play my message"} ▶
            </button>

            {showVoice && (
              <audio className="voice-audio" controls>
                <source src="/voice-message.mp3" type="audio/mpeg" />
                Your browser does not support audio.
              </audio>
            )}
          </div>

          <div className="final-note">
            <Heart size={17} fill="currentColor" />
            <p>
              Different cities. Daily calls. Endless bakchodi.
              <br />
              <strong>Happy birthday, Divyaaa. ❤️</strong>
            </p>
          </div>

          <div className="answer-buttons">
            <button
              className="primary-button"
              onClick={() => setReaction("smile")}
            >
              You made me smile ❤️
            </button>

            <button
              className="outline-button"
              onClick={() => setReaction("annoying")}
            >
              You're still annoying 😂
            </button>
          </div>

          {reaction && (
            <div className="answer-result" key={reaction}>
              {reaction === "smile"
                ? "Screenshot this moment. It might never happen again. 🥹"
                : "Correct answer. Your honesty has been appreciated. 😂"}
            </div>
          )}

          <button
            className="restart-button"
            onClick={() => {
              setBootIndex(0);
              setBootPhase("scanning");
              setResultIndex(0);
              setBootComplete(false);
              setAnswers({});
              setQuestionIndex(0);
              setShowVoice(false);
              setReaction("");
              go("loading");
            }}
          >
            <RotateCcw size={13} />
            Experience it again
          </button>
        </section>
      )}

      <footer className="footer">
        <span>MADE WITH A LITTLE TOO MUCH EFFORT</span>
        <span>
          DIVYA'S BIRTHDAY EDITION <Heart size={11} fill="currentColor" />
        </span>
      </footer>
    </main>
  );
}
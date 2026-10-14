import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

const apologyText = `Ms. Careless,\n\nI’m so sorry for all the things that happened between us.\nIt was a huge mistake from my side…\nI know I hurt you a lot and annoyed you.\nBut it’s because I became too comfortable and attached to you 🥺\nYou are my home, my calm, my forever ❤️\nWe fight, we fix, we stay 🫶`

const promiseText = `I can’t promise I won’t fight…\nBut I promise we will fix every fight.\nWe fight, we fix, we stay ❤️\n\nI promise to listen, hug you when upset, make you smile, be your safe place.\nI promise to apologize when wrong, be patient, and hold your hand through every storm.\nI promise to love you, care for you, and never take you for granted.\nBecause you are my forever, my home, my happiness, my Ms.Careless ❤️`

function useTypingEffect(text: string, speed = 20) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let cancelled = false
    let index = 0

    const typeNext = () => {
      if (cancelled) return
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1))
        index += 1
        window.setTimeout(typeNext, speed)
      }
    }

    setDisplayed('')
    typeNext()

    return () => {
      cancelled = true
    }
  }, [text, speed])

  return displayed
}

function createFallingDecor() {
  const decor = document.createElement('div')
  const roll = Math.random()

  if (roll < 0.5) {
    decor.classList.add('heart')
    decor.innerHTML = ['❤', '💖', '💜', '💗'][Math.floor(Math.random() * 4)]
  } else if (roll < 0.8) {
    decor.classList.add('petal')
    decor.innerHTML = '🌹'
  } else {
    decor.classList.add('sparkle')
    decor.innerHTML = ['✨', '🌟', '💫'][Math.floor(Math.random() * 3)]
  }

  decor.style.left = `${Math.random() * 100}vw`
  decor.style.fontSize = `${Math.random() * 18 + 12}px`
  decor.style.animationDuration = `${Math.random() * 6 + 14}s`
  decor.style.opacity = '0.7'
  document.body.appendChild(decor)
  window.setTimeout(() => decor.remove(), 18000)
}

function createCursorSparkle(x: number, y: number) {
  const sparkle = document.createElement('div')
  sparkle.classList.add('sparkle')
  sparkle.innerHTML = ['💖', '💜', '💗'][Math.floor(Math.random() * 3)]
  sparkle.style.left = `${x}px`
  sparkle.style.top = `${y}px`
  sparkle.style.fontSize = `${Math.random() * 12 + 12}px`
  document.body.appendChild(sparkle)
  window.setTimeout(() => sparkle.remove(), 1000)
}

function createBurstHearts() {
  for (let heartIndex = 0; heartIndex < 50; heartIndex += 1) {
    const heart = document.createElement('div')
    heart.classList.add('heart')
    heart.innerHTML = ['❤', '💖', '💜'][Math.floor(Math.random() * 3)]
    heart.style.left = `${Math.random() * 100}vw`
    heart.style.fontSize = `${Math.random() * 20 + 12}px`
    heart.style.animationDuration = `${Math.random() * 4 + 10}s`
    document.body.appendChild(heart)
    window.setTimeout(() => heart.remove(), 5000)
  }
}

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const apologyTyped = useTypingEffect(apologyText)
  const promiseTyped = useTypingEffect(promiseText)

  const totalSlides = useMemo(() => 6, [])

  useEffect(() => {
    const intervalId = window.setInterval(createFallingDecor, 1200)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      createCursorSparkle(event.clientX, event.clientY)
    }
    document.addEventListener('mousemove', handleMove)
    return () => document.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % totalSlides)
      }
      if (event.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [totalSlides])

  const goNext = () => setCurrentSlide(prev => (prev + 1) % totalSlides)
  const goPrev = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)

  return (
    <div className="love-page">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <section className="slide" aria-hidden={currentSlide !== 0} inert={currentSlide !== 0}>
          <h1>Happy 1st February, My Love 💕</h1>
          <h2>Happy Valentine Month Ms. Careless ❤️</h2>
        </section>

        <section className="slide" aria-hidden={currentSlide !== 1} inert={currentSlide !== 1}>
          <div className="card">
            <h2>😔 My Apology</h2>
            <p className="love-text typing">{apologyTyped}</p>
            <button
              className="button"
              type="button"
              onClick={() => {
                window.alert('She smiled 😭❤️\nYou are forgiven 💕')
                createBurstHearts()
              }}
            >
              Forgive Me 🥺
            </button>
          </div>
        </section>

        <section className="slide" aria-hidden={currentSlide !== 2} inert={currentSlide !== 2}>
          <div className="card">
            <h2>🌸 My Promise</h2>
            <p className="love-text typing">{promiseTyped}</p>
          </div>
        </section>

        <section className="slide" aria-hidden={currentSlide !== 3} inert={currentSlide !== 3}>
          <div className="card gallery">
            <h2>📸 Memory Gallery</h2>
            <div>
              <img src="https://i.imgur.com/6cNUCfy.jpeg" alt="Ms. Careless" />
              <p className="love-text">(1) Ms. Careless</p>
            </div>
            <div>
              <img
                src="https://i.imgur.com/4mqZJUS.jpeg"
                alt="Gifted photo after reconnecting"
              />
              <p className="love-text">
                (2) The first picture you send to me after you came back to my
                life as my greatest gift… just Cherry on the top 😘
              </p>
            </div>
            <div>
              <img
                src="https://i.imgur.com/fps11SC.jpeg"
                alt="First picture shared while talking"
              />
              <p className="love-text">
                (3) The first picture you sent me when we started talking… it
                will always be with me forever
              </p>
            </div>
            <div>
              <img
                src="https://i.imgur.com/kCPffVC.jpeg"
                alt="Favorite portrait"
              />
              <p className="love-text">
                (4) The bestest picture I could have asked for… I love you my
                ms.careless 😘😘 I&apos;m sorry to use same pictures and text here
                but I wanted it complete before you wake up so I’m so sorry
              </p>
            </div>
          </div>
        </section>

        <section className="slide" aria-hidden={currentSlide !== 4} inert={currentSlide !== 4}>
          <h2>💍 Future Dreams</h2>
          <div className="future-container" aria-label="Future dreams">
            <div className="future-card">Future trips together ✈️</div>
            <div className="future-card">Future home together 🏠</div>
            <div className="future-card">Future forever together 💕</div>
          </div>
        </section>

        <section className="slide" aria-hidden={currentSlide !== 5} inert={currentSlide !== 5}>
          <h2>💘 Final Message</h2>
          <p className="love-text final-message">
            You are not my girlfriend, you are my forever, my home, my peace ❤️
          </p>
        </section>
      </div>

      <button className="nav-btn" id="prev" type="button" aria-label="Previous slide" onClick={goPrev}>
        &#10094;
      </button>
      <button className="nav-btn" id="next" type="button" aria-label="Next slide" onClick={goNext}>
        &#10095;
      </button>

      <footer>Made with endless love 💕 by me, only for you</footer>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})

import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic())

// API routes
app.get('/api/movies', (c) => {
  return c.json({
    nowShowing: [
      { id: 1, title: "American Princess", genre: "Urban Drama", rating: 4.9, duration: "2h 15m", image: "/static/poster-american-princess.jpg" },
      { id: 2, title: "The White, The Black and The Gray", genre: "Western", rating: 4.9, duration: "2h 42m", image: "/static/poster-white-black-gray.jpg" },
      { id: 3, title: "What They Took", genre: "Action Thriller", rating: 4.9, duration: "2h 22m", image: "/static/poster-what-they-took.jpg" },
      { id: 4, title: "Mr. Gram", genre: "Crime Drama", rating: 4.8, duration: "2h 18m", image: "/static/poster-mr-gram.jpg" },
      { id: 5, title: "Blood and Iron", genre: "Fantasy Action", rating: 4.8, duration: "2h 28m", image: "/static/poster-blood-and-iron.jpg" },
      { id: 6, title: "American Revenge", genre: "Thriller", rating: 4.7, duration: "2h 05m", image: "/static/poster-american-revenge.jpg" }
    ],
    comingSoon: [
      { id: 1, title: "American Princess", genre: "Urban Drama", releaseDate: "Feb 14, 2026", image: "/static/poster-american-princess.jpg" },
      { id: 2, title: "The White, The Black and The Gray", genre: "Western", releaseDate: "Mar 21, 2026", image: "/static/poster-white-black-gray.jpg" },
      { id: 3, title: "What They Took", genre: "Action Thriller", releaseDate: "Apr 18, 2026", image: "/static/poster-what-they-took.jpg" },
      { id: 4, title: "Mr. Gram", genre: "Crime Drama", releaseDate: "May 30, 2026", image: "/static/poster-mr-gram.jpg" },
      { id: 5, title: "Blood and Iron", genre: "Fantasy Action", releaseDate: "Jul 4, 2026", image: "/static/poster-blood-and-iron.jpg" },
      { id: 6, title: "American Revenge", genre: "Thriller", releaseDate: "Aug 15, 2026", image: "/static/poster-american-revenge.jpg" }
    ]
  })
})

// Main page - restored from working deployment ca857401
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fifth Ave Film | Experience Cinema</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      :root {
        --gold: #B8860B;
        --gold-light: #D4A84B;
        --gold-dark: #8B6914;
        --gold-warm: #C5941A;
        --black: #1A1A1A;
        --black-deep: #0A0A0A;
        --black-light: #222222;
        --charcoal: #2D2D2D;
        --white: #FFFFFF;
        --cream: #F5F0E1;
        --gray: #777777;
        --red-curtain: #6B0F1A;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        font-family: 'Montserrat', sans-serif;
        background: var(--black-deep);
        color: var(--white);
        overflow-x: hidden;
      }
      
      /* Custom Scrollbar */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: var(--black-deep); }
      ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 0; }
      
      /* Art Deco Border Frame for hero section only */
      .page-frame {
        position: absolute;
        inset: 15px;
        border: 2px solid var(--gold);
        pointer-events: none;
        z-index: 10;
      }
      
      .page-frame::before {
        content: '';
        position: absolute;
        inset: 5px;
        border: 1px solid rgba(201, 162, 39, 0.4);
      }
      
      /* Art Deco Corner Decorations for hero section only */
      .corner-decor {
        position: absolute;
        width: 60px;
        height: 60px;
        z-index: 11;
        pointer-events: none;
      }
      
      .corner-decor::before,
      .corner-decor::after {
        content: '';
        position: absolute;
        background: var(--gold);
      }
      
      .corner-tl { top: 15px; left: 15px; position: absolute; }
      .corner-tr { top: 15px; right: 15px; position: absolute; }
      .corner-bl { bottom: 15px; left: 15px; position: absolute; }
      .corner-br { bottom: 15px; right: 15px; position: absolute; }
      
      .corner-tl::before { top: 0; left: 0; width: 30px; height: 2px; }
      .corner-tl::after { top: 0; left: 0; width: 2px; height: 30px; }
      
      .corner-tr::before { top: 0; right: 0; width: 30px; height: 2px; }
      .corner-tr::after { top: 0; right: 0; width: 2px; height: 30px; }
      
      .corner-bl::before { bottom: 0; left: 0; width: 30px; height: 2px; }
      .corner-bl::after { bottom: 0; left: 0; width: 2px; height: 30px; }
      
      .corner-br::before { bottom: 0; right: 0; width: 30px; height: 2px; }
      .corner-br::after { bottom: 0; right: 0; width: 2px; height: 30px; }
      
      /* ============================================
         NAVIGATION - Art Deco Style
         ============================================ */
      nav {
        position: fixed;
        top: 25px;
        left: 25px;
        right: 25px;
        z-index: 1000;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(13, 13, 13, 0.95);
        border: 1px solid var(--gold);
      }
      
      .nav-logo {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .nav-logo img {
        height: 50px;
        width: auto;
      }
      
      .nav-links {
        display: flex;
        gap: 2.5rem;
      }
      
      .nav-links a {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.2em;
        color: var(--gold);
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.3s ease;
        position: relative;
        padding: 0.5rem 0;
      }
      
      .nav-links a::before {
        content: '◆';
        font-size: 0.4rem;
        margin-right: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .nav-links a:hover::before {
        opacity: 1;
      }
      
      .nav-links a::after {
        content: '◆';
        font-size: 0.4rem;
        margin-left: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .nav-links a:hover::after {
        opacity: 1;
      }
      
      /* ============================================
         HERO SECTION - Art Deco with Logo
         ============================================ */
      .hero {
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: var(--black-deep);
      }
      
      .hero-video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        opacity: 0.3;
        filter: sepia(20%);
      }
      
      /* Art Deco Sunburst Background */
      .hero-sunburst {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150%;
        height: 150%;
        background: 
          repeating-conic-gradient(
            from 0deg,
            transparent 0deg 8deg,
            rgba(201, 162, 39, 0.03) 8deg 10deg
          );
        pointer-events: none;
      }
      
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: 
          radial-gradient(ellipse at center, transparent 0%, var(--black-deep) 70%),
          linear-gradient(180deg, rgba(13, 13, 13, 0.5) 0%, rgba(13, 13, 13, 0.8) 50%, rgba(13, 13, 13, 1) 100%);
      }
      
      .hero-content {
        position: relative;
        z-index: 10;
        text-align: center;
        max-width: 900px;
        padding: 0 2rem;
      }
      
      /* Hero Title Text */
      .hero-subtitle-top {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.5em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 1.5rem;
      }
      
      .hero-title {
        margin-bottom: 2rem;
      }
      
      .hero-title-main {
        display: block;
        font-family: 'Playfair Display', serif;
        font-size: clamp(3.5rem, 10vw, 7rem);
        font-weight: 700;
        color: var(--white);
        letter-spacing: 0.05em;
        line-height: 1;
        text-transform: uppercase;
      }
      
      .hero-title-accent {
        display: block;
        font-family: 'Playfair Display', serif;
        font-size: clamp(4rem, 12vw, 8rem);
        font-weight: 700;
        color: var(--gold);
        letter-spacing: 0.1em;
        line-height: 1;
        text-transform: uppercase;
        text-shadow: 0 0 60px rgba(201, 162, 39, 0.4);
      }
      
      .hero-tagline {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: 0.5em;
        color: var(--gold);
        margin-bottom: 2rem;
        text-transform: uppercase;
      }
      
      .hero-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      .hero-divider-line {
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--gold), transparent);
      }
      
      .hero-divider-diamond {
        color: var(--gold);
        font-size: 0.6rem;
      }
      
      .hero-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .btn-gold {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        padding: 1rem 2.5rem;
        background: var(--gold);
        color: var(--black);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        position: relative;
      }
      
      .btn-gold::before {
        content: '';
        position: absolute;
        inset: 3px;
        border: 1px solid var(--black);
        pointer-events: none;
      }
      
      .btn-gold:hover {
        background: var(--gold-light);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(201, 162, 39, 0.4);
      }
      
      .btn-outline {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        padding: 1rem 2.5rem;
        background: transparent;
        color: var(--gold);
        border: 1px solid var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
      }
      
      .btn-outline:hover {
        background: rgba(201, 162, 39, 0.1);
      }
      
      .hero-scroll {
        position: absolute;
        bottom: 4rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--gold);
        animation: bounce 2s infinite;
      }
      
      .hero-scroll-text {
        font-size: 0.6rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(10px); }
      }
      
      /* ============================================
         SECTION HEADERS - Art Deco Style
         ============================================ */
      .section-header {
        text-align: center;
        margin-bottom: 4rem;
      }
      
      .section-deco {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .section-deco-line {
        width: 60px;
        height: 2px;
        background: var(--gold);
      }
      
      .section-deco-diamond {
        display: flex;
        gap: 0.3rem;
      }
      
      .section-deco-diamond span {
        width: 6px;
        height: 6px;
        background: var(--gold);
        transform: rotate(45deg);
      }
      
      .section-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.4em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 1rem;
      }
      
      .section-title {
        font-family: 'Playfair Display', serif;
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--white);
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      
      .section-subtitle {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        font-weight: 300;
        font-style: italic;
        letter-spacing: 0.1em;
        color: var(--gray);
        margin-bottom: 1.5rem;
      }
      
      .section-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
      
      .section-divider-line {
        width: 80px;
        height: 1px;
        background: var(--gold);
      }
      
      .section-divider-center {
        width: 10px;
        height: 10px;
        border: 1px solid var(--gold);
        transform: rotate(45deg);
      }
      
      /* ============================================
         FIFTH AVE TV - Channel Player Section
         ============================================ */
      .tv-section {
        padding: 6rem 4rem;
        background: var(--black);
        position: relative;
        overflow: hidden;
      }
      
      .tv-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--gold), transparent);
      }
      
      .tv-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      /* Channel Selector */
      .channel-selector {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      
      .channel-btn {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 0.75rem 1.5rem;
        background: transparent;
        color: var(--gray);
        border: 1px solid var(--charcoal);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .channel-btn:hover {
        color: var(--gold);
        border-color: var(--gold);
      }
      
      .channel-btn.active {
        background: var(--gold);
        color: var(--black-deep);
        border-color: var(--gold);
      }
      
      .channel-btn.active::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--gold);
      }
      
      /* TV Screen */
      .tv-screen {
        position: relative;
        background: var(--black-deep);
        border: 3px solid var(--gold);
        aspect-ratio: 16/9;
        overflow: hidden;
      }
      
      /* TV Frame decoration */
      .tv-screen::before {
        content: '';
        position: absolute;
        inset: 4px;
        border: 1px solid rgba(184, 134, 11, 0.3);
        pointer-events: none;
        z-index: 5;
      }
      
      .tv-screen iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
      
      /* Now Playing Info Bar */
      .tv-info-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        background: var(--black-deep);
        border: 1px solid var(--gold);
        border-top: none;
      }
      
      .tv-now-playing {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .tv-live-badge {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        background: var(--red-curtain);
        color: var(--white);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        padding: 0.4rem 0.75rem;
        text-transform: uppercase;
      }
      
      .tv-live-badge::before {
        content: '';
        width: 6px;
        height: 6px;
        background: var(--white);
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      .tv-video-title {
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        color: var(--white);
      }
      
      .tv-channel-name {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.65rem;
        color: var(--gold);
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
      
      .tv-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .tv-control-btn {
        width: 40px;
        height: 40px;
        background: transparent;
        border: 1px solid var(--gold);
        color: var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .tv-control-btn:hover {
        background: var(--gold);
        color: var(--black-deep);
      }
      
      /* Up Next Sidebar */
      .tv-up-next {
        margin-top: 1.5rem;
      }
      
      .tv-up-next-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(184, 134, 11, 0.3);
      }
      
      .tv-playlist {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }
      
      .tv-playlist-item {
        display: flex;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--black-deep);
        border: 1px solid var(--charcoal);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .tv-playlist-item:hover {
        border-color: var(--gold);
      }
      
      .tv-playlist-item.active {
        border-color: var(--gold);
        background: rgba(184, 134, 11, 0.1);
      }
      
      .tv-playlist-thumb {
        width: 80px;
        height: 45px;
        background: var(--charcoal);
        flex-shrink: 0;
        overflow: hidden;
      }
      
      .tv-playlist-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .tv-playlist-info {
        flex: 1;
        min-width: 0;
      }
      
      .tv-playlist-item-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--white);
        margin-bottom: 0.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .tv-playlist-item-duration {
        font-size: 0.6rem;
        color: var(--gray);
      }
      
      @media (max-width: 768px) {
        .tv-section {
          padding: 4rem 1.5rem;
        }
        
        .channel-selector {
          gap: 0.4rem;
        }
        
        .channel-btn {
          padding: 0.5rem 1rem;
          font-size: 0.55rem;
        }
        
        .tv-info-bar {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        
        .tv-playlist {
          grid-template-columns: 1fr;
        }
      }
      
      /* ============================================
         NOW SHOWING - Art Deco Cards
         ============================================ */
      .now-showing {
        padding: 8rem 4rem;
        background: var(--black-deep);
        position: relative;
      }
      
      /* Art Deco pattern background */
      .now-showing::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: 
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            rgba(201, 162, 39, 0.03) 100px,
            rgba(201, 162, 39, 0.03) 102px
          );
        pointer-events: none;
      }
      
      .movies-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1.5rem;
        max-width: 1500px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }
      
      @media (max-width: 1400px) {
        .movies-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
      }
      
      @media (max-width: 900px) {
        .movies-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
      }
      
      @media (max-width: 480px) {
        .movies-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
      }
      
      .movie-card {
        position: relative;
        background: var(--black);
        border: 1px solid var(--gold);
        transition: all 0.5s ease;
      }
      
      /* Art Deco corner accents */
      .movie-card::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        height: 30px;
        background: linear-gradient(135deg, var(--gold) 10px, transparent 10px),
                    linear-gradient(-135deg, var(--gold) 10px, transparent 10px);
        background-size: 50% 100%;
        background-position: left, right;
        background-repeat: no-repeat;
      }
      
      .movie-card::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: -1px;
        right: -1px;
        height: 30px;
        background: linear-gradient(45deg, var(--gold) 10px, transparent 10px),
                    linear-gradient(-45deg, var(--gold) 10px, transparent 10px);
        background-size: 50% 100%;
        background-position: left, right;
        background-repeat: no-repeat;
      }
      
      .movie-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(201, 162, 39, 0.2);
      }
      
      .movie-poster {
        position: relative;
        aspect-ratio: 2/3;
        overflow: hidden;
        margin: 15px 15px 0 15px;
        border: 1px solid rgba(201, 162, 39, 0.3);
      }
      
      .movie-poster img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .movie-card:hover .movie-poster img {
        transform: scale(1.05);
      }
      
      .movie-poster-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 50%, rgba(13, 13, 13, 0.95) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        padding: 1.5rem;
      }
      
      .movie-card:hover .movie-poster-overlay {
        opacity: 1;
      }
      
      .movie-info {
        padding: 1.5rem;
        text-align: center;
        background: var(--black);
      }
      
      .movie-genre {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.6rem;
        font-weight: 500;
        letter-spacing: 0.3em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      
      .movie-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--white);
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
      }
      
      .movie-meta {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
        font-size: 0.75rem;
        color: var(--gray);
      }
      
      .movie-rating {
        color: var(--gold);
      }
      
      .btn-book {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        padding: 0.875rem 1.5rem;
        background: transparent;
        color: var(--gold);
        border: 1px solid var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-book:hover {
        background: var(--gold);
        color: var(--black);
      }

      .btn-watch-inactive {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        padding: 0.875rem 1.5rem;
        background: rgba(119, 119, 119, 0.1);
        color: var(--gray);
        border: 1px solid var(--charcoal);
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      /* ============================================
         COMING SOON - Art Deco Theater Style
         ============================================ */
      .coming-soon {
        padding: 8rem 0;
        background: var(--black-deep);
        position: relative;
        overflow: hidden;
      }
      
      /* Art Deco vertical lines */
      .coming-soon::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50px;
        right: 50px;
        bottom: 0;
        background: 
          linear-gradient(90deg, 
            var(--gold) 1px, transparent 1px,
            transparent 49px, var(--gold) 49px, var(--gold) 50px, transparent 50px
          );
        background-size: 50px 100%;
        opacity: 0.05;
        pointer-events: none;
      }
      
      /* Decorative top border */
      .deco-border-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          var(--gold) 20%, 
          var(--gold) 80%, 
          transparent 100%
        );
      }
      
      .coming-soon .section-header {
        position: relative;
        z-index: 10;
        padding: 0 4rem;
      }
      
      .carousel-container {
        position: relative;
        z-index: 10;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 4rem;
      }
      
      .carousel-wrapper {
        overflow: hidden;
        position: relative;
      }
      
      .carousel {
        display: flex;
        gap: 1.5rem;
        padding: 2rem 0;
        transition: transform 0.5s ease;
      }
      
      /* Carousel Navigation Arrows */
      .carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
        border: 2px solid var(--gold-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 20;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(184, 134, 11, 0.3);
      }
      
      .carousel-nav:hover {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 6px 20px rgba(184, 134, 11, 0.5);
      }
      
      .carousel-nav i {
        color: var(--black-deep);
        font-size: 1.25rem;
      }
      
      .carousel-nav-left {
        left: 0;
      }
      
      .carousel-nav-right {
        right: 0;
      }
      
      /* Inner decorative circle on arrows */
      .carousel-nav::before {
        content: '';
        position: absolute;
        inset: 4px;
        border: 1px solid rgba(10, 10, 10, 0.3);
        border-radius: 50%;
        pointer-events: none;
      }
      
      .coming-card {
        flex-shrink: 0;
        width: 200px;
        position: relative;
      }
      
      .coming-poster {
        position: relative;
        aspect-ratio: 2/3;
        overflow: hidden;
        border: 2px solid var(--gold);
        background: var(--black);
      }
      
      .coming-poster img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .coming-card:hover .coming-poster img {
        transform: scale(1.1);
      }
      
      .coming-badge {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: var(--gold);
        color: var(--black);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.55rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        padding: 0.5rem;
        text-transform: uppercase;
        text-align: center;
      }
      
      .coming-info {
        padding: 1rem 0;
        text-align: center;
      }
      
      .coming-genre {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.55rem;
        letter-spacing: 0.2em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      
      .coming-title {
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        font-weight: 600;
        color: var(--white);
        margin-bottom: 0.5rem;
      }
      
      .coming-date {
        font-size: 0.7rem;
        color: var(--gray);
      }
      
      .btn-trailer {
        margin-top: 0.75rem;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.55rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
        background: transparent;
        color: var(--gold);
        border: 1px solid var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .btn-trailer:hover {
        background: var(--gold);
        color: var(--black);
      }
      
      /* ============================================
         NEWSLETTER
         ============================================ */
      .newsletter {
        padding: 6rem 4rem;
        background: var(--black-deep);
        text-align: center;
      }
      
      .newsletter-box {
        max-width: 700px;
        margin: 0 auto;
        padding: 4rem;
        border: 2px solid var(--gold);
        background: var(--black);
        position: relative;
      }
      
      /* Art Deco corners */
      .newsletter-box::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border: 1px solid rgba(201, 162, 39, 0.3);
        pointer-events: none;
      }
      
      .newsletter-icon {
        font-size: 2rem;
        color: var(--gold);
        margin-bottom: 1.5rem;
      }
      
      .newsletter-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        color: var(--white);
        text-transform: uppercase;
        margin-bottom: 1rem;
      }
      
      .newsletter-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        color: var(--gray);
        margin-bottom: 2rem;
      }
      
      .newsletter-form {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .newsletter-input {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8rem;
        padding: 1rem 1.5rem;
        width: 280px;
        background: var(--black-deep);
        border: 1px solid var(--gold);
        color: var(--white);
        outline: none;
        transition: all 0.3s ease;
      }
      
      .newsletter-input:focus {
        background: rgba(201, 162, 39, 0.05);
      }
      
      .newsletter-input::placeholder {
        color: var(--gray);
      }
      
      /* ============================================
         ABOUT SECTION
         ============================================ */
      .about-section {
        padding: 8rem 0;
        background: var(--black-deep);
        position: relative;
        overflow: hidden;
      }
      
      .about-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50px;
        right: 50px;
        bottom: 0;
        background: 
          linear-gradient(90deg, 
            var(--gold) 1px, transparent 1px,
            transparent 49px, var(--gold) 49px, var(--gold) 50px, transparent 50px
          );
        background-size: 50px 100%;
        opacity: 0.03;
        pointer-events: none;
      }
      
      .about-hero {
        text-align: center;
        margin-bottom: 4rem;
        padding: 0 4rem;
      }
      
      .about-headline {
        font-family: 'Cinzel Decorative', serif;
        font-size: clamp(1.8rem, 4vw, 3rem);
        font-weight: 400;
        letter-spacing: 0.05em;
        color: var(--gold);
        text-transform: uppercase;
      }
      
      .about-content {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 4rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
      
      .about-card {
        background: linear-gradient(135deg, rgba(184, 134, 11, 0.05) 0%, rgba(45, 45, 45, 0.5) 100%);
        border: 1px solid var(--gold);
        position: relative;
        overflow: hidden;
      }
      
      .about-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          var(--gold) 20%, 
          var(--gold) 80%, 
          transparent 100%
        );
      }
      
      .about-card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid rgba(184, 134, 11, 0.3);
        background: rgba(184, 134, 11, 0.05);
      }
      
      .about-icon {
        font-size: 1.5rem;
        color: var(--gold);
      }
      
      .about-card-title {
        font-family: 'Cinzel Decorative', serif;
        font-size: 1.25rem;
        font-weight: 400;
        color: var(--gold);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin: 0;
      }
      
      .about-card-body {
        padding: 2rem;
      }
      
      .about-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        line-height: 1.8;
        color: var(--gray);
        margin-bottom: 1.25rem;
      }
      
      .about-text:last-child {
        margin-bottom: 0;
      }
      
      .about-text strong {
        color: var(--gold-light);
        font-weight: 600;
      }
      
      /* Mission Card Styling */
      .about-mission-card {
        background: linear-gradient(135deg, rgba(184, 134, 11, 0.08) 0%, rgba(45, 45, 45, 0.6) 100%);
      }
      
      .mission-brands {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      
      .mission-brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .mission-brand-name {
        font-family: 'Cinzel Decorative', serif;
        font-size: 1.1rem;
        color: var(--gold);
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
      }
      
      .mission-brand-desc {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.75rem;
        color: var(--gray);
        text-transform: uppercase;
        letter-spacing: 0.15em;
      }
      
      .mission-divider {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .mission-line {
        width: 30px;
        height: 1px;
        background: var(--gold);
      }
      
      .mission-plus {
        color: var(--gold);
        font-size: 0.8rem;
      }
      
      .mission-text {
        text-align: center;
        font-size: 1rem;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(184, 134, 11, 0.2);
      }
      
      /* Connect Section */
      .about-connect {
        text-align: center;
        padding: 3rem 2rem;
        background: linear-gradient(135deg, rgba(184, 134, 11, 0.05) 0%, rgba(45, 45, 45, 0.3) 100%);
        border: 1px solid var(--gold);
        position: relative;
      }
      
      .about-connect::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          var(--gold) 20%, 
          var(--gold) 80%, 
          transparent 100%
        );
      }
      
      .connect-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      .connect-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
      }
      
      .connect-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        background: transparent;
        border: 1px solid var(--gold);
        color: var(--gold);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .connect-btn:hover {
        background: var(--gold);
        color: var(--black-deep);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(184, 134, 11, 0.3);
      }
      
      .connect-btn i {
        font-size: 1.1rem;
      }
      
      .connect-btn-primary {
        background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
        color: var(--black-deep);
        border-color: var(--gold);
      }
      
      .connect-btn-primary:hover {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
        box-shadow: 0 6px 20px rgba(184, 134, 11, 0.4);
      }
      
      @media (max-width: 768px) {
        .about-content {
          padding: 0 1.5rem;
        }
        
        .about-hero {
          padding: 0 1.5rem;
        }
        
        .about-card-header,
        .about-card-body {
          padding: 1.25rem;
        }
        
        .mission-brands {
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .mission-divider {
          transform: rotate(90deg);
        }
        
        .connect-links {
          flex-direction: column;
          align-items: center;
        }
      }
      
      /* ============================================
         FOOTER
         ============================================ */
      footer {
        padding: 4rem;
        background: var(--black);
        border-top: 2px solid var(--gold);
      }
      
      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 3rem;
      }
      
      .footer-brand {
        display: flex;
        flex-direction: column;
      }
      
      .footer-logo {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .footer-logo img {
        height: 60px;
        width: auto;
      }
      
      .footer-tagline {
        font-family: 'Playfair Display', serif;
        font-size: 0.9rem;
        font-style: italic;
        color: var(--gray);
        margin-bottom: 1.5rem;
      }
      
      .social-links {
        display: flex;
        gap: 0.75rem;
      }
      
      .social-link {
        width: 36px;
        height: 36px;
        border: 1px solid var(--gold);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gold);
        transition: all 0.3s ease;
        text-decoration: none;
      }
      
      .social-link:hover {
        background: var(--gold);
        color: var(--black);
      }
      
      .footer-column h4 {
        font-family: 'Playfair Display', serif;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        color: var(--gold);
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(201, 162, 39, 0.3);
      }
      
      .footer-column ul {
        list-style: none;
      }
      
      .footer-column li {
        margin-bottom: 0.6rem;
      }
      
      .footer-column a {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.75rem;
        color: var(--gray);
        text-decoration: none;
        transition: color 0.3s ease;
        letter-spacing: 0.05em;
      }
      
      .footer-column a:hover {
        color: var(--gold);
      }
      
      .footer-bottom {
        max-width: 1200px;
        margin: 3rem auto 0;
        padding-top: 2rem;
        border-top: 1px solid rgba(201, 162, 39, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .copyright {
        font-size: 0.7rem;
        color: var(--gray);
        letter-spacing: 0.1em;
      }
      
      .awards {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gray);
        font-size: 0.7rem;
      }
      
      .awards i {
        color: var(--gold);
      }
      
      /* ============================================
         ANIMATIONS
         ============================================ */
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* ============================================
         RESPONSIVE
         ============================================ */
      @media (max-width: 1024px) {
        nav { padding: 1rem; left: 15px; right: 15px; top: 15px; }
        .nav-links { display: none; }
        .now-showing, .newsletter { padding: 5rem 2rem; }
        .footer-content { grid-template-columns: 1fr 1fr; }

        .page-frame { inset: 10px; }
      }
      
      @media (max-width: 768px) {
        .carousel-container { padding: 0 2rem; }
        .footer-content { grid-template-columns: 1fr; text-align: center; }
        .footer-brand { align-items: center; }
        .social-links { justify-content: center; }
        .footer-bottom { flex-direction: column; gap: 1rem; }

        /* Hero responsive handled by clamp() */
        .page-frame { display: none; }
        .corner-decor { display: none; }
      }
      
      /* Mobile Menu */
      .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--gold);
        font-size: 1.25rem;
        cursor: pointer;
      }
      
      @media (max-width: 1024px) {
        .mobile-menu-btn { display: block; }
      }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-logo">
            <img src="/static/logo.png" alt="Fifth Ave Film Logo">
        </div>
        
        <div class="nav-links">
            <a href="#portfolio">Portfolio</a>
            <a href="#films">Films</a>
            <a href="#about">About</a>
        </div>
        
        <button class="mobile-menu-btn">
            <i class="fas fa-bars"></i>
        </button>
    </nav>
    
    <!-- Hero Section -->
    <section class="hero">
        <!-- Art Deco Page Frame - contained within hero section only -->
        <div class="page-frame"></div>
        <div class="corner-decor corner-tl"></div>
        <div class="corner-decor corner-tr"></div>
        <div class="corner-decor corner-bl"></div>
        <div class="corner-decor corner-br"></div>
        
        <video autoplay muted loop playsinline class="hero-video" poster="https://www.genspark.ai/api/files/s/mK00w3JE?cache_control=3600">
            <source src="/static/hero-background.mp4" type="video/mp4">
        </video>
        
        <div class="hero-sunburst"></div>
        <div class="hero-overlay"></div>
        
        <div class="hero-content">
            <p class="hero-subtitle-top">Where Elegance Meets Cinematic Excellence</p>
            
            <h1 class="hero-title">
                <span class="hero-title-main">Fifth Ave</span>
                <span class="hero-title-accent">Film</span>
            </h1>
            
            <div class="hero-divider">
                <span class="hero-divider-line"></span>
                <span class="hero-divider-diamond">◆</span>
                <span class="hero-divider-line"></span>
            </div>
            
            <p class="hero-tagline">Experience Cinema Like Never Before</p>
            
            <div class="hero-buttons">
                <a href="#portfolio" class="btn-gold">Watch Portfolio</a>
                <a href="#films" class="btn-outline">Browse Films</a>
            </div>
        </div>
        
        <div class="hero-scroll">
            <span class="hero-scroll-text">Scroll</span>
            <i class="fas fa-chevron-down"></i>
        </div>
    </section>
    
    <!-- Fifth Ave TV Section - Main Portfolio Player -->
    <section id="portfolio" class="tv-section">
        <div class="section-header fade-in">
            <div class="section-deco">
                <span class="section-deco-line"></span>
                <div class="section-deco-diamond">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="section-deco-line"></span>
            </div>
            <p class="section-label">Behind the Scenes</p>
            <h2 class="section-title">RAW STUDIO FOOTAGE</h2>
            <p class="section-subtitle">Unfiltered clips of upcoming projects</p>
            <div class="section-divider">
                <span class="section-divider-line"></span>
                <span class="section-divider-center"></span>
                <span class="section-divider-line"></span>
            </div>
        </div>
        
        <div class="tv-container fade-in">
            <!-- Channel Selector -->
            <div class="channel-selector">
                <button class="channel-btn active" data-channel="allclips">All Clips</button>
                <button class="channel-btn" data-channel="fashion">Fashion</button>
                <button class="channel-btn" data-channel="action">Action</button>
                <button class="channel-btn" data-channel="scifi">Sci-Fi</button>
            </div>
            
            <!-- TV Screen -->
            <div class="tv-screen">
                <iframe 
                    id="tv-player"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0&modestbranding=1&enablejsapi=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            
            <!-- Info Bar -->
            <div class="tv-info-bar">
                <div class="tv-now-playing">
                    <span class="tv-live-badge">On Air</span>
                    <div>
                        <p class="tv-video-title" id="current-video-title">Sample Video Title</p>
                        <p class="tv-channel-name" id="current-channel-name">Fantasy Channel</p>
                    </div>
                </div>
                <div class="tv-controls">
                    <button class="tv-control-btn" id="tv-prev" title="Previous">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button class="tv-control-btn" id="tv-next" title="Next">
                        <i class="fas fa-step-forward"></i>
                    </button>
                </div>
            </div>
            
            <!-- Up Next Playlist -->
            <div class="tv-up-next">
                <h4 class="tv-up-next-title">Up Next</h4>
                <div class="tv-playlist" id="tv-playlist">
                    <!-- Playlist items injected by JS -->
                </div>
            </div>
        </div>
    </section>
    
    <!-- Now Showing Section -->
    <section id="films" class="now-showing">
        <div class="section-header fade-in">
            <div class="section-deco">
                <span class="section-deco-line"></span>
                <div class="section-deco-diamond">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="section-deco-line"></span>
            </div>
            <p class="section-label">Featured Selection</p>
            <h2 class="section-title">Now Showing</h2>
            <div class="section-divider">
                <span class="section-divider-line"></span>
                <span class="section-divider-center"></span>
                <span class="section-divider-line"></span>
            </div>
        </div>
        
        <div class="movies-grid fade-in" id="now-showing-grid">
            <!-- Movies injected by JS -->
        </div>
    </section>
    
    <!-- Coming Soon Section -->
    <section id="experiences" class="coming-soon">
        <div class="deco-border-top"></div>
        
        <div class="section-header fade-in">
            <div class="section-deco">
                <span class="section-deco-line"></span>
                <div class="section-deco-diamond">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="section-deco-line"></span>
            </div>
            <p class="section-label">Upcoming Releases</p>
            <h2 class="section-title">Coming Soon</h2>
            <div class="section-divider">
                <span class="section-divider-line"></span>
                <span class="section-divider-center"></span>
                <span class="section-divider-line"></span>
            </div>
        </div>
        
        <div class="carousel-container">
            <button class="carousel-nav carousel-nav-left" id="carousel-prev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-wrapper">
                <div class="carousel" id="coming-soon-carousel">
                    <!-- Coming soon cards injected by JS -->
                </div>
            </div>
            <button class="carousel-nav carousel-nav-right" id="carousel-next">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="about-section">
        <div class="deco-border-top"></div>
        
        <!-- Section 1: Headline -->
        <div class="about-hero">
            <div class="section-header fade-in">
                <div class="section-deco">
                    <span class="section-deco-line"></span>
                    <div class="section-deco-diamond">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span class="section-deco-line"></span>
                </div>
                <h2 class="section-title about-headline">The Vision Behind Fifth Ave Film</h2>
                <div class="section-divider">
                    <span class="section-divider-line"></span>
                    <span class="section-divider-center"></span>
                    <span class="section-divider-line"></span>
                </div>
            </div>
        </div>
        
        <!-- Section 2: Meet the Creator -->
        <div class="about-content">
            <div class="about-card fade-in">
                <div class="about-card-header">
                    <i class="fas fa-user-tie about-icon"></i>
                    <h3 class="about-card-title">Meet the Creator</h3>
                </div>
                <div class="about-card-body">
                    <p class="about-text"><strong>Sha Shane Caraballo</strong> is an AI consultant, creative director, and digital strategist based in Seattle, Washington. With over a decade of experience in digital marketing, content creation, and brand building, Shane has been at the forefront of AI-powered content since the technology emerged.</p>
                    <p class="about-text">After building a following of 30,000+ at <strong>@thefifthaveai</strong> — showcasing what's possible when artificial intelligence meets creative vision — Shane founded Fifth Ave Film to push AI storytelling into its next chapter: cinema.</p>
                    <p class="about-text">Trained in AI filmmaking through <strong>Curious Refuge</strong>, Shane brings together expertise in AI image generation, video production, prompt engineering, and visual storytelling to create a new kind of film experience. Every frame, every character, every scene on this site was crafted using cutting-edge AI tools including MidJourney, Kling, HeyGen, Runway, and ElevenLabs.</p>
                </div>
            </div>
            
            <!-- Section 3: What is Fifth Ave Film? -->
            <div class="about-card fade-in">
                <div class="about-card-header">
                    <i class="fas fa-film about-icon"></i>
                    <h3 class="about-card-title">What is Fifth Ave Film?</h3>
                </div>
                <div class="about-card-body">
                    <p class="about-text"><strong>Fifth Ave Film</strong> is an AI cinema studio dedicated to producing original films, trailers, and visual content created entirely with artificial intelligence. This isn't traditional filmmaking with AI added on top — this is storytelling built from the ground up using AI as the primary creative engine.</p>
                    <p class="about-text">What you see here is the beginning. The raw footage, the showcase reels, the film posters — these are all early stages of projects being developed into full-length AI films.</p>
                    <p class="about-text">Fifth Ave Film exists to prove that compelling, cinematic storytelling doesn't require a Hollywood budget. It requires <strong>vision, skill, and the right tools.</strong></p>
                </div>
            </div>
            
            <!-- Section 4: Two Brands, One Mission -->
            <div class="about-card about-mission-card fade-in">
                <div class="about-card-header">
                    <i class="fas fa-handshake about-icon"></i>
                    <h3 class="about-card-title">Two Brands, One Mission</h3>
                </div>
                <div class="about-card-body">
                    <div class="mission-brands">
                        <div class="mission-brand">
                            <span class="mission-brand-name">Fifth Ave Film</span>
                            <span class="mission-brand-desc">The creative studio</span>
                        </div>
                        <div class="mission-divider">
                            <span class="mission-line"></span>
                            <i class="fas fa-plus mission-plus"></i>
                            <span class="mission-line"></span>
                        </div>
                        <div class="mission-brand">
                            <span class="mission-brand-name">FifthAveAI.com</span>
                            <span class="mission-brand-desc">The consulting practice</span>
                        </div>
                    </div>
                    <p class="about-text mission-text">Together they represent two sides of the same mission: <strong>demonstrating what AI can do when it's in the right hands.</strong></p>
                    <p class="about-text">Through <strong>FifthAveAI.com</strong>, Shane helps businesses implement AI solutions, automate workflows, and build content systems that scale. Through <strong>Fifth Ave Film</strong>, he puts that same expertise on screen — creating original content that showcases the full creative potential of artificial intelligence.</p>
                </div>
            </div>
            
            <!-- Section 5: Connect -->
            <div class="about-connect fade-in">
                <div class="connect-header">
                    <i class="fas fa-link about-icon"></i>
                    <h3 class="about-card-title">Connect</h3>
                </div>
                <div class="connect-links">
                    <a href="https://instagram.com/thefifthaveai" target="_blank" rel="noopener" class="connect-btn">
                        <i class="fab fa-instagram"></i>
                        <span>@thefifthaveai</span>
                    </a>
                    <a href="https://linkedin.com/in/shane-caraballo-sm" target="_blank" rel="noopener" class="connect-btn">
                        <i class="fab fa-linkedin-in"></i>
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://fifthaveai.com" target="_blank" rel="noopener" class="connect-btn connect-btn-primary">
                        <i class="fas fa-globe"></i>
                        <span>FifthAveAI.com</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="newsletter">
        <div class="newsletter-box fade-in">
            <i class="fas fa-ticket-alt newsletter-icon"></i>
            <h2 class="newsletter-title">Join The Premiere</h2>
            <p class="newsletter-text">Be the first to know about exclusive screenings, premieres, and special releases.</p>
            
            <form class="newsletter-form" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="c24f829f-9c1f-4f19-8925-31e56d3f03da">
                <input type="email" name="email" placeholder="Enter your email" class="newsletter-input" required>
                <button type="submit" class="btn-gold">Subscribe</button>
            </form>
        </div>
    </section>
    
    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="/static/logo.png" alt="Fifth Ave Film">
                </div>
                <p class="footer-tagline">Where elegance meets cinematic excellence.</p>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
            
            <div class="footer-column">
                <h4>Films</h4>
                <ul>
                    <li><a href="#">Now Showing</a></li>
                    <li><a href="#">Coming Soon</a></li>
                    <li><a href="#">Classics</a></li>
                    <li><a href="#">Premieres</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <h4>Company</h4>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Press</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p class="copyright">© 2026 Fifth Ave Film. All rights reserved.</p>
            <div class="awards">
                <i class="fas fa-award"></i>
                <span>Award-Winning Cinema Experience</span>
            </div>
        </div>
    </footer>
    
    <script>
        // Intersection Observer for Animations
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => observer.observe(el));
        
        // Load Movies from API
        async function loadMovies() {
            try {
                const response = await fetch('/api/movies');
                const data = await response.json();
                
                // Render Now Showing
                const nowShowingGrid = document.getElementById('now-showing-grid');
                nowShowingGrid.innerHTML = data.nowShowing.map(movie =>
                    '<div class="movie-card">' +
                        '<div class="movie-poster">' +
                            '<img src="' + movie.image + '" alt="' + movie.title + '">' +
                            '<div class="movie-poster-overlay">' +
                                '<button class="btn-watch-inactive" disabled>Watch</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="movie-info">' +
                            '<p class="movie-genre">' + movie.genre + '</p>' +
                            '<h3 class="movie-title">' + movie.title + '</h3>' +
                            '<div class="movie-meta">' +
                                '<span class="movie-rating"><i class="fas fa-star"></i> ' + movie.rating + '</span>' +
                                '<span><i class="far fa-clock"></i> ' + movie.duration + '</span>' +
                            '</div>' +
                            '<button class="btn-watch-inactive" disabled>Watch</button>' +
                        '</div>' +
                    '</div>'
                ).join('');
                
                // Render Coming Soon Carousel
                const comingSoonCarousel = document.getElementById('coming-soon-carousel');
                const cardHTML = data.comingSoon.map(movie => 
                    '<div class="coming-card">' +
                        '<div class="coming-poster">' +
                            '<img src="' + movie.image + '" alt="' + movie.title + '">' +
                            '<span class="coming-badge">Coming Soon</span>' +
                        '</div>' +
                        '<div class="coming-info">' +
                            '<p class="coming-genre">' + movie.genre + '</p>' +
                            '<h3 class="coming-title">' + movie.title + '</h3>' +
                            '<p class="coming-date"><i class="far fa-calendar"></i> ' + movie.releaseDate + '</p>' +
                            '<button class="btn-trailer">Watch Trailer</button>' +
                        '</div>' +
                    '</div>'
                ).join('');
                comingSoonCarousel.innerHTML = cardHTML;
                
            } catch (error) {
                console.error('Error loading movies:', error);
            }
        }
        
        loadMovies();
        
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Navbar background on scroll
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
        
        // Carousel Navigation
        let carouselPosition = 0;
        const cardWidth = 215;
        
        document.getElementById('carousel-next').addEventListener('click', function() {
            const carousel = document.getElementById('coming-soon-carousel');
            const maxScroll = carousel.scrollWidth - carousel.parentElement.offsetWidth;
            carouselPosition = Math.min(carouselPosition + cardWidth * 2, maxScroll);
            carousel.style.transform = 'translateX(-' + carouselPosition + 'px)';
        });
        
        document.getElementById('carousel-prev').addEventListener('click', function() {
            const carousel = document.getElementById('coming-soon-carousel');
            carouselPosition = Math.max(carouselPosition - cardWidth * 2, 0);
            carousel.style.transform = 'translateX(-' + carouselPosition + 'px)';
        });

        // =============================================
        // NEWSLETTER FORM - Web3Forms Integration
        // =============================================
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for subscribing! You will receive exclusive updates and premiere invitations.</p></div>';
                    document.querySelector('.success-message').style.cssText = 'color: var(--gold); font-family: "Montserrat", sans-serif; padding: 1.5rem; text-align: center;';
                    document.querySelector('.success-message i').style.cssText = 'font-size: 3rem; margin-bottom: 1rem; display: block;';
                    document.querySelector('.success-message p').style.cssText = 'font-size: 1rem; line-height: 1.6;';
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                alert('Something went wrong. Please try again.');
            }
        });

        // =============================================
        // FIFTH AVE TV - Channel Player System
        // =============================================
        
        const channels = {
            allclips: {
                name: 'All Clips',
                videos: [
                    { id: 'cFTA0x0RfwA', title: 'Golden Queens - Beach', duration: '0:10' },
                    { id: 'Fn67sguPN8k', title: 'Warrior King', duration: '0:10' },
                    { id: 'koz7dts3XeQ', title: 'Retro Glamour', duration: '0:08' },
                    { id: 'rquxzmhqB5Q', title: 'Cyborg Soldier', duration: '0:06' },
                    { id: '82mMGMvRt0I', title: 'Afrofuturistic Queens', duration: '0:08' },
                    { id: 'n7aipQIfZV4', title: 'Mech Warrior', duration: '0:06' },
                    { id: 'ZRIbWe-fSFQ', title: 'Desert Glamour', duration: '0:08' },
                    { id: 'xQKIIOfAXp4', title: 'Cyborg Rising', duration: '0:06' },
                    { id: 'AIrcV0MDtbA', title: 'Flamethrower', duration: '0:06' },
                    { id: 'xgCWo4ioKzI', title: 'Cyborg Awakens', duration: '0:13' }
                ]
            },
            fashion: {
                name: 'Fashion',
                videos: [
                    { id: 'cFTA0x0RfwA', title: 'Golden Queens - Beach', duration: '0:10' },
                    { id: 'koz7dts3XeQ', title: 'Retro Glamour', duration: '0:08' },
                    { id: '82mMGMvRt0I', title: 'Afrofuturistic Queens', duration: '0:08' },
                    { id: 'ZRIbWe-fSFQ', title: 'Desert Glamour', duration: '0:08' }
                ]
            },
            action: {
                name: 'Action',
                videos: [
                    { id: 'Fn67sguPN8k', title: 'Warrior King', duration: '0:10' },
                    { id: 'rquxzmhqB5Q', title: 'Cyborg Soldier', duration: '0:06' },
                    { id: 'n7aipQIfZV4', title: 'Mech Warrior', duration: '0:06' },
                    { id: 'xQKIIOfAXp4', title: 'Cyborg Rising', duration: '0:06' },
                    { id: 'AIrcV0MDtbA', title: 'Flamethrower', duration: '0:06' },
                    { id: 'xgCWo4ioKzI', title: 'Cyborg Awakens', duration: '0:13' }
                ]
            },
            scifi: {
                name: 'Sci-Fi',
                videos: [
                    { id: 'rquxzmhqB5Q', title: 'Cyborg Soldier', duration: '0:06' },
                    { id: 'n7aipQIfZV4', title: 'Mech Warrior', duration: '0:06' },
                    { id: 'xQKIIOfAXp4', title: 'Cyborg Rising', duration: '0:06' },
                    { id: 'xgCWo4ioKzI', title: 'Cyborg Awakens', duration: '0:13' }
                ]
            }
        };
        
        let currentChannel = 'allclips';
        let currentVideoIndex = 0;
        
        // Initialize TV Player
        function initTV() {
            loadChannel(currentChannel);
            setupChannelButtons();
            setupControlButtons();
        }
        
        // Load channel content
        function loadChannel(channelKey) {
            currentChannel = channelKey;
            currentVideoIndex = 0;
            const channel = channels[channelKey];
            
            // Update channel name display
            document.getElementById('current-channel-name').textContent = channel.name;
            
            // Play first video
            playVideo(currentVideoIndex);
            
            // Update playlist
            renderPlaylist();
            
            // Update active button
            document.querySelectorAll('.channel-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.channel === channelKey) {
                    btn.classList.add('active');
                }
            });
        }
        
        // Play specific video
        function playVideo(index) {
            const channel = channels[currentChannel];
            if (index >= channel.videos.length) index = 0;
            if (index < 0) index = channel.videos.length - 1;
            
            currentVideoIndex = index;
            const video = channel.videos[index];
            
            // Update video player
            const player = document.getElementById('tv-player');
            player.src = 'https://www.youtube.com/embed/' + video.id + '?autoplay=1&controls=1&rel=0&modestbranding=1&enablejsapi=1';
            
            // Update video title
            document.getElementById('current-video-title').textContent = video.title;
            
            // Update playlist active state
            updatePlaylistActive();
        }
        
        // Render playlist
        function renderPlaylist() {
            const channel = channels[currentChannel];
            const playlist = document.getElementById('tv-playlist');
            
            playlist.innerHTML = channel.videos.map((video, index) => 
                '<div class="tv-playlist-item' + (index === currentVideoIndex ? ' active' : '') + '" data-index="' + index + '">' +
                    '<div class="tv-playlist-thumb">' +
                        '<img src="https://img.youtube.com/vi/' + video.id + '/mqdefault.jpg" alt="' + video.title + '">' +
                    '</div>' +
                    '<div class="tv-playlist-info">' +
                        '<p class="tv-playlist-item-title">' + video.title + '</p>' +
                        '<p class="tv-playlist-item-duration"><i class="far fa-clock"></i> ' + video.duration + '</p>' +
                    '</div>' +
                '</div>'
            ).join('');
            
            // Add click handlers for playlist items
            document.querySelectorAll('.tv-playlist-item').forEach(item => {
                item.addEventListener('click', function() {
                    playVideo(parseInt(this.dataset.index));
                });
            });
        }
        
        // Update playlist active state
        function updatePlaylistActive() {
            document.querySelectorAll('.tv-playlist-item').forEach((item, index) => {
                item.classList.toggle('active', index === currentVideoIndex);
            });
        }
        
        // Setup channel buttons
        function setupChannelButtons() {
            document.querySelectorAll('.channel-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    loadChannel(this.dataset.channel);
                });
            });
        }
        
        // Setup control buttons
        function setupControlButtons() {
            document.getElementById('tv-prev').addEventListener('click', function() {
                playVideo(currentVideoIndex - 1);
            });
            
            document.getElementById('tv-next').addEventListener('click', function() {
                playVideo(currentVideoIndex + 1);
            });
        }
        
        // Initialize TV on page load
        initTV();
    </script>
</body>
</html>
  `)
})

export default app

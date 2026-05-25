import { useEffect, useRef, useState } from 'react';

const brandText = 'HackPro Academy';
const welcomeText = "HackPro Academy o'quv markaziga xush kelibsiz";
let introShownThisPageLoad = false;

function getInitialVisibility() {
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  return isHomePage && !introShownThisPageLoad;
}

const letterMotion = [
  [-520, -190, -620, -34, 54],
  [-420, 170, -560, 38, -42],
  [-320, -230, -650, -52, 28],
  [-220, 110, -520, 30, -58],
  [-110, -170, -600, -26, 46],
  [0, 210, -540, 44, -22],
  [120, -210, -610, -40, 36],
  [230, 160, -500, 34, -46],
  [340, -130, -640, -32, 52],
  [460, 210, -570, 44, -34],
  [-470, 20, -690, -18, -62],
  [-240, -20, -590, 54, 24],
  [250, 30, -660, -48, -26],
  [500, -10, -540, 20, 64],
];

const scatterMotion = [
  [-640, -260, 360, -70, 55, -28],
  [-520, 320, 280, 64, -58, 34],
  [-420, -380, 420, -76, -30, 46],
  [-280, 270, 330, 58, 70, -22],
  [-140, -310, 500, -48, 62, 38],
  [40, 360, 310, 72, -42, -44],
  [180, -340, 450, -66, 54, 26],
  [320, 300, 380, 48, -74, -34],
  [500, -260, 520, -54, 42, 50],
  [660, 210, 340, 62, -50, -30],
  [-610, 90, 440, 34, 82, -46],
  [-310, -80, 360, -72, -38, 32],
  [300, 70, 480, 66, 36, -58],
  [610, -90, 410, -40, -78, 42],
];

function createTone(context, output, settings) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  const panner = context.createStereoPanner?.();
  const start = context.currentTime + settings.delay;
  const end = start + settings.duration;

  oscillator.type = settings.type;
  oscillator.frequency.setValueAtTime(settings.from, start);
  oscillator.frequency.exponentialRampToValueAtTime(settings.to, end);

  filter.type = settings.filterType ?? 'lowpass';
  filter.frequency.setValueAtTime(settings.filterFrom ?? 1800, start);
  filter.frequency.exponentialRampToValueAtTime(settings.filterTo ?? 5200, end);
  filter.Q.setValueAtTime(settings.q ?? 1.2, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(settings.peak, start + settings.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(filter);
  filter.connect(gain);

  if (panner) {
    panner.pan.setValueAtTime(settings.pan ?? 0, start);
    gain.connect(panner);
    panner.connect(output);
  } else {
    gain.connect(output);
  }

  oscillator.start(start);
  oscillator.stop(end + 0.08);
}

async function startIntroAudio() {
  const cleanupTasks = [];
  let effectStarted = false;

  const AudioContext = window.AudioContext ?? window.webkitAudioContext;

  if (AudioContext) {
    const context = new AudioContext();
    const master = context.createGain();
    const compressor = context.createDynamicsCompressor();
    const now = context.currentTime;

    try {
      await context.resume();

      if (context.state === 'running') {
        effectStarted = true;

        compressor.threshold.setValueAtTime(-22, now);
        compressor.knee.setValueAtTime(18, now);
        compressor.ratio.setValueAtTime(7, now);
        compressor.attack.setValueAtTime(0.012, now);
        compressor.release.setValueAtTime(0.28, now);

        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.2, now + 0.42);
        master.gain.setValueAtTime(0.2, now + 5.65);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 7.25);
        master.connect(compressor);
        compressor.connect(context.destination);

        createTone(context, master, {
          delay: 0,
          duration: 3.9,
          type: 'sawtooth',
          from: 88,
          to: 42,
          peak: 0.11,
          attack: 0.2,
          filterFrom: 420,
          filterTo: 1700,
          q: 1.9,
          pan: -0.18,
        });
        createTone(context, master, {
          delay: 0.22,
          duration: 4.5,
          type: 'triangle',
          from: 196,
          to: 392,
          peak: 0.075,
          attack: 0.32,
          filterFrom: 900,
          filterTo: 4800,
          pan: 0.22,
        });
        createTone(context, master, {
          delay: 1.55,
          duration: 2.15,
          type: 'sine',
          from: 523.25,
          to: 1046.5,
          peak: 0.052,
          attack: 0.05,
          filterFrom: 1800,
          filterTo: 7800,
          pan: -0.4,
        });
        createTone(context, master, {
          delay: 2.18,
          duration: 1.85,
          type: 'sine',
          from: 659.25,
          to: 1318.51,
          peak: 0.048,
          attack: 0.05,
          filterFrom: 2000,
          filterTo: 8400,
          pan: 0.42,
        });
        createTone(context, master, {
          delay: 5.25,
          duration: 1.2,
          type: 'square',
          from: 76,
          to: 34,
          peak: 0.15,
          attack: 0.025,
          filterFrom: 520,
          filterTo: 1500,
          q: 2.6,
          pan: 0,
        });
        createTone(context, master, {
          delay: 5.58,
          duration: 1.65,
          type: 'triangle',
          from: 987.77,
          to: 246.94,
          peak: 0.065,
          attack: 0.035,
          filterFrom: 5600,
          filterTo: 900,
          pan: 0.16,
        });
      }
    } catch {
      // The fallback button will request audio from a user gesture.
    }

    const closeTimer = window.setTimeout(() => {
      if (context.state !== 'closed') {
        context.close();
      }
    }, 8200);

    cleanupTasks.push(() => {
      window.clearTimeout(closeTimer);
      if (context.state !== 'closed') {
        context.close();
      }
    });
  }

  return {
    cleanup: () => cleanupTasks.forEach((cleanup) => cleanup()),
    needsTap: !effectStarted && Boolean(AudioContext),
  };
}

export default function IntroReveal() {
  const [isVisible, setIsVisible] = useState(getInitialVisibility);
  const [needsSoundTap, setNeedsSoundTap] = useState(false);
  const audioCleanupRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    introShownThisPageLoad = true;

    document.body.classList.add('intro-active');

    let isCleanedUp = false;

    startIntroAudio()
      .then(({ cleanup, needsTap }) => {
        if (isCleanedUp) {
          cleanup();
          return;
        }

        audioCleanupRef.current = cleanup;
        setNeedsSoundTap(needsTap);
      })
      .catch(() => {
        if (!isCleanedUp) {
          setNeedsSoundTap(true);
        }
      });

    const timer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('intro-active');
    }, 7600);

    return () => {
      isCleanedUp = true;
      window.clearTimeout(timer);
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
      document.body.classList.remove('intro-active');
    };
  }, [isVisible]);

  const handleSoundTap = async () => {
    setNeedsSoundTap(false);
    audioCleanupRef.current?.();

    try {
      const { cleanup, needsTap } = await startIntroAudio();
      audioCleanupRef.current = cleanup;
      setNeedsSoundTap(needsTap);
    } catch {
      setNeedsSoundTap(true);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="intro-reveal" role="img" aria-label={welcomeText}>
      <div className="intro-depth-grid" />
      <div className="intro-aurora">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} style={{ '--aurora-index': index }} />
        ))}
      </div>
      <div className="intro-light-beams">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} style={{ '--beam-index': index }} />
        ))}
      </div>
      <div className="intro-core">
        <div className="intro-portal intro-portal-outer" />
        <div className="intro-portal intro-portal-middle" />
        <div className="intro-portal intro-portal-inner" />
        <div className="intro-halo" />
        <div className="intro-sonic-rings" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index} style={{ '--ring-index': index }} />
          ))}
        </div>
        <div className="intro-name" aria-hidden="true">
          {Array.from(brandText).map((letter, index) => {
            const [x, y, z, rotateX, rotateY] = letterMotion[index % letterMotion.length];
            const [scatterX, scatterY, scatterZ, scatterRotateX, scatterRotateY, scatterRotateZ] =
              scatterMotion[index % scatterMotion.length];
            return (
              <span
                className={letter === ' ' ? 'intro-letter intro-space' : 'intro-letter'}
                key={`${letter}-${index}`}
                style={{
                  '--letter-index': index,
                  '--entry-x': `${x}px`,
                  '--entry-y': `${y}px`,
                  '--entry-z': `${z}px`,
                  '--entry-rx': `${rotateX}deg`,
                  '--entry-ry': `${rotateY}deg`,
                  '--scatter-x': `${scatterX}px`,
                  '--scatter-y': `${scatterY}px`,
                  '--scatter-z': `${scatterZ}px`,
                  '--scatter-rx': `${scatterRotateX}deg`,
                  '--scatter-ry': `${scatterRotateY}deg`,
                  '--scatter-rz': `${scatterRotateZ}deg`,
                }}
              >
                {letter === ' ' ? '\u00a0' : letter}
              </span>
            );
          })}
        </div>
        <div className="intro-welcome" aria-hidden="true">
          <strong>o'quv markaziga xush kelibsiz</strong>
        </div>
        {needsSoundTap ? (
          <button className="intro-sound-button" type="button" onClick={handleSoundTap}>
            <span className="intro-sound-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Ovozni yoqish
          </button>
        ) : null}
        <div className="intro-sparks">
          {Array.from({ length: 34 }, (_, index) => (
            <span key={index} style={{ '--spark-index': index }} />
          ))}
        </div>
      </div>
    </div>
  );
}

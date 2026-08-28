'use client';

import { ChevronRight, Play, RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { moduleDefinitions as modules, type ModuleId } from '@/content/modules';
import type { Locale } from '@/lib/site';

const PathwayCanvas = dynamic(() => import('./PathwayCanvas'), { ssr: false });

type SequenceAct = 0 | 1 | 2;
type SequenceState = 'idle' | 'running' | 'settled' | 'selected';

const actDurations = [900, 900, 1400] as const;
const sceneActs = ['current', 'programme', 'modules'] as const;

const sceneCopy = {
  en: {
    railLabel: 'CerviGuard and TealGuard pathway',
    moduleGroupLabel: 'Explore planned modules',
    play: 'Play pathway',
    playing: 'Pathway playing',
    replay: 'Replay pathway',
    plannedModule: 'Planned module',
    moduleDetails: [
      'Structured intake and image-quality checks. Clinical interpretation stays with qualified professionals.',
      'Grounded operational guidance. Clinical questions stay with qualified professionals.',
      'Reminders, appointments and escalation support. No autonomous care decisions.',
      'Equipment availability and capacity planning. No clinical decisions.'
    ],
    acts: [
      {
        label: 'CerviGuard today',
        detail: 'Our current foundation.'
      },
      {
        label: 'TealGuard next',
        detail: 'A 36-month development, integration and validation programme.'
      },
      {
        label: 'Four planned modules',
        detail: 'Screening, navigation, follow-up and operations.'
      }
    ]
  },
  ro: {
    railLabel: 'Parcursul CerviGuard și TealGuard',
    moduleGroupLabel: 'Explorați modulele planificate',
    play: 'Porniți parcursul',
    playing: 'Parcurs în redare',
    replay: 'Reluați parcursul',
    plannedModule: 'Modul planificat',
    moduleDetails: [
      'Achiziție structurată și verificări ale calității imaginilor. Interpretarea clinică rămâne la profesioniști calificați.',
      'Îndrumare operațională bazată pe surse aprobate. Întrebările clinice rămân la profesioniști calificați.',
      'Notificări, programări și sprijin pentru escaladare. Fără decizii autonome de îngrijire.',
      'Disponibilitatea echipamentelor și planificarea capacității. Fără decizii clinice.'
    ],
    acts: [
      {
        label: 'CerviGuard astăzi',
        detail: 'Baza noastră actuală.'
      },
      {
        label: 'TealGuard: etapa următoare',
        detail: 'Un program de 36 de luni pentru dezvoltare, integrare și validare.'
      },
      {
        label: 'Patru module planificate',
        detail: 'Screening, navigare, monitorizare și operațiuni.'
      }
    ]
  }
} as const;

const fallbackModulePositions = [
  { left: '62%', top: '19%' },
  { left: '72%', top: '37%' },
  { left: '62%', top: '61%' },
  { left: '46%', top: '71%' }
] as const;

class SceneErrorBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function HeroScene({ locale }: { locale: Locale }) {
  const [selectedId, setSelectedId] = useState<ModuleId | null>(null);
  const [sequenceAct, setSequenceAct] = useState<SequenceAct>(0);
  const [sequenceState, setSequenceState] = useState<SequenceState>('idle');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [runToken, setRunToken] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const copy = sceneCopy[locale];
  const selected = modules.find((module) => module.id === selectedId);
  const selectedIndex = selected ? modules.findIndex((module) => module.id === selected.id) : -1;
  const animating = sequenceState === 'running' && visible && !reduceMotion;
  const playbackState = sequenceState === 'running' ? 'playing' : sequenceState === 'idle' ? 'idle' : 'stopped';
  const playbackLabel = sequenceState === 'running' ? copy.playing : hasPlayed ? copy.replay : copy.play;
  const descriptionTitle = selected ? `${copy.plannedModule}: ${selected.name}` : copy.acts[sequenceAct].label;
  const descriptionDetail = selected
    ? copy.moduleDetails[selectedIndex]
    : copy.acts[sequenceAct].detail;

  const disableWebgl = useCallback(() => {
    setReady(false);
    setWebgl(false);
  }, []);

  const playSequence = useCallback(() => {
    document.body.style.cursor = '';
    setHasPlayed(true);
    setSelectedId(null);
    setRunToken((token) => token + 1);

    if (reduceMotion) {
      setSequenceAct(2);
      setSequenceState('settled');
      return;
    }

    setSequenceAct(0);
    setSequenceState('running');
  }, [reduceMotion]);

  const selectModule = useCallback((id: ModuleId) => {
    document.body.style.cursor = '';
    setSelectedId(id);
    setSequenceAct(2);
    setSequenceState('selected');
    setRunToken((token) => token + 1);
  }, []);

  useEffect(() => {
    if (sequenceState !== 'running' || !visible) return;

    const timer = window.setTimeout(() => {
      if (sequenceAct === 2) {
        setSequenceState('settled');
        return;
      }
      setSequenceAct((act) => (act + 1) as SequenceAct);
    }, actDurations[sequenceAct]);

    return () => window.clearTimeout(timer);
  }, [sequenceAct, sequenceState, visible]);

  useEffect(() => {
    if (!reduceMotion || sequenceState !== 'running') return;
    const settleTask = window.setTimeout(() => {
      setSequenceAct(2);
      setSequenceState('settled');
    }, 0);

    return () => window.clearTimeout(settleTask);
  }, [reduceMotion, sequenceState]);

  useEffect(() => {
    const capabilityFrame = window.requestAnimationFrame(() => {
      setHydrated(true);
      setWebgl(canUseWebGL());
    });

    const updateVisibility = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', updateVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(document.visibilityState === 'visible' && entry.isIntersecting),
      { threshold: 0.08 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
      window.cancelAnimationFrame(capabilityFrame);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div
      className="hero-scene"
      data-scene-ready={ready ? 'true' : 'false'}
      data-scene-mode={webgl ? 'webgl' : 'static'}
      data-scene-act={sceneActs[sequenceAct]}
      data-playback={playbackState}
      ref={sceneRef}
    >
      <div className="scene-fallback" aria-hidden="true">
        <span className="scene-fallback__base" />
        <span className="scene-fallback__source" />
        <span className="scene-fallback__trunk" />
        <span className="scene-fallback__boundary" />
        {modules.map((module, index) => (
          <span
            key={`${module.id}-branch`}
            className={`scene-fallback__branch scene-fallback__branch--${index + 1}`}
          />
        ))}
        {modules.map((module, index) => (
          <span
            key={module.id}
            className="scene-fallback__station"
            style={
              {
                '--station-accent': module.accent,
                '--station-left': fallbackModulePositions[index].left,
                '--station-top': fallbackModulePositions[index].top
              } as CSSProperties
            }
          />
        ))}
      </div>

      {webgl ? (
        <div className={`scene-canvas ${ready ? 'is-ready' : ''}`} aria-hidden="true">
          <SceneErrorBoundary onFailure={disableWebgl}>
            <PathwayCanvas
              animating={animating}
              runToken={runToken}
              selectedId={selectedId}
              sequenceAct={sequenceAct}
              onReady={() => setReady(true)}
              onFailure={disableWebgl}
              onSelect={selectModule}
            />
          </SceneErrorBoundary>
        </div>
      ) : null}

      <div className="scene-controls">
        <div className={`scene-pathway-toolbar ${hydrated ? '' : 'is-static'}`}>
          {hydrated ? (
            <button
              className="scene-playback-button"
              type="button"
              aria-label={playbackLabel}
              title={playbackLabel}
              disabled={sequenceState === 'running'}
              onClick={playSequence}
            >
              {hasPlayed && sequenceState !== 'running'
                ? <RotateCcw aria-hidden="true" size={17} />
                : <Play aria-hidden="true" size={17} />}
              <span>{playbackLabel}</span>
            </button>
          ) : null}
          <ol className="scene-narrative" aria-label={copy.railLabel}>
            {copy.acts.map((act, index) => (
              <li
                key={act.label}
                className={sequenceAct === index ? 'is-active' : ''}
                aria-current={sequenceAct === index ? 'step' : undefined}
              >
                <span>{act.label}</span>
                {index < copy.acts.length - 1 ? <ChevronRight aria-hidden="true" size={12} strokeWidth={2} /> : null}
              </li>
            ))}
          </ol>
        </div>

        <div
          className="scene-modules"
          role={hydrated ? 'group' : 'list'}
          aria-label={copy.moduleGroupLabel}
        >
          {modules.map((module) => {
            const moduleLabel = (
              <>
                <span className="scene-module-code">{module.shortCode}</span>
                <span className="scene-module-copy">
                  <strong>{module.name}</strong>
                  <small>{copy.plannedModule}</small>
                </span>
              </>
            );

            return hydrated ? (
              <button
                className="scene-module-button"
                type="button"
                key={module.id}
                aria-label={`${copy.plannedModule}: ${module.name}`}
                aria-pressed={selectedId === module.id}
                onClick={() => selectModule(module.id)}
                style={{ '--module-accent': module.accent } as CSSProperties}
              >
                {moduleLabel}
              </button>
            ) : (
              <span
                className="scene-module-button scene-module-button--static"
                role="listitem"
                key={module.id}
                style={{ '--module-accent': module.accent } as CSSProperties}
              >
                {moduleLabel}
              </span>
            );
          })}
        </div>
      </div>

      <p className="scene-description" role="status" aria-live="polite" aria-atomic="true">
        <strong>{descriptionTitle}</strong>
        <span>{descriptionDetail}</span>
      </p>
    </div>
  );
}

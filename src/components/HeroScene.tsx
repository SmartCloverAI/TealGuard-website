'use client';

import { useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { moduleDefinitions as modules, type ModuleId } from '@/content/modules';
import type { Locale } from '@/lib/site';

const PathwayCanvas = dynamic(() => import('./PathwayCanvas'), { ssr: false });

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
  const [selectedId, setSelectedId] = useState<ModuleId>(modules[0].id);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const selected = modules.find((module) => module.id === selectedId) ?? modules[0];
  const disableWebgl = useCallback(() => {
    setReady(false);
    setWebgl(false);
  }, []);

  useEffect(() => {
    const capabilityFrame = window.requestAnimationFrame(() => setWebgl(canUseWebGL()));

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
      ref={sceneRef}
    >
      <div className="scene-fallback" aria-hidden="true">
        <span className="scene-fallback__rail" />
        {modules.map((module) => (
          <span key={module.id} className="scene-fallback__station" style={{ '--station-accent': module.accent } as React.CSSProperties} />
        ))}
        <span className="scene-fallback__base" />
      </div>
      {webgl ? (
        <div className={`scene-canvas ${ready ? 'is-ready' : ''}`} aria-hidden="true">
          <SceneErrorBoundary onFailure={disableWebgl}>
            <PathwayCanvas
              active={visible && !reduceMotion}
              selectedId={selectedId}
              onReady={() => setReady(true)}
              onFailure={disableWebgl}
              onSelect={(id: ModuleId) => setSelectedId(id)}
            />
          </SceneErrorBoundary>
        </div>
      ) : null}
      <div className="scene-controls" aria-label={locale === 'ro' ? 'Modulele platformei' : 'Platform modules'}>
        {modules.map((module) => (
          <button
            type="button"
            key={module.id}
            aria-pressed={selectedId === module.id}
            onClick={() => setSelectedId(module.id)}
            style={{ '--module-accent': module.accent } as React.CSSProperties}
          >
            <span>{module.shortCode}</span>
            {module.name}
          </button>
        ))}
      </div>
      <p className="scene-description" aria-live="polite">
        <strong>{selected.name}</strong>
        {selected.responsibility[locale]}
      </p>
    </div>
  );
}

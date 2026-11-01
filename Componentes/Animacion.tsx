import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

/**
 * Logo de puntos rojos que se va formando (aparecen de a uno, con un pequeño rebote).
 * Pensado para pantallas de carga / splash.
 *
 * Requiere: npx expo install react-native-svg
 *
 * Uso:
 *   <DotsLogoLoader size={160} onFinish={() => router.replace('/Panel')} />
 *   <DotsLogoLoader size={160} loop />
 */

type Props = {
  /** Ancho en px (el alto se calcula con la proporción del logo). */
  size?: number;
  /** Color de los círculos. */
  color?: string;
  /** 1 = velocidad normal, 2 = el doble de rápido, 0.5 = más lento. */
  speed?: number;
  /** Se llama cuando termina de aparecer el último círculo (en loop, en cada vuelta). */
  onFinish?: () => void;
  /** Repite la animación indefinidamente. */
  loop?: boolean;
  /** Pausa (ms) al final de cada vuelta cuando loop está activo. */
  loopDelay?: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const VB_X = -4;
const VB_Y = -4;
const VB_W = 225;
const VB_H = 235;
const RADIUS = 29.3;

type Dot = { id: string; cx: number; cy: number; start: number; dur: number };

const DOTS: Dot[] = [
  { id: 'd0', cx: 29.5, cy: 29.5, start: 0, dur: 520 },
  { id: 'd1', cx: 108.4, cy: 29.5, start: 170, dur: 520 },
  { id: 'd2', cx: 187.2, cy: 29.5, start: 340, dur: 520 },
  { id: 'd3', cx: 29.5, cy: 113.3, start: 510, dur: 520 },
  { id: 'd4', cx: 108.4, cy: 113.3, start: 680, dur: 520 },
  { id: 'd5', cx: 29.5, cy: 197.0, start: 850, dur: 520 },
];

export default function DotsLogoLoader({
  size = 160,
  color = '#E30613',
  speed = 1,
  onFinish,
  loop = false,
  loopDelay = 600,
}: Props) {
  const progress = useRef(DOTS.map(() => new Animated.Value(0))).current;
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current: Animated.CompositeAnimation | undefined;

    const run = () => {
      progress.forEach((v) => v.setValue(0));
      current = Animated.parallel(
        DOTS.map((d, i) =>
          Animated.timing(progress[i], {
            toValue: 1,
            delay: d.start / speed,
            duration: d.dur / speed,
            easing: Easing.out(Easing.back(1.8)), // sale un poco de más y vuelve
            useNativeDriver: false, // las props de SVG no soportan el driver nativo
          })
        )
      );
      current.start(({ finished }) => {
        if (!finished || cancelled) return;
        finishRef.current?.();
        if (loop) timer = setTimeout(run, loopDelay);
      });
    };

    run();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      current?.stop();
    };
  }, [progress, speed, loop, loopDelay]);

  const height = (size * VB_H) / VB_W;

  return (
    <View style={{ width: size, height }}>
      <Svg width={size} height={height} viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}>
        {DOTS.map((d, i) => (
          <AnimatedCircle
            key={d.id}
            cx={d.cx}
            cy={d.cy}
            // max(0) evita radios negativos por si el easing se pasa en el arranque
            r={progress[i].interpolate({ inputRange: [0, 1], outputRange: [0, RADIUS] })}
            fill={color}
          />
        ))}
      </Svg>
    </View>
  );
}
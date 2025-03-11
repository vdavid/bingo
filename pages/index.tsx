import { useCallback, useEffect, useState } from 'react'
import randomNumbers from '../modules/bingo/randomNumbers'
import SimpleLayout from '../modules/bingo/SimpleLayout'
import styles from '../modules/bingo/bingo.module.scss'

type Position = { top: number; left: number };

const doesCollide = (posA: Position, posB: Position, buffer: number): boolean => {
    return (
        posA.left < posB.left + buffer &&
        posA.left + buffer > posB.left &&
        posA.top < posB.top + buffer &&
        posA.top + buffer > posB.top
    )
}

const generatePosition = (existingPositions: Position[], buffer: number): Position => {
    const newPosition: Position = {
        top: Math.random() * 100,
        left: Math.random() * 100,
    }

    for (let pos of existingPositions) {
        if (doesCollide(newPosition, pos, buffer)) {
            return generatePosition(existingPositions, buffer - 0.5)
        }
    }

    return newPosition
}

const Page = () => {
    const [currentNumberIndex, setCurrentNumberIndex] = useState<number>(0)
    const [currentNumber, setCurrentNumber] = useState<number | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [positions, setPositions] = useState<Position[]>([])
    const [spotlightTarget, setSpotlightTarget] = useState<Position | null>(null);
    const [spotlightPosition, setSpotlightPosition] = useState<Position>({ top: 50, left: 50 });
    const [showSpotlight, setShowSpotlight] = useState(false);
    const animationDurationMs = 4000
    const [circularMotionSpeed, setCircularMotionSpeed] = useState(0)

    useEffect(() => {
        let generatedPositions: Position[] = []
        randomNumbers.forEach(() => {
            generatedPositions.push(generatePosition(generatedPositions, 15))
        })
        setPositions(generatedPositions)
    }, [])

    const startAnimation = useCallback(() => {
        setSpotlightTarget(positions[currentNumberIndex])
        setIsAnimating(true)
        setShowSpotlight(true) // Show the spotlight
        setCircularMotionSpeed(0.002 + Math.random() * 0.005);
        console.log(100 + Math.random() * 100);
        setTimeout(() => {
            setCurrentNumber(randomNumbers[currentNumberIndex])
            setCurrentNumberIndex(currentNumberIndex + 1)
            setIsAnimating(false) // This won't hide the spotlight anymore
        }, animationDurationMs) // animation duration
    }, [currentNumberIndex, positions])

    useEffect(() => {
        const handleSpacePress = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                startAnimation();
                e.preventDefault();
            }
        };

        const handleClick = (e: MouseEvent) => {
            startAnimation();
            e.preventDefault();
        };

        window.addEventListener('keydown', handleSpacePress);
        document.addEventListener('click', handleClick);  // listening for click event on the entire document

        return () => {
            window.removeEventListener('keydown', handleSpacePress);
            document.removeEventListener('click', handleClick); // cleanup click event listener
        }
    }, [startAnimation]);

    useEffect(() => {
        if (!isAnimating || !spotlightTarget) return;

        const startTime = performance.now();
        const duration = animationDurationMs; // 5 seconds

        const initialPosition = { ...spotlightPosition };

        const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const currentTop = initialPosition.top + progress * (spotlightTarget.top - initialPosition.top);
            const currentLeft = initialPosition.left + progress * (spotlightTarget.left - initialPosition.left);

            // Add circular searching effect
            const circleRadius = 10 * (1 - progress);  // Radius starts large and decreases to zero as the animation progresses
            const circleTopOffset = circleRadius * Math.sin(circularMotionSpeed * elapsedTime);
            const circleLeftOffset = circleRadius * Math.cos(circularMotionSpeed * elapsedTime);

            const circleTop = currentTop + circleTopOffset;
            const circleLeft = currentLeft + circleLeftOffset;

            setSpotlightPosition({
                top: circleTop,
                left: circleLeft,
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationHandle = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationHandle); // Cleanup function to stop animation
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAnimating, spotlightTarget]);


    return (
        <SimpleLayout>
            <div className={styles.page}>
            <main className={styles.container}>
                <div className={styles.numberSpace}>
              {randomNumbers.map((num, index) => (
                  <span key={num} className={`${styles.number} ${num === currentNumber ? 'active' : ''}`}
                        style={{ top: `calc(${positions[index]?.top}% - 30px)`, left: `calc(${positions[index]?.left}% - 30px)` }}>
                  {num}
                </span>
              ))}
                    {showSpotlight && (
                        <div
                            key={(spotlightTarget?.top || 0) * 100 + (spotlightTarget?.left || 0)} // use the index as a key
                            className={styles.spotlight}
                            style={{
                                top: `${spotlightPosition.top}%`,
                                left: `${spotlightPosition.left}%`
                            }}
                        ></div>
                    )}
                </div>
            </main>
            </div>
        </SimpleLayout>
    )
}

export default Page

import { useEffect, useState } from 'react'
import randomNumbers from '../../modules/bingo/randomNumbers'
import SimpleLayout from '../../modules/bingo/SimpleLayout'
import styles from '../../modules/bingo/bingo.module.scss'

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
    const animationDurationMs = 5000

    useEffect(() => {
        let generatedPositions: Position[] = []
        randomNumbers.forEach(() => {
            generatedPositions.push(generatePosition(generatedPositions, 15))
        })
        setPositions(generatedPositions)
    }, [])

    useEffect(() => {
        const handleSpacePress = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                setSpotlightTarget(positions[currentNumberIndex]);
                setIsAnimating(true)
                setTimeout(() => {
                    setCurrentNumber(randomNumbers[currentNumberIndex])
                    setCurrentNumberIndex(currentNumberIndex + 1)
                    setIsAnimating(false)
                }, animationDurationMs) // animation duration
            }
        }

        window.addEventListener('keydown', handleSpacePress)
        return () => window.removeEventListener('keydown', handleSpacePress)
    }, [currentNumberIndex, positions])

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

            setSpotlightPosition({
                top: currentTop,
                left: currentLeft,
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationHandle = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationHandle); // Cleanup function to stop animation
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
                    {isAnimating && (
                        <div
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

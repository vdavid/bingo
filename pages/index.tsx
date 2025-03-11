import DefaultLayout from '../modules/bingo/DefaultLayout'
import Link from 'next/link'
import styles from '../modules/bingo/index.module.scss'

const Page = () => {
  return (
    <DefaultLayout title="Bingo games and utilities" description="A collection of bingo games, generators, and utilities">
      <header>
        <h1>Bingo games and utilities</h1>
      </header>
      <main>
        <p>Welcome to the bingo application. Choose from the following features:</p>
        
        <div className={styles.links}>
          <div className={styles.linkCard}>
            <h2><Link href="/game">Bingo game</Link></h2>
            <p>Interactive bingo game with animated spotlight that searches for numbers. Click anywhere or press spacebar to call the next number.</p>
          </div>
          
          <div className={styles.linkCard}>
            <h2><Link href="/generator">Bingo sheet generator</Link></h2>
            <p>Create and print customized bingo sheets for multiple players. Generates sheets with a wedding theme.</p>
          </div>
          
          <div className={styles.linkCard}>
            <h2><Link href="/little-wedding-cards">Wedding cards</Link></h2>
            <p>Generate food/info cards with dietary information (milk-free, gluten-free, sugar-free) for events.</p>
          </div>
          
          <div className={styles.linkCard}>
            <h2><Link href="/simulation">Game simulation</Link></h2>
            <p>Run statistical analyses of bingo games to see metrics like win rates, distribution, and patterns.</p>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}

export default Page
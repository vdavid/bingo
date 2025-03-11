import SimpleLayout from '../modules/bingo/SimpleLayout'
import styles from '../modules/bingo/littleWeddingCards.module.scss'
import bikePic from '../public/wedding/bike-wireframe.png'
import Image from 'next/image'

type Card = {
    isFood: boolean;
    text: string;
    milk?: boolean;
    gluten?: boolean;
    sugar?: boolean;
}

const cards: Card[] = [
    { isFood: true, text: 'Szalalkális süti' },
    { isFood: true, text: 'Rozmaringos zabsüti' },
    { isFood: true, text: 'Csupa csokis keksz' },
    { isFood: true, text: 'Zserbó' },
    { isFood: true, text: 'Linzer koszorú' },
    { isFood: true, text: 'Linzer keksz dióval' },
    { isFood: true, text: 'Isler' },
    { isFood: true, text: 'Almáspite' },
    { isFood: true, text: 'Kókuszkocka' },
    { isFood: true, text: 'Kókusz csiga' },
    { isFood: true, text: 'Piskótatekercs' },
    { isFood: true, text: 'Gyümölcsös piskóta' },
    { isFood: true, text: 'Csokis, sacher-szerű piskóta lekvárral' },
    { isFood: true, text: 'Mézes puszedli' },
    { isFood: true, text: 'Kovász chips', milk: false, sugar: false },
    { isFood: true, text: 'Sajtos pálcika', sugar: false },
    { isFood: true, text: 'Sós rúd', sugar: false },
    { isFood: true, text: 'Szezámos korong', sugar: false },
    { isFood: true, text: 'Mártogatós zöldségek', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Salátabár' },
    { isFood: true, text: 'Gyümölcs' },
    { isFood: true, text: 'Zöldsaláta' },
    { isFood: true, text: 'Kesudió' },
    { isFood: true, text: 'Törökmogyoró' },
    { isFood: true, text: 'Tökmag' },
    { isFood: true, text: 'Dió' },
    { isFood: true, text: 'Mandula' },
    { isFood: true, text: 'Mazsola' },
    { isFood: true, text: 'Taboulé', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Gyömbéres-szilvás sali', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Kenyér a Béke Pékségből️' },
    { isFood: true, text: 'Kenyér', milk: false, sugar: false },
    { isFood: true, text: 'Gluténmentes kenyér' },
    { isFood: true, text: 'Padlizsánkrém', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Hummusz', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Citromos tökmagpástétom', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Csíkokra vágott zöldségek', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Basmati rizs', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Curry', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Borsóleves', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Gyümölcsleves', milk: false, gluten: false },
    { isFood: true, text: 'Falafel', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Sült zöldség', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Basmati rizs', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Saláta', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Penne tészta (durum)', milk: false, sugar: false },
    { isFood: true, text: 'Paradicsomszósz', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Puttanesca mártás', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Tahini mártás', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Éjféli chilis bab', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Kávé', milk: false, gluten: false, sugar: false },
    { isFood: true, text: 'Tejbegríz', milk: false },
    { isFood: true, text: 'Citromos víz', sugar: false },
    { isFood: true, text: 'Uborkás víz', sugar: false },
    { isFood: true, text: 'Bodzaszörp' },
    { isFood: true, text: 'Házi sütik a családtól' },
    { isFood: true, text: 'Szóda' },
    { isFood: true, text: 'Zabtej' },
    { isFood: true, text: 'Tehéntej' },
    { isFood: true, text: 'Sör' },
    { isFood: true, text: 'Alkoholmentes sör' },
    { isFood: true, text: 'Hideg üdítők' },
    { isFood: false, text: '← Ha üresen látod, légyszi szólj egy pultosnak!' },
    { isFood: false, text: '← Ha üresen látod, légyszi szólj egy pultosnak!' },
    { isFood: false, text: '← Ha üresen látod, légyszi szólj egy pultosnak!' },
    { isFood: false, text: 'Közös vacsora velünk' },
    { isFood: false, text: '' },
    { isFood: false, text: '' },
    { isFood: false, text: '' },
    { isFood: false, text: '' },
    { isFood: false, text: '' },
    { isFood: false, text: '' },
]

const groupedCards: Card[][] = []
let cardCountPerPage = 4
for (let i = 0; i < (cards.length || 0); i += cardCountPerPage) {
    const filledCards = cards.slice(i, i + cardCountPerPage);
    const emptyCards = Array(8).fill({ isFood: false, text: '' });
    emptyCards.splice(0, 2, ...filledCards.slice(0, 2)); // Inserting the 4 filled cards in the positions for the 2nd and 4th rows
    emptyCards.splice(2, 2, ...filledCards.slice(0, 2)); // Inserting the 4 filled cards in the positions for the 2nd and 4th rows
    emptyCards.splice(4, 2, ...filledCards.slice(2, 4)); // Inserting the 4 filled cards in the positions for the 2nd and 4th rows
    emptyCards.splice(6, 2, ...filledCards.slice(2, 4)); // Inserting the 4 filled cards in the positions for the 2nd and 4th rows
    groupedCards.push(emptyCards);
}

const Page = () => {
    return (
        <SimpleLayout>
            <main className={styles.page}>
                {groupedCards.map((group, idx) => (
                    <div key={idx} className={styles.pageContainer}>
                        {group?.map(card => {
                            const notes = []
                            if (card.milk === false) {
                                notes.push('tejmentes')
                            }
                            if (card.gluten === false) {
                                notes.push('gluténmentes')
                            }
                            if (card.sugar === false) {
                                notes.push('cukormentes')
                            }
                            return (
                                <div key={card.text + Math.random()} className={styles.cardContainer}>
                                <Image src={bikePic} alt="bike" className={styles.bikeImage}/>
                                    <Image src={bikePic} alt="bike" className={styles.bikeImage2}/>
                                    <div className={styles.cardText}>{card.text}</div>
                                    {card.isFood ? <div className={styles.cardNotes}>{notes.join(', ')}</div> : null
                                    }
                                </div>
                            )
                        })}
                    </div>
                ))}
            </main>
        </SimpleLayout>
    )
}

export default Page

import React, { ReactNode } from 'react'
import Head from 'next/head'
import styles from './BingoLayout.module.scss'

type Props = {
    children?: ReactNode
}

const BingoLayout = (props: Props) => {
    return (
        <div>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="author" content="David Veszelovszki"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Ms+Madi&display=swap" rel="stylesheet"/>
            </Head>
            <div className={styles.page}>
                {props.children}
            </div>
        </div>
    )
}

export default BingoLayout

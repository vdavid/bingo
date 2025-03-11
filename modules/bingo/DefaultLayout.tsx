import React, { ReactNode } from 'react'
import Head from 'next/head'
import styles from './DefaultLayout.module.scss'
import Link from 'next/link'

type Props = {
    children?: ReactNode
    title?: string
    description?: string
    keywords?: string
    locale?: string
    ogImageUrl?: string
    facebookAppId?: string
    showThemeToggle?: boolean
    wrapInArticleTag?: boolean
}

const DefaultLayout = (props: Props) => {
    return (
        <div>
            <Head>
                <title>{props.title || '(Untitled)'}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="David Veszelovszki" />
                <meta name="locale" property="og:locale" content={(props.locale || 'en-US').replace('-', '_')} />
                {props.description && <meta name="description" content={props.description} />}
                {props.keywords && <meta name="keywords" content={props.keywords} />}
                {props.ogImageUrl && <meta property="og:image" content={props.ogImageUrl} />}
                {props.facebookAppId && <meta property="fb:app_id" content={props.facebookAppId} />}
            </Head>
            <div className={styles.page}>
                {props.wrapInArticleTag ? <article>{props.children}</article> : props.children}
                <footer>
                    <hr />
                    {props.locale === 'hu-HU'
                        ? <p><Link href="/">Vissza a főoldalra</Link></p>
                        : <p><Link href="/">Back to the main page</Link></p>}
                </footer>
            </div>
        </div>
    )
}

export default DefaultLayout

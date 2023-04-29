import AutoComplete from "@/components/AutoComplete";
import { top100Films } from "@/constants/global";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Autocomplete Component</title>
                <meta
                    name="description"
                    content="React Autocomplete Component"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <AutoComplete list={top100Films} />
            </main>
        </>
    );
}

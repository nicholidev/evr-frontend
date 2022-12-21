import Document, {
    Html,
    Main,
    Head,
    NextScript,
    DocumentContext,
} from "next/document";
import React from "react";

class MyDocument extends Document 
{
    static async getInitialProps(ctx: DocumentContext) 
    {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() 
    {
        return (
            <Html lang="en">
                <Head>
                    <script
                        async
                        src="/snowstorm.js"
                        crossOrigin="anonymous"
                    ></script>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}


export default MyDocument;

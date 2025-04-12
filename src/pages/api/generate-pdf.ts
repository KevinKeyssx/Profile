import chromium from '@sparticuz/chromium';
import {head, put} from '@vercel/blob';
import {NextApiRequest, NextApiResponse} from 'next';
import puppeteer from 'puppeteer-core';


async function generatePDF (req: NextApiRequest): Promise<Buffer> {
    let browser;

    try {
        const config = {
            args                : [...chromium.args, '--hide-scrollbars', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport     : chromium.defaultViewport,
            executablePath      : await chromium.executablePath(),
            headless            : true,
            ignoreHTTPSErrors   : true,
        }

        browser = await puppeteer.launch( config );

        const page              = await browser.newPage();
        const baseUrl           = process.env.NEXT_PUBLIC_URL_PROD;
        const pageUrl           = `${baseUrl}${req.query.path || '/'}`;
        const bgImageUrl        = `${baseUrl}/bg.jpg`;
        const profileImageUrl   = `${baseUrl}/me.jpg`;

        await page.setRequestInterception( true );

        page.on('request', request => {
            try {
                request.continue();
            } catch (e) {
                console.warn('Request interception error:', e);
                request.continue();
            }
        });

        await page.goto(pageUrl, {
            waitUntil   : 'networkidle0',
            timeout     : 120000
        });

        try {
            await page.addStyleTag({
                content: `
                    #heroBackgroundImage, [id^="hero"] {
                        background-image: url('${bgImageUrl}') !important;
                        object-fit: cover !important;
                    }
                    img[alt$="-image"]:not([alt="me-image"]) {
                        content: url('${bgImageUrl}') !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        display: block !important;
                    }
                    img[alt="me-image"] {
                        content: url('${profileImageUrl}') !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        display: block !important;
                    }
                `
            });
        } catch ( styleError ) {
            console.warn( 'Failed to add style tag:', styleError );
        }

        await new Promise( resolve => setTimeout( resolve, 3000 ));

        await page.evaluate(( bgImageUrl, profileImageUrl ) => {
            const header = document.querySelector( '#headerNav' );

            if ( header ) header.remove();

            const generatePdfButton = document.querySelector( '#generatePdfButton' );

            if ( generatePdfButton ) generatePdfButton.remove();

            try {
                const styleEl = document.createElement( 'style' );

                styleEl.textContent = `
                    [id^="hero"] {
                        background-image: url("${bgImageUrl}") !important;
                    }
                    img[alt$="-image"]:not([alt="me-image"]) {
                        content: url("${bgImageUrl}") !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        display: block !important;
                    }
                    img[alt="me-image"] {
                        content: url("${profileImageUrl}") !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        display: block !important;
                    }
                `;

                document.head.appendChild( styleEl );

                return {success: true, message: 'Style injection successful'};
            } catch (error) {
                return {success: false, error: String(error)};
            }
        }, bgImageUrl, profileImageUrl );

        try {
            await page.waitForFunction(() => {
                const images = Array.from( document.querySelectorAll( 'img' ));
                return images.every(img => {
                    if ( img.complete ) return true;
                    if ( img.naturalWidth === 0 ) return false;
                    return true;
                });
            }, {timeout: 3000});
        } catch ( timeoutError ) {
            console.warn('Image loading timeout, continuing anyway:', timeoutError);
        }

        return await page.pdf({
            format              : 'A3',
            printBackground     : true,
            preferCSSPageSize   : true
        });

    } catch (error) {
        console.error('PDF generation error:', error);
        throw error;
    }finally {
        if (browser) await browser.close();
    }
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const blobKey = `pdf-${req.query.path || 'home'}-v1.pdf`;

    try {
        try {
            const {url: existingUrl} = await head( blobKey );
            console.log( 'Sirviendo desde Vercel Blob Storage' );
            res.setHeader( 'X-Cache', 'HIT' );
            return res.redirect( 307, existingUrl );
        } catch (error) {
            console.log( 'Error, Pero generando nuevo PDF' );
        }

        console.log('Generando nuevo PDF');
        const pdfBuffer = await generatePDF(req);

        const {url} = await put( blobKey, pdfBuffer, {
            access: 'public',
            contentType: 'application/pdf',
            cacheControlMaxAge: 2592000
        });

        console.log('PDF almacenado en:', url);
        res.redirect(307, url);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Failed to generate PDF',
            ...(process.env.NODE_ENV === 'development' && {
                details: error instanceof Error ? error.message : String(error)
            })
        });
    }
};
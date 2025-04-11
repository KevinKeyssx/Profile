import chromium from '@sparticuz/chromium';
import {NextApiRequest, NextApiResponse} from 'next';
import puppeteer from 'puppeteer-core';
// import puppeteer from 'puppeteer';

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
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

        // await page.setDefaultNavigationTimeout( 90000 );
        // await page.setDefaultTimeout( 60000 );

        // Interceptar solicitudes para manejar imágenes
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
        } catch (styleError) {
            console.warn('Failed to add style tag:', styleError);
        }

        await new Promise(resolve => setTimeout( resolve, 1000 ));

        await page.evaluate((bgImageUrl, profileImageUrl) => {
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
        }, bgImageUrl, profileImageUrl);

        try {
            await page.waitForFunction(() => {
                const images = Array.from(document.querySelectorAll('img'));
                return images.every(img => {
                    if (img.complete) return true;
                    if (img.naturalWidth === 0) return false;
                    return true;
                });
            }, {timeout: 1000});
        } catch (timeoutError) {
            console.warn('Image loading timeout, continuing anyway:', timeoutError);
        }

        const pdfBuffer = await page.pdf({
            format: 'A3',
            printBackground: true,
            preferCSSPageSize: true
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="pagina.pdf"');
        res.end(pdfBuffer);
    } catch (error) {
        console.error('PDF generation error:', error);
        res.status(500).json({error: `Failed to generate PDF: ${error.message || error}`});
    }finally {
        if (browser) await browser.close();
    }
};
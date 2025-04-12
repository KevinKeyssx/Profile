import {head, put} from '@vercel/blob';
import chromium from '@sparticuz/chromium';
import {NextApiRequest, NextApiResponse} from 'next';
import puppeteer from 'puppeteer-core';


// import {Redis} from '@upstash/redis';
// export default async ( req: NextApiRequest, res: NextApiResponse ) => {
//     let browser;

//     try {
//         const config = {
//             args                : [...chromium.args, '--hide-scrollbars', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
//             defaultViewport     : chromium.defaultViewport,
//             executablePath      : await chromium.executablePath(),
//             headless            : true,
//             ignoreHTTPSErrors   : true,
//         }

//         browser = await puppeteer.launch( config );

//         const page              = await browser.newPage();
//         const baseUrl           = process.env.NEXT_PUBLIC_URL_PROD;
//         const pageUrl           = `${baseUrl}${req.query.path || '/'}`;
//         const bgImageUrl        = `${baseUrl}/bg.jpg`;
//         const profileImageUrl   = `${baseUrl}/me.jpg`;

//         await page.setRequestInterception( true );

//         page.on('request', request => {
//             try {
//                 request.continue();
//             } catch (e) {
//                 console.warn('Request interception error:', e);
//                 request.continue();
//             }
//         });

//         await page.goto(pageUrl, {
//             waitUntil   : 'networkidle0',
//             timeout     : 120000
//         });

//         try {
//             await page.addStyleTag({
//                 content: `
//                     #heroBackgroundImage, [id^="hero"] {
//                         background-image: url('${bgImageUrl}') !important;
//                         object-fit: cover !important;
//                     }
//                     img[alt$="-image"]:not([alt="me-image"]) {
//                         content: url('${bgImageUrl}') !important;
//                         visibility: visible !important;
//                         opacity: 1 !important;
//                         display: block !important;
//                     }
//                     img[alt="me-image"] {
//                         content: url('${profileImageUrl}') !important;
//                         visibility: visible !important;
//                         opacity: 1 !important;
//                         display: block !important;
//                     }
//                 `
//             });
//         } catch ( styleError ) {
//             console.warn( 'Failed to add style tag:', styleError );
//         }

//         await new Promise( resolve => setTimeout( resolve, 3000 ));

//         await page.evaluate(( bgImageUrl, profileImageUrl ) => {
//             const header = document.querySelector( '#headerNav' );

//             if ( header ) header.remove();

//             const generatePdfButton = document.querySelector( '#generatePdfButton' );

//             if ( generatePdfButton ) generatePdfButton.remove();

//             try {
//                 const styleEl = document.createElement( 'style' );

//                 styleEl.textContent = `
//                     [id^="hero"] {
//                         background-image: url("${bgImageUrl}") !important;
//                     }
//                     img[alt$="-image"]:not([alt="me-image"]) {
//                         content: url("${bgImageUrl}") !important;
//                         visibility: visible !important;
//                         opacity: 1 !important;
//                         display: block !important;
//                     }
//                     img[alt="me-image"] {
//                         content: url("${profileImageUrl}") !important;
//                         visibility: visible !important;
//                         opacity: 1 !important;
//                         display: block !important;
//                     }
//                 `;

//                 document.head.appendChild( styleEl );

//                 return {success: true, message: 'Style injection successful'};
//             } catch (error) {
//                 return {success: false, error: String(error)};
//             }
//         }, bgImageUrl, profileImageUrl );

//         try {
//             await page.waitForFunction(() => {
//                 const images = Array.from( document.querySelectorAll( 'img' ));
//                 return images.every(img => {
//                     if ( img.complete ) return true;
//                     if ( img.naturalWidth === 0 ) return false;
//                     return true;
//                 });
//             }, {timeout: 3000});
//         } catch ( timeoutError ) {
//             console.warn('Image loading timeout, continuing anyway:', timeoutError);
//         }

//         const pdfBuffer = await page.pdf({
//             format              : 'A3',
//             printBackground     : true,
//             preferCSSPageSize   : true
//         });

//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment; filename="pagina.pdf"');
//         res.end(pdfBuffer);
//     } catch (error) {
//         console.error('PDF generation error:', error);
//         res.status(500).json({error: `Failed to generate PDF: ${error.message || error}`});
//     }finally {
//         if (browser) await browser.close();
//     }
// };


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

        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename="pagina.pdf"');
        // res.end(pdfBuffer);
    } catch (error) {
        console.error('PDF generation error:', error);
        // Throw the error to be caught by the caller
        throw error;
    }finally {
        if (browser) await browser.close();
    }
}


// const redis = new Redis({
//     url     : process.env.NEXT_PUBLIC_PDF_URL!,
//     token   : process.env.NEXT_PUBLIC_PDF_PASSWORD!,
// });


// const CACHE_TTL = 2592000;


// export default async ( req: NextApiRequest, res: NextApiResponse ): Promise<any> => {
//     const cacheKey = `pdf:pdfBuffer:v1`;

//     try {
//         const cachedPdf = await redis.get( cacheKey )
//             .catch(e => {
//                 console.error('Cache read error:', e);
//                 return null;
//             });

//         if ( cachedPdf ) {
//             console.log('Sirviendo desde caché');
//             res.setHeader('Content-Type', 'application/pdf');
//             res.setHeader('X-Cache', 'HIT');
//             return res.end(Buffer.from(cachedPdf as string, 'base64'));
//         }

//         // 2. Generar nuevo PDF si no hay caché
//         console.log('Generando nuevo PDF');
//         const pdfBuffer = await generatePDF(req);

//         redis.set(cacheKey, pdfBuffer.toString('base64'), {ex: CACHE_TTL})
//             .catch(e => console.error('Cache save error:', e));

//         // 4. Responder
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('X-Cache', 'MISS');
//         res.end(pdfBuffer);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({error: 'Failed to generate PDF'});
//     }
// };


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const blobKey = `pdf-${req.query.path || 'home'}-v1.pdf`;

    try {
        // 1. Verificar si el blob existe usando el cliente oficial
        try {
            const {url: existingUrl} = await head( blobKey );
            console.log( 'Sirviendo desde Vercel Blob Storage' );
            res.setHeader( 'X-Cache', 'HIT' );

            // Redirigir al blob almacenado
            return res.redirect( 307, existingUrl );
        } catch (error) {
            // El blob no existe, continuamos con la generación
        }

        // 2. Generar nuevo PDF
        console.log('Generando nuevo PDF');
        const pdfBuffer = await generatePDF(req);

        // 3. Subir a Vercel Blob Storage (sin token manual)
        const {url} = await put( blobKey, pdfBuffer, {
            access: 'public',
            contentType: 'application/pdf'
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
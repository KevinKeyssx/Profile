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

        const page          = await browser.newPage();
        // Ensure we have the base URL, with fallback to the request origin
        const baseUrl = process.env.NEXT_PUBLIC_URL_PROD
        // || (req.headers.origin || 'https://www.kevinkeyssx.dev');
        const pageUrl = `${baseUrl}${req.query.path || '/'}`;
        const bgImageUrl = `${baseUrl}/bg.jpg`;
        const profileImageUrl = `${baseUrl}/profile.jpg`;
        
        console.log('Using URLs:', { baseUrl, pageUrl, bgImageUrl, profileImageUrl });

        await page.setDefaultNavigationTimeout(90000);
        await page.setDefaultTimeout(60000);

        // Interceptar solicitudes para manejar imágenes
        await page.setRequestInterception(true);

        page.on('request', request => {
            // Ensure all resources load properly
            try {
                request.continue();
            } catch (e) {
                console.warn('Request interception error:', e);
                request.continue();
            }
        });

        await page.goto(pageUrl, {
            waitUntil: 'networkidle0',
            timeout: 120000
        });

        await page.waitForTimeout(2000);

        // await page.addStyleTag({
        //     content: `
        //         #heroBackgroundImage {
        //             background-image: url('/bg.jpg') !important;
        //             object-fit: cover !important;
        //         }

        //         img.absolute.z-0[alt$="-image"]:not([alt="me-image"]) {
        //             content: url('/bg.jpg') !important;
        //             visibility: visible !important;
        //             opacity: 1 !important;
        //         }
        //     `
        // });

        // Agregar estilos directamente a la página
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

        // Ya hemos definido profileImageUrl arriba

        // Esperar un poco más para asegurar que la página esté completamente cargada
        await page.waitForTimeout(3000);
        
        // Evaluar en el contexto de la página para manipular el DOM
        const result = await page.evaluate((bgImageUrl, profileImageUrl) => {
            // Eliminar elementos no deseados
            const header = document.querySelector('#headerNav');
            if (header) header.remove();

            const generatePdfButton = document.querySelector('#generatePdfButton');
            if (generatePdfButton) generatePdfButton.remove();

            try {
                // Método más simple para manejar las imágenes
                // Insertar estilos directamente en el head
                const styleEl = document.createElement('style');
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
                document.head.appendChild(styleEl);
                
                return {success: true, message: 'Style injection successful'};
            } catch (error) {
                return {success: false, error: String(error)};
            }
        }, bgImageUrl, profileImageUrl);

        console.log('DOM manipulation result:', result);

        // Establecer un viewport adecuado para el PDF
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 2,
        });

        // Esperar a que las imágenes se carguen completamente
        try {
            await page.waitForFunction(() => {
                const images = Array.from(document.querySelectorAll('img'));
                return images.every(img => {
                    if (img.complete) return true;
                    if (img.naturalWidth === 0) return false;
                    return true;
                });
            }, {timeout: 5000});
        } catch (timeoutError) {
            console.warn('Image loading timeout, continuing anyway:', timeoutError);
            // Continue even if images don't fully load
        }

        // Capturar una screenshot para verificar que las imágenes se ven correctamente
        // Skip screenshot capture as it might be causing issues
        // The /tmp directory might not be accessible in all environments

        // Esperar un poco más para asegurar que las imágenes estén cargadas
        await page.waitForTimeout(2000);
        
        // Generar el PDF con todas las opciones necesarias
        const pdfBuffer = await page.pdf({
            format: 'A3',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            },
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
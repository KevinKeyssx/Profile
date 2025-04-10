import chromium from '@sparticuz/chromium';
import {NextApiRequest, NextApiResponse} from 'next';
import puppeteer from 'puppeteer-core';
// import puppeteer from 'puppeteer';

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    let browser;

    try {
        const config = {
            args                : [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
            defaultViewport     : chromium.defaultViewport,
            executablePath      : await chromium.executablePath(),
            headless            : true,
            ignoreHTTPSErrors   : true,
        }

        browser = await puppeteer.launch( config );

        const page          = await browser.newPage();
        const pageUrl       = `${process.env.NEXT_PUBLIC_URL_PROD}${req.query.path || '/'}`;
        const bgImageUrl    = `${process.env.NEXT_PUBLIC_URL_PROD}/bg.jpg`;

        await page.setDefaultNavigationTimeout(90000);
        await page.setDefaultTimeout(60000);

        // Interceptar solicitudes para manejar imágenes
        await page.setRequestInterception(true);

        page.on('request', request => {
            request.continue();
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

        await page.addStyleTag({
            content: `
                #heroBackgroundImage {
                    background-image: url('${bgImageUrl}') !important;
                    object-fit: cover !important;
                }
                img.absolute.z-0[alt$="-image"]:not([alt="me-image"]) {
                    content: url('${bgImageUrl}') !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `
        });

        // Obtener las URLs absolutas para las imágenes
        const profileImageUrl = `${process.env.NEXT_PUBLIC_URL_PROD}/profile.jpg`;

        // Evaluar en el contexto de la página para manipular el DOM
        const result = await page.evaluate((bgImageUrl, profileImageUrl) => {
            // Eliminar elementos no deseados
            const header = document.querySelector('#headerNav');
            if (header) header.remove();

            const generatePdfButton = document.querySelector('#generatePdfButton');
            if (generatePdfButton) generatePdfButton.remove();

            try {
                // Forzar la imagen de fondo en la sección hero
                const heroSection = document.querySelector(`[id^="hero"]`);
                if (heroSection) {
                    (heroSection as HTMLElement).style.backgroundImage = `url("${bgImageUrl}")`;
                }

                // Procesar todas las imágenes
                const allImages = document.querySelectorAll('img');
                allImages.forEach(img => {
                    // Forzar la carga de la imagen de fondo
                    if (img.alt && img.alt.includes('-image') && !img.alt.includes('me-image') && 
                        (img.className.includes('absolute') || img.id === 'heroBackgroundImage')) {
                        img.src = bgImageUrl;
                        img.style.display = 'block';
                        img.style.visibility = 'visible';
                        img.style.opacity = '1';
                        img.removeAttribute('srcset');
                        img.removeAttribute('data-nimg');
                    }
                    
                    // Forzar la carga de la imagen de perfil
                    if (img.alt === 'me-image') {
                        img.src = profileImageUrl;
                        img.style.display = 'block';
                        img.style.visibility = 'visible';
                        img.style.opacity = '1';
                        img.removeAttribute('srcset');
                        img.removeAttribute('data-nimg');
                    }
                });
                
                return {success: true, message: 'Images modified successfully'};
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
        await page.waitForFunction(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.every(img => {
                if (img.complete) return true;
                if (img.naturalWidth === 0) return false;
                return true;
            });
        }, {timeout: 10000});

        // Capturar una screenshot para verificar que las imágenes se ven correctamente
        await page.screenshot({path: '/tmp/preview.png'});

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
        res.status(500).json({error: 'Failed to generate PDF'});
    }finally {
        if (browser) await browser.close();
    }
};
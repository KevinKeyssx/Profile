import puppeteer from 'puppeteer';

export default async (req, res) => {
    try {
        const browser   = await puppeteer.launch();
        const page      = await browser.newPage();
        const pageUrl   = `${process.env.NEXT_PUBLIC_URL_PROD}${req.query.path || '/'}`;

        await page.goto(pageUrl, {
            waitUntil: 'networkidle0',
        });

        await page.addStyleTag({
            content: `
                #heroBackgroundImage {
                    background-image: url('/bg.jpg') !important;
                    object-fit: cover !important;
                }

                img.absolute.z-0[alt$="-image"]:not([alt="me-image"]) {
                    content: url('/bg.jpg') !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `
        });
        
        await page.evaluate(() => {
            const header = document.querySelector('#headerNav');
            if ( header ) header.remove();

            const generatePdfButton = document.querySelector( '#generatePdfButton' );
            if ( generatePdfButton ) generatePdfButton.remove();

            try {
                const heroSection = document.querySelector(`[id^="hero"]`);

                if ( heroSection ) ( heroSection as HTMLElement ).style.backgroundImage = 'url("/bg.jpg")';

                const nextImages = document.querySelectorAll('img');

                nextImages.forEach(img => {
                    if (img.alt && img.alt.includes('-image') && !img.alt.includes('me-image') && 
                        (img.className.includes('absolute') || img.id === 'heroBackgroundImage')) {
                        img.src = '/bg.jpg';
                    }
                });
                
                return {success: true, message: 'Attempted to change image'};
            } catch (error) {
                return {success: false, error: String(error)};
            }
        });

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 5,
        });

        const pdfBuffer = await page.pdf({
            format          : 'A3',
            printBackground : true,
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="pagina.pdf"');
        res.end(pdfBuffer);
    } catch (error) {
        res.status(500).json({error: 'Failed to generate PDF'});
    }
};
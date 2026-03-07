import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateInstagramPosts = async () => {
    console.log('Starting Puppeteer for Instagram Graphic Generation...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set viewport to exact Instagram Square Post size (1080x1080)
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

    const files = [
        {
            input: 'ig_post_7_sok_analiz.html',
            output: 'C:\\Users\\mert\\Desktop\\EvininDegeri_7_SokEdenGercek.png'
        },
        {
            input: 'ig_post_8_vs_karsilastirma.html',
            output: 'C:\\Users\\mert\\Desktop\\EvininDegeri_8_YapayZeka_VS_Ekspertiz.png'
        },
        {
            input: 'ig_post_9_canli_veri.html',
            output: 'C:\\Users\\mert\\Desktop\\EvininDegeri_9_CanliSistemVerisi.png'
        }
    ];

    for (const file of files) {
        const inputPath = 'file:///' + path.join(__dirname, file.input).replace(/\\/g, '/');
        console.log(`Processing: ${file.input}`);
        await page.goto(inputPath, { waitUntil: 'networkidle0' });

        // Wait an extra 2 seconds for gradients, blurs, and fonts to render perfectly
        await new Promise(r => setTimeout(r, 2000));

        await page.screenshot({ path: file.output, type: 'png' });
        console.log(`Saved successfully: ${file.output}`);
    }

    console.log('All Instagram Posts generated successfully to the Desktop!');
    await browser.close();
};

generateInstagramPosts().catch(console.error);

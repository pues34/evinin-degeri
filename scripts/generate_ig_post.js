import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

const generateInstagramPost = async () => {
    console.log('Starting Puppeteer for Instagram Graphic Generation...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set viewport to exact Instagram Square Post size (1080x1080)
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Inter', 'sans-serif'],
                        },
                        colors: {
                            appleDark: '#1d1d1f',
                            appleBlue: '#2997ff',
                            appleGray: '#f5f5f7'
                        }
                    }
                }
            }
        </script>
        <style>
            body {
                background: linear-gradient(135deg, #f5f5f7 0%, #e2e8f0 100%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                overflow: hidden;
            }
            .glass-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
            }
            .glow-blue {
                position: absolute;
                top: -100px;
                right: -100px;
                width: 600px;
                height: 600px;
                background: radial-gradient(circle, rgba(41, 151, 255, 0.2) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                z-index: 0;
            }
             .glow-purple {
                position: absolute;
                bottom: -100px;
                left: -100px;
                width: 600px;
                height: 600px;
                background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                z-index: 0;
            }
        </style>
    </head>
    <body class="relative text-appleDark">
        <div class="glow-blue"></div>
        <div class="glow-purple"></div>
        
        <div class="relative z-10 w-full h-full flex flex-col justify-between p-16">
            <!-- Header/Logo area -->
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-appleDark rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-appleBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </div>
                <div>
                   <h1 class="text-3xl font-bold tracking-tight">Evinin Değeri</h1>
                   <p class="text-gray-500 font-medium tracking-wider">YAPAY ZEKA EMLAK DEĞERLEME</p>
                </div>
            </div>

            <!-- Main Content Card -->
            <div class="glass-card rounded-[3rem] p-16 w-[85%] mx-auto transform hover:scale-105 transition-transform">
                <div class="inline-flex items-center gap-2 px-6 py-2 border border-blue-200 bg-blue-50/50 rounded-full text-appleBlue font-bold tracking-wide mb-8">
                    <span>✨</span> YAPAY ZEKA ANALİZİ
                </div>
                <h2 class="text-6xl font-extrabold tracking-tight leading-tight mb-6">
                    Evinizin gerçek piyasa değeri <span class="text-appleBlue underline decoration-4 decoration-blue-200 underline-offset-8">ne kadar?</span>
                </h2>
                <p class="text-2xl text-gray-500 mb-12 font-medium leading-relaxed">
                    Milyonlarca veriyi saniyeler içinde analiz eden algoritmamızla, yanılma payı olmadan anında hesaplayın.
                </p>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div class="text-left">
                        <p class="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Tahmini Değer</p>
                        <p class="text-4xl font-extrabold text-appleDark">14.250.000 <span class="text-2xl text-gray-400">TL</span></p>
                    </div>
                    <div class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                </div>
            </div>

            <!-- Footer / CTA -->
            <div class="flex items-center justify-between px-8">
                <div class="text-xl font-medium text-gray-500">
                    Sadece <strong class="text-appleDark">İstanbul</strong> için yayında.
                </div>
                <div class="bg-appleDark text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-2xl flex items-center gap-3">
                    Hemen Hesapla <svg class="w-6 h-6 text-appleBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);
    await page.waitForNetworkIdle();

    const outputPath = path.join(process.cwd(), 'public', 'instagram-post-1.png');
    await page.screenshot({ path: outputPath, type: 'png' });

    console.log('Successfully generated Instagram Post: ' + outputPath);
    await browser.close();
};

generateInstagramPost().catch(console.error);

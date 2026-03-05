fetch('https://evinin-degeri.vercel.app/api/locations')
    .then(async res => {
        const text = await res.text();
        console.log("Response:", text);
    });

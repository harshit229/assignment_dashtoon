

async function generateComic() {
    try {
        const apiKey = 'VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM';


        const panelText = document.getElementById('panelText').value;
        const data = {
        'inputs':panelText
        };
        console.log(data);
        // Call the text-to-image API
        const apiUrl = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'image/png',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to generate comic panel. Please try again.');
        }

        const imageData = await response.arrayBuffer();
        const img_data=  `data:image/png;base64,${btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;

         const imgElement = document.createElement('img');
         imgElement.src = img_data;
         imgElement.alt = 'Generated Comic Panel';

         const comicDisplay = document.getElementById('comicDisplay');
         comicDisplay.innerHTML = ''; // Clear previous content
         comicDisplay.appendChild(imgElement);

    } catch (error) {
        console.error(error.message);

        const errorDisplay = document.getElementById('errorDisplay');
        errorDisplay.textContent = error.message;
    }
}


import fs from 'fs';
import fetch from 'node-fetch';

async function readArticleFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error("Błąd przy odczytywaniu pliku:", error);
        return null;
    }
}

async function generateHTMLFromAI(articleText) {
    const apiKey = '';
    const prompt = `
        Przekształć poniższy tekst w kod HTML z odpowiednimi tagami i miejscami na obrazy (tagi <img> z atrybutami alt):
        ${articleText}
    `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 1500
            })
        });

        const data = await response.json();
        console.log('Odpowiedź z API:', data);

        if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
            return data.choices[0].message.content.trim();
        } else {
            console.error("Odpowiedź z API nie zawiera oczekiwanego pola 'choices[0].message.content'");
            console.error("Pełna odpowiedź:", data);
            return null;
        }

    } catch (error) {
        console.error("Błąd przy komunikacji z API:", error);
        return null;
    }
}

function saveHTMLToFile(htmlContent, filePath) {
    try {
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        console.log("HTML zapisany do:", filePath);
    } catch (error) {
        console.error("Błąd przy zapisywaniu pliku:", error);
    }
}

async function main() {
    const articlePath = './artykul.txt';
    const outputPath = 'artykul.html';

    const articleText = await readArticleFile(articlePath);
    if (!articleText) return;

    const htmlContent = await generateHTMLFromAI(articleText);
    if (!htmlContent) return;

    saveHTMLToFile(htmlContent, outputPath);
}

main();

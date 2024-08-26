let btn = document.getElementById("shorten");
let shortURL = document.getElementById("shorturl");
let copyButton = document.getElementById("copy");

btn.addEventListener('click', short);
copyButton.onclick = copyToClipboard;

async function short() {
    let longURL = document.getElementById("longurl").value;

    if (!longURL) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longURL)}`);
        const data = await result.json();

        if (data.ok) {
            shortURL.value = data.result.short_link2;
        } else {
            shortURL.value = "Error shortening URL";
        }
    } catch (error) {
        shortURL.value = "Error fetching URL";
        console.error("Error:", error);
    }
}

function copyToClipboard() {
    if (shortURL.value === "" || shortURL.value === "Error shortening URL" || shortURL.value === "Error fetching URL") {
        alert("Nothing to copy or an error occurred.");
        return;
    }

    shortURL.select();
    window.navigator.clipboard.writeText(shortURL.value)
        .then(() => {
            alert("Copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy:", err);
        });
}